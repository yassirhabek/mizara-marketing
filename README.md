# mizara-marketing

Pre-launch marketing site for **Mizara** — bookkeeping for Dutch ZZP'ers. Standalone
Next.js 16 app, bilingual (NL default + EN), one job: collect **waitlist** signups for the
private beta.

Lives separately from the app repo (`../mizara`). Deploys to Vercel; waitlist stored in
Postgres (Neon).

## Stack

- Next.js 16 (App Router, React 19, TypeScript)
- Tailwind CSS v4 (configured in `src/app/globals.css`, no config file) — design tokens
  ported from the app
- framer-motion, next-themes (light/dark)
- Drizzle ORM + `postgres` driver for the waitlist table
- nodemailer for the confirmation email

## Local development

```bash
npm install
cp .env.example .env.local     # fill DATABASE_URL + SMTP

# one-off: apply the waitlist migration to your DB
npm run db:migrate

npm run dev                     # http://localhost:3000  -> redirects to /nl
```

For the waitlist end-to-end locally, run Postgres and Mailpit:

```bash
docker run -e POSTGRES_PASSWORD=pw -p 5432:5432 postgres:16
docker run -p 1025:1025 -p 8025:8025 axllent/mailpit   # UI on :8025
```

Point `DATABASE_URL` at local Postgres and `SMTP_HOST=localhost SMTP_PORT=1025`.

## Database

Schema: `src/lib/db/schema.ts` (one table, `waitlist`).

```bash
npm run db:generate    # after editing the schema -> writes SQL to ./drizzle
npm run db:migrate     # applies pending migrations to $DATABASE_URL
npm run db:studio      # browse the table
```

Migrations are applied manually (not at build time) — one table, rarely changes.

## Deploy (Vercel)

1. Push to a GitHub repo, import into Vercel (framework auto-detected).
2. Env vars (Production + Preview): `DATABASE_URL`, `SMTP_HOST`, `SMTP_PORT`,
   `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_URL`.
   Point Preview's `DATABASE_URL` at a Neon dev branch.
3. Run `DATABASE_URL=<prod-pooled> npm run db:migrate` once against prod.
4. Add the apex domain. The app then moves to `app.<domain>` — update its `APP_URL`,
   Mollie redirect/webhook URLs, and session-cookie domain (out of scope for this repo).

## Structure

```
src/
  proxy.ts               locale detection + "/" -> "/nl" redirect
  app/
    layout.tsx           fonts, ThemeProvider, metadata (robots: index)
    globals.css          design tokens + warm backdrop
    page.tsx             redirect to preferred locale
    [lang]/page.tsx      the landing page
    api/waitlist/route.ts
  i18n/                  nl.ts / en.ts typed dictionaries
  lib/                   env, db, email, rate-limit
  components/            header, footer, sections/, waitlist-form, ui/
```
