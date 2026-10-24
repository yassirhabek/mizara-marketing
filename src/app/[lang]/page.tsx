import type { Metadata } from "next";
import { getDict, isLocale } from "@/i18n";
import { homeStory } from "@/lib/demo-tax/story";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { Hero } from "@/components/home/hero";
import { Breakdown } from "@/components/home/breakdown";
import { Unify } from "@/components/home/unify";
import { ProductTour } from "@/components/home/product-tour";
import { EnterApp } from "@/components/home/enter-app";
import { TaxReveal } from "@/components/home/tax-reveal";
import { FaqPreview, FinalCta, Honest, Imports } from "@/components/home/closing";
import { PricingPreview } from "@/components/home/pricing-preview";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang, "", getDict(lang).home.meta);
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const story = homeStory();

  return (
    <>
      <JsonLd data={softwareLd(lang)} />
      <Hero t={t} lang={lang} story={story} />
      <Breakdown t={t} lang={lang} story={story} />
      <Unify t={t} lang={lang} story={story} />
      <ProductTour t={t} lang={lang} story={story} />
      <EnterApp t={t} lang={lang} />
      <TaxReveal t={t} lang={lang} story={story} />
      <Honest t={t} lang={lang} />
      <Imports t={t} />
      <PricingPreview t={t} lang={lang} />
      <FaqPreview t={t} lang={lang} />
      <FinalCta t={t} lang={lang} />
    </>
  );
}
