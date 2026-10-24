/**
 * Public, build-safe values. `NEXT_PUBLIC_*` vars are inlined by Next at build time,
 * so these are safe to import from client components. Fall back to sane defaults so a
 * missing var never crashes the build; set them properly in the deploy environment.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const appUrl = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.mizara.nl"
).replace(/\/$/, "");

/** Registration lives in the app; `mode=signup` opens the sign-up tab of its login page. */
export const signupUrl = `${appUrl}/login?mode=signup`;
export const loginUrl = `${appUrl}/login`;
