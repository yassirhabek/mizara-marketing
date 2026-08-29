import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n";

const LOCALE_COOKIE = "locale";
const ONE_YEAR = 60 * 60 * 24 * 365;

function preferredLocale(request: NextRequest): string {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language");
  if (header) {
    for (const part of header.split(",")) {
      const tag = part.split(";")[0]?.trim().slice(0, 2).toLowerCase();
      if (isLocale(tag)) return tag;
    }
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1];

  if (isLocale(segment)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", segment);
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    if (request.cookies.get(LOCALE_COOKIE)?.value !== segment) {
      response.cookies.set(LOCALE_COOKIE, segment, {
        path: "/",
        maxAge: ONE_YEAR,
        sameSite: "lax",
      });
    }
    return response;
  }

  // No locale prefix → redirect to the preferred one, preserving the rest of the path.
  const target = request.nextUrl.clone();
  target.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(target);
}

export const config = {
  matcher: [
    // Everything except Next internals, API routes, metadata routes, and static files.
    "/((?!_next/|api/|icon|apple-icon|opengraph-image|twitter-image|manifest\\.webmanifest|sitemap\\.xml|robots\\.txt|.*\\.[^/]+$).*)",
  ],
};

export const supportedLocales = locales;
