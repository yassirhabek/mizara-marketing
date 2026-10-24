import type { ArticleSlug, FeatureSlug, Locale } from "@/i18n";

export const FEATURE_SLUGS: readonly FeatureSlug[] = ["facturen", "kosten", "bank", "belastingoverzicht"];

export const ARTICLE_SLUGS: readonly ArticleSlug[] = [
  "hoeveel-belasting-apart-zetten-zzp",
  "btw-berekenen-zzp",
  "inkomstenbelasting-zzp",
  "kor-regeling",
];

/** Every public path without the locale prefix. "" is the homepage. */
export const PUBLIC_PATHS: readonly string[] = [
  "",
  "/demo",
  "/functies",
  ...FEATURE_SLUGS.map((slug) => `/functies/${slug}`),
  "/prijzen",
  "/voor-zzpers",
  "/faq",
  "/kennisbank",
  ...ARTICLE_SLUGS.map((slug) => `/kennisbank/${slug}`),
  "/privacy",
  "/terms",
];

export function localePath(lang: Locale, path: string) {
  return `/${lang}${path === "/" ? "" : path}`;
}
