import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";
import { getDb } from "@/lib/db/client";
import { waitlist } from "@/lib/db/schema";

export const runtime = "nodejs";

const UUID = /^[0-9a-f-]{36}$/i;

function page(message: string) {
  return new Response(
    `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mizara</title>
<body style="font-family:system-ui,sans-serif;background:#faf5ec;color:#2a211a;display:grid;place-items:center;min-height:100vh;margin:0">
<p style="max-width:28rem;text-align:center;padding:2rem;line-height:1.6">${message}</p>
</body>`,
    { headers: { "content-type": "text/html; charset=utf-8" } },
  );
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "";
  if (!UUID.test(token)) {
    return page("Ongeldige afmeldlink. / Invalid unsubscribe link.");
  }

  try {
    await getDb().delete(waitlist).where(eq(waitlist.unsubToken, token));
  } catch (err) {
    console.error("[waitlist] unsubscribe failed", err);
    return page("Er ging iets mis. Probeer het later opnieuw. / Something went wrong.");
  }

  return page(
    "Je bent afgemeld van de wachtlijst. / You've been removed from the waitlist.",
  );
}
