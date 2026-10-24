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

  const state = searchParams.get("state");
  if (state === "in") {
    response.cookies.set(AUTH_HINT_COOKIE, "1", {
      path: "/",
      maxAge: THIRTY_DAYS,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  } else if (state === "out") {
    response.cookies.delete(AUTH_HINT_COOKIE);
  }
  return response;
}
