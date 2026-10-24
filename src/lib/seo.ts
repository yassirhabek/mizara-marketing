import type { Metadata } from "next";
import { getDict, locales, type Locale, type PageMeta } from "@/i18n";
import { appUrl, siteUrl } from "@/lib/env";
import { PLANS } from "@/lib/pricing";
import { localePath } from "@/lib/routes";

const OG_LOCALE: Record<Locale, string> = { nl: "nl_NL", en: "en_GB" };

export function absolute(path: string) {
  return `${siteUrl}${path}`;
}

/** Self-canonical metadata with hreflang alternates for one public path (without locale). */
export function pageMetadata(lang: Locale, path: string, meta: PageMeta, opts: { type?: "website" | "article"; absoluteTitle?: boolean } = {}): Metadata {
  const url = localePath(lang, path);
  const languages: Record<string, string> = {};
  for (const loc of locales) languages[loc] = localePath(loc, path);
  languages["x-default"] = localePath("nl", path);
  const image = { url: `${localePath(lang, "")}/opengraph-image`, width: 1200, height: 630, alt: "Mizara" };

  return {
    title: opts.absoluteTitle ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: opts.type ?? "website",
      url,
      siteName: "Mizara",
      title: meta.title,
      description: meta.description,
      locale: OG_LOCALE[lang],
      alternateLocale: locales.filter((loc) => loc !== lang).map((loc) => OG_LOCALE[loc]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [image.url] },
  };
}

const ORG_ID = `${siteUrl}/#organization`;
const SITE_ID = `${siteUrl}/#website`;

export function organizationLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Mizara",
    legalName: "Mizara B.V.",
    url: siteUrl,
    logo: absolute("/brand/mark.svg"),
    email: "info@mizara.app",
    description: getDict(lang).common.siteDescription,
    contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: "support@mizara.app", availableLanguage: ["nl", "en"] }],
  };
}

export function websiteLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: "Mizara",
    url: siteUrl,
    inLanguage: lang,
    publisher: { "@id": ORG_ID },
  };
}

/** Offers mirror src/lib/pricing.ts. No ratings: there is no verified review data to state. */
export function softwareLd(lang: Locale) {
  const t = getDict(lang);
  const offers = PLANS.map((plan) => {
    const price = (plan.monthCents / 100).toFixed(2);
    return {
      "@type": "Offer",
      name: t.pricing.plans[plan.id].name,
      price,
      priceCurrency: "EUR",
      url: absolute(localePath(lang, "/prijzen")),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price,
        priceCurrency: "EUR",
        unitCode: "MON",
        valueAddedTaxIncluded: false,
      },
    };
  });
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mizara",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: lang === "nl" ? "Boekhoudsoftware" : "Accounting software",
    operatingSystem: "Web",
    url: appUrl,
    description: t.common.siteDescription,
    inLanguage: ["nl", "en"],
    areaServed: { "@type": "Country", name: "Netherlands" },
    publisher: { "@id": ORG_ID },
    featureList: t.home.tour.scenes.map((scene) => scene.title),
    offers,
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbLd(lang: Locale, crumbs: Crumb[]) {
  const home = getDict(lang).common.nav.home;
  const all = [{ name: home, path: "" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(localePath(lang, crumb.path)),
    })),
  };
}

export function articleLd(lang: Locale, path: string, input: { headline: string; description: string; reviewed: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    inLanguage: lang,
    datePublished: input.reviewed,
    dateModified: input.reviewed,
    mainEntityOfPage: absolute(localePath(lang, path)),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
    image: absolute(`${localePath(lang, "")}/opengraph-image`),
  };
}
