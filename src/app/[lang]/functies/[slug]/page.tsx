import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale, locales, type FeatureSlug } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import { FEATURE_SLUGS } from "@/lib/routes";
import { homeStory } from "@/lib/demo-tax/story";
import { signupUrl } from "@/lib/env";
import { Container } from "@/components/ui/container";
import { ButtonLink, ExternalButton } from "@/components/ui/button";
import { PageHeader } from "@/components/page-shell";
import { Related, Sections } from "@/components/content/blocks";
import { FeatureScene } from "@/components/content/feature-scene";
import { FaqList } from "@/components/faq-list";
import { RichText } from "@/components/rich-text";
import { TaxDisclaimer } from "@/components/tax-disclaimer";
import { FinalCta } from "@/components/home/closing";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => FEATURE_SLUGS.map((slug) => ({ lang, slug })));
}

const isFeature = (slug: string): slug is FeatureSlug => FEATURE_SLUGS.some((s) => s === slug);

export async function generateMetadata({ params }: PageProps<"/[lang]/functies/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isFeature(slug)) return {};
  return pageMetadata(lang, `/functies/${slug}`, getDict(lang).features.pages[slug].meta);
}

export default async function FeaturePage({ params }: PageProps<"/[lang]/functies/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isFeature(slug)) notFound();
  const t = getDict(lang);
  const page = t.features.pages[slug];

  return (
    <>
      <PageHeader
        lang={lang}
        crumbs={[
          { name: t.common.nav.features, path: "/functies" },
          { name: page.nav, path: `/functies/${slug}` },
        ]}
        kicker={page.nav}
        title={page.h1}
        lead={page.lead}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ExternalButton href={signupUrl} size="lg" arrow>
            {t.common.cta.signup}
          </ExternalButton>
          <ButtonLink href={`/${lang}/demo`} variant="secondary" size="lg">
            {t.common.cta.demoShort}
          </ButtonLink>
        </div>
      </PageHeader>

      <section aria-label={page.nav} className="pb-14">
        <Container>
          <div className="rounded-[1.4rem] border border-rule bg-wash/50 p-3 sm:p-6 lg:p-10" aria-hidden="true">
            <div className="mx-auto max-w-4xl">
              <FeatureScene slug={slug} ui={t.ui} lang={lang} story={homeStory()} />
            </div>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {page.highlights.map((item) => (
              <li key={item.title} data-reveal className="border-t-2 border-carbon/50 pt-4">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="mt-2 text-pretty text-ink-soft">
                  <RichText text={item.text} lang={lang} />
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <article className="pb-16">
        <Container size="text">
          <Sections sections={page.sections} lang={lang} />
          {slug === "belastingoverzicht" ? <TaxDisclaimer disclaimer={t.common.tax.disclaimer} scope={t.common.tax.scope} className="mt-10" /> : null}
          {page.faq.length ? (
            <section aria-labelledby="feature-faq" className="mt-14">
              <h2 id="feature-faq" className="display t-h3">
                {t.common.labels.questions}
              </h2>
              <FaqList items={page.faq} lang={lang} className="mt-6" />
            </section>
          ) : null}
          <Related title={t.common.labels.related} links={page.related} lang={lang} />
        </Container>
      </article>

      <FinalCta t={t} lang={lang} />
    </>
  );
}
