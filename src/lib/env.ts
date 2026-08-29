import { z } from "zod";

/**
 * Public, build-safe values. `NEXT_PUBLIC_*` vars are inlined by Next at build time,
 * so these are safe to import from client components. Fall back to localhost so a
 * missing var never crashes the build — set them properly in the deploy environment.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const appUrl = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.mizara.app"
).replace(/\/$/, "");

/**
 * Server-only secrets. Validated lazily (on first call) so `next build` doesn't need
 * a database or SMTP credentials — only the running request handlers do.
 */
const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  MAIL_FROM: z.string().min(1).default("Mizara <hallo@mizara.app>"),
});

type ServerEnv = z.infer<typeof serverSchema>;

let cached: ServerEnv | null = null;

export function serverEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(
      `Invalid server environment: ${parsed.error.issues
        .map((i) => `${i.path.join(".")} ${i.message}`)
        .join("; ")}`,
    );
  }
  cached = parsed.data;
  return cached;
}
