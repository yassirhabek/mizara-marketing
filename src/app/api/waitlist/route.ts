import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db/client";
import { waitlist } from "@/lib/db/schema";
import { sendWaitlistConfirmation } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email().max(254),
  name: z.string().max(120).optional(),
  locale: z.enum(["nl", "en"]).default("nl"),
  utm: z.string().max(400).optional(),
  // Honeypot: real users never fill this.
  company: z.string().optional(),
});

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const { email, name, locale, utm, company } = parsed.data;

  // Honeypot tripped → pretend success, do nothing.
  if (company && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(req);
  const limited = rateLimit(`waitlist:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  const unsubToken = randomUUID();

  let inserted: { email: string } | undefined;
  try {
    const rows = await getDb()
      .insert(waitlist)
      .values({
        email: normalizedEmail,
        name: name?.trim() || null,
        locale,
        utm: utm || null,
        source: req.headers.get("referer") || null,
        ip,
        userAgent: req.headers.get("user-agent") || null,
        unsubToken,
      })
      .onConflictDoNothing({ target: waitlist.email })
      .returning({ email: waitlist.email });
    inserted = rows[0];
  } catch (err) {
    console.error("[waitlist] insert failed", err);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }

  // Only email genuinely new signups; re-submits get the same friendly response.
  if (inserted) {
    try {
      await sendWaitlistConfirmation(normalizedEmail, locale, unsubToken);
    } catch (err) {
      console.error("[waitlist] confirmation email failed", err);
      // Not fatal — the address is saved.
    }
  }

  return NextResponse.json({ ok: true });
}
