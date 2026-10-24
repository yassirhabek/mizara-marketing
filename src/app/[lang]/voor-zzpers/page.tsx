import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-shell";
import { Sections } from "@/components/content/blocks";
import { RichText } from "@/components/rich-text";
import { FinalCta } from "@/components/home/closing";

export async function generateMetadata({ params }: PageProps<"/[lang]/voor-zzpers">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang, "/voor-zzpers", getDict(lang).audience.meta);
}

export default async function AudiencePage({ params }: PageProps<"/[lang]/voor-zzpers">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const a = t.audience;

  return (
    <>
      <PageHeader lang={lang} crumbs={[{ name: t.common.nav.audience, path: "/voor-zzpers" }]} title={a.h1} lead={a.lead} />

      <section aria-label={a.fits.title} className="pb-14">
        <Container className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div data-reveal className="rounded-[1.25rem] border border-paid/30 bg-card p-6 sm:p-8">
            <h2 className="display text-2xl">{a.fits.title}</h2>
            <ul className="mt-5 grid gap-3">
              {a.fits.items.map((item) => (
                <li key={item} className="flex gap-3 text-ink-soft">
                  <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-paid" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 8.5l3 3 7-7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="rounded-[1.25rem] border border-rule bg-wash/60 p-6 sm:p-8">
            <h2 className="display text-2xl">{a.notFits.title}</h2>
            <ul className="mt-5 grid gap-3">
              {a.notFits.items.map((item) => (
                <li key={item} className="flex gap-3 text-ink-soft">
                  <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-muted" />
                  <span>
                    <RichText text={item} lang={lang} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <article className="pb-20">
        <Container size="text">
          <Sections sections={a.sections} lang={lang} />
        </Container>
      </article>

      <FinalCta t={t} lang={lang} />
    </>
  );
}
