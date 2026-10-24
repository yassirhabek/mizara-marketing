import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/i18n";
import { fillPrices } from "@/lib/pricing";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-shell";
import { JsonLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { FaqList } from "@/components/faq-list";
import { FinalCta } from "@/components/home/closing";
import { CompareTable, PlanCards, TrialNote } from "@/components/pricing";

export async function generateMetadata({ params }: PageProps<"/[lang]/prijzen">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getDict(lang).pricing;
  return pageMetadata(lang, "/prijzen", { title: fillPrices(meta.title, lang), description: fillPrices(meta.description, lang) });
}

export default async function PricingPage({ params }: PageProps<"/[lang]/prijzen">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const p = t.pricing;

  return (
    <>
      <JsonLd data={softwareLd(lang)} />
      <PageHeader lang={lang} crumbs={[{ name: t.common.nav.pricing, path: "/prijzen" }]} title={p.h1} lead={p.lead} />

      <section aria-labelledby="plans-title" className="pb-10">
        <Container>
          <h2 id="plans-title" className="sr-only">
            {p.plansTitle}
          </h2>
          <PlanCards t={t} lang={lang} />
        </Container>
      </section>

      <section aria-label={p.trial.title} className="pb-16">
        <Container className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <TrialNote t={t} lang={lang} />
          <p data-reveal className="rounded-[1.25rem] border border-rule bg-card/70 p-6 text-pretty text-[0.98rem] leading-relaxed text-ink-soft sm:p-7">
            <RichText text={fillPrices(p.accountant, lang)} lang={lang} />
          </p>
        </Container>
      </section>

      <section aria-labelledby="compare-title" className="pb-16">
        <Container>
          <h2 id="compare-title" data-reveal className="display t-h3">
            {p.compare.title}
          </h2>
          <div className="mt-6">
            <CompareTable t={t} lang={lang} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="notes-title" className="pb-16">
        <Container size="text">
          <h2 id="notes-title" data-reveal className="display t-h3">
            {p.notes.title}
          </h2>
          <ul className="mt-6 grid gap-3">
            {p.notes.items.map((item) => (
              <li key={item} data-reveal="left" className="flex gap-3 text-pretty leading-relaxed text-ink-soft">
                <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-carbon" />
                <span>
                  <RichText text={fillPrices(item, lang)} lang={lang} />
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="pricing-faq-title" className="pb-20">
        <Container size="text">
          <h2 id="pricing-faq-title" data-reveal className="display t-h3">
            {p.faqTitle}
          </h2>
          <FaqList items={p.faq.map((qa) => ({ q: qa.q, a: fillPrices(qa.a, lang) }))} lang={lang} className="mt-6" />
        </Container>
      </section>

      <FinalCta t={t} lang={lang} />
    </>
  );
}
