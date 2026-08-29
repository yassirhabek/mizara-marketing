import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale, type Locale } from "@/i18n";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ReserveExplainer } from "@/components/sections/reserve-explainer";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Roadmap } from "@/components/sections/roadmap";
import { PrivacySection } from "@/components/sections/privacy-section";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDict(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        nl: "/nl",
        en: "/en",
        "x-default": "/nl",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Mizara",
      locale: lang === "nl" ? "nl_NL" : "en_US",
      url: `/${lang}`,
      title: dict.meta.title,
      description: dict.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDict(locale);

  return (
    <>
      <SiteHeader locale={locale} dict={dict} />
      <main>
        <Hero locale={locale} dict={dict} />
        <TrustStrip dict={dict} />
        <ReserveExplainer dict={dict} />
        <FeatureGrid dict={dict} />
        <HowItWorks dict={dict} />
        <Roadmap dict={dict} />
        <PrivacySection dict={dict} />
        <Faq dict={dict} />
        <CtaBand locale={locale} dict={dict} />
      </main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
