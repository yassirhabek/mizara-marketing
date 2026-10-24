/**
 * Public, build-safe values. `NEXT_PUBLIC_*` vars are inlined by Next at build time,
 * so these are safe to import from client components. Fall back to sane defaults so a
 * missing var never crashes the build; set them properly in the deploy environment.
 *
 * Host-only values like `mizara.nl` are accepted and get `https://` prepended —
 * `new URL()` requires a protocol.
 */
function publicOrigin(raw: string | undefined, fallback: string): string {
  const value = (raw ?? fallback).trim().replace(/\/$/, "");
  if (!value) return fallback;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return value;
  return `https://${value}`;
}

export const siteUrl = publicOrigin(
  process.env.NEXT_PUBLIC_SITE_URL,
  "http://localhost:3000",
);

export const appUrl = publicOrigin(
  process.env.NEXT_PUBLIC_APP_URL,
  "https://app.mizara.nl",
);

/** Registration lives in the app; `mode=signup` opens the sign-up tab of its login page. */
export const signupUrl = `${appUrl}/login?mode=signup`;
export const loginUrl = `${appUrl}/login`;
