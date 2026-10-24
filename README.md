# mizara-marketing

Marketing site for **Mizara**, bookkeeping for Dutch entrepreneurs. Standalone Next.js 16 app,
bilingual (`/nl` default, `/en`), statically generated. Registration and login live in the
app (`NEXT_PUBLIC_APP_URL`); this site has no database, forms or accounts.

## Stack

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4 (tokens in `src/app/globals.css`)
- GSAP + ScrollTrigger for the homepage story, loaded after hydration as its own chunk
- next-themes for light and dark
- Vitest for unit tests, `node:test` for the HTTP smoke test

## Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm test             # unit tests: money helpers, demo tax engine (golden parity), demo state
npm run build && npm start
npm run test:site    # smoke test against the running build (BASE_URL to override)
```

Environment: copy `.env.example`. `NEXT_PUBLIC_SITE_URL` drives canonicals, hreflang,
sitemap and JSON-LD; `NEXT_PUBLIC_APP_URL` is where sign-up and login links point.

## Structure

| Path | What |
| --- | --- |
| `src/app/[lang]/` | Root layout (owns `<html lang>`), every page, localized 404, OG image |
| `src/i18n/{nl,en}/` | All copy. Server-only; client islands receive the strings they need as props |
| `src/components/home/` | The six homepage acts, fully rendered on the server |
| `src/components/motion/` | GSAP enhancement per act (`acts.ts`), the product-tour scene switcher, and Framer Motion scroll reveals for every `[data-reveal]` element outside the acts (`reveal-motion.tsx`) |
| `src/components/demo/` | Interactive demo: pure state (`state.ts`) plus the client UI |
| `src/components/product/` | Mini product UI in HTML (invoice, receipt, tax envelope, app frame) |
| `src/lib/demo-tax/` | Browser port of the product's tax calculation subset, with golden tests |
| `src/lib/seo.ts` | Metadata, canonicals, hreflang and JSON-LD helpers |

## Principles

- **Content first.** All copy is in the server HTML. Motion only describes where things come
  from; with JavaScript off or reduced motion, every page is complete and readable.
- **Honest figures.** Every amount is integer cents and comes from the demo engine, so the
  homepage, demo and knowledge base agree. Demo figures are fictional and labelled as such;
  tax figures always carry the product's disclaimer.
- **No claims the product can't back.** No bank sync (statement import only), no infallible
  receipt reading, no testimonials or ratings. Prices in `src/lib/pricing.ts` mirror the
  product's `Plans.cs`; change them there first.

## Updating tax figures

Rates live in `src/lib/demo-tax/tables.ts` and must match the product's 2026 tables. After a
change, regenerate `golden.json` from the product engine and run `npm test`. Knowledge-base
examples are computed from the engine, so their numbers follow automatically; update the
"last reviewed" date in `src/i18n/*/kb.ts`.
