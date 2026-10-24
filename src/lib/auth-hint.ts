/**
 * `mz_app` only says "this browser signed into the app recently". It never grants access:
 * the header swaps its CTAs, and the app still checks the real session.
 */
export const AUTH_HINT_COOKIE = "mz_app";

export function hasAuthHint(cookieHeader: string): boolean {
  return cookieHeader.split(";").some((part) => part.trim() === `${AUTH_HINT_COOKIE}=1`);
}

/** The redirect target, only when it points at the app's own origin. */
export function safeAppTarget(raw: string | null, appUrl: string): string | null {
  if (!raw) return null;
  try {
    const target = new URL(raw);
    return target.origin === new URL(appUrl).origin ? target.toString() : null;
  } catch {
    return null;
  }
}
