import { NextResponse, type NextRequest } from "next/server";
import { appUrl } from "@/lib/env";
import { AUTH_HINT_COOKIE, safeAppTarget } from "@/lib/auth-hint";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

export const dynamic = "force-dynamic";

/** The app bounces through here on sign-in and sign-out, then the browser goes straight back. */
export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const target = safeAppTarget(searchParams.get("next"), appUrl) ?? appUrl;
  const response = NextResponse.redirect(target, 302);
  response.headers.set("Cache-Control", "no-store");

  // Match the request, not NODE_ENV — `next start` on http://localhost must still set the cookie.
  const secure = request.nextUrl.protocol === "https:";
  const state = searchParams.get("state");
  if (state === "in") {
    response.cookies.set(AUTH_HINT_COOKIE, "1", {
      path: "/",
      maxAge: THIRTY_DAYS,
      sameSite: "lax",
      secure,
    });
  } else if (state === "out") {
    response.cookies.set(AUTH_HINT_COOKIE, "", {
      path: "/",
      maxAge: 0,
      sameSite: "lax",
      secure,
    });
  }
  return response;
}
