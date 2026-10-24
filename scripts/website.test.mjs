// Smoke test for a running build: `npm run build && npm start`, then `npm run test:site`.
// Checks every public page in both languages for the SEO and content basics.
import assert from "node:assert/strict";
import { test } from "node:test";

const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const LOCALES = ["nl", "en"];
const FEATURES = ["facturen", "kosten", "bank", "belastingoverzicht"];
const ARTICLES = ["hoeveel-belasting-apart-zetten-zzp", "btw-berekenen-zzp", "inkomstenbelasting-zzp", "kor-regeling"];
const PATHS = [
  "",
  "/demo",
  "/functies",
  ...FEATURES.map((s) => `/functies/${s}`),
  "/prijzen",
  "/voor-zzpers",
  "/faq",
  "/kennisbank",
  ...ARTICLES.map((s) => `/kennisbank/${s}`),
  "/privacy",
  "/terms",
];

const get = (path, init) => fetch(`${BASE}${path}`, { redirect: "manual", ...init });

/** Visible text only: drop scripts, styles and tags. */
const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");

for (const lang of LOCALES) {
  for (const path of PATHS) {
    const url = `/${lang}${path}`;
    test(`${url} renders complete, indexable HTML`, async () => {
      const res = await get(url);
      assert.equal(res.status, 200);
      const html = await res.text();

      assert.match(html, new RegExp(`<html[^>]*lang="${lang}"`), "html lang");
      assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, "exactly one h1");
      assert.match(html, /<title>[^<]{10,}<\/title>/, "title");
      assert.match(html, /<meta name="description" content="[^"]{50,}"/, "description");
      assert.match(html, new RegExp(`<link rel="canonical" href="[^"]*/${lang}${path}"`), "self canonical");
      for (const alt of [...LOCALES, "x-default"]) {
        assert.match(html, new RegExp(`<link rel="alternate" hrefLang="${alt}"`), `hreflang ${alt}`);
      }
      assert.match(html, /property="og:image"/, "og:image");

      for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        assert.doesNotThrow(() => JSON.parse(json), "valid JSON-LD");
      }
      assert.ok(!visibleText(html).includes("\u2014"), "no em-dashes in visible copy");
    });
  }
}

test("homepage has the six acts and product JSON-LD in the server HTML", async () => {
  const html = await (await get("/nl")).text();
  for (const id of ['id="factuur"', 'id="probeer"', "data-tour-stage", 'data-act="hero"', 'data-act="reveal"']) {
    assert.ok(html.includes(id), id);
  }
  assert.match(html, /"@type":"SoftwareApplication"/);
  assert.match(html, /"offers":\[/);
  assert.ok(html.includes('id="prijzen"'), "pricing section");
  assert.doesNotMatch(html, /"aggregateRating"/, "no invented ratings");
});

test("pricing shows the product's plans with prices excl. and incl. btw", async () => {
  const text = visibleText(await (await get("/nl/prijzen")).text()).replace(/\s+/g, " ");
  for (const fragment of ["Facturen", "Boekhouden BV", "€ 15", "€ 18,15 incl. btw", "€ 150 per jaar", "Tot 5 verstuurde facturen per maand"]) {
    assert.ok(text.includes(fragment), fragment);
  }
});

test("articles carry Article and BreadcrumbList JSON-LD", async () => {
  const html = await (await get(`/nl/kennisbank/${ARTICLES[0]}`)).text();
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
});

test("root redirects to a locale", async () => {
  const res = await get("/", { headers: { "accept-language": "en-GB,en;q=0.9" } });
  assert.ok([307, 308].includes(res.status));
  assert.match(res.headers.get("location") ?? "", /\/en$/);
});

test("unknown pages return 404", async () => {
  assert.equal((await get("/nl/bestaat-niet")).status, 404);
  assert.equal((await get("/en/functies/bestaat-niet")).status, 404);
});

test("sitemap lists every page in both languages", async () => {
  const xml = await (await get("/sitemap.xml")).text();
  for (const lang of LOCALES) for (const path of PATHS) assert.ok(xml.includes(`/${lang}${path}<`), `${lang}${path}`);
});

test("robots allows search crawlers and points at the sitemap", async () => {
  const txt = await (await get("/robots.txt")).text();
  assert.match(txt, /User-Agent: OAI-SearchBot/);
  assert.match(txt, /User-Agent: Googlebot/);
  assert.match(txt, /Sitemap: .*\/sitemap\.xml/);
});
