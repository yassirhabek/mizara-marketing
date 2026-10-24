import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale, locales, type ArticleSlug } from "@/i18n";
import { articleLd, pageMetadata } from "@/lib/seo";
import { ARTICLE_SLUGS } from "@/lib/routes";
import { formatDate } from "@/lib/money";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/page-shell";
import { Related, Sections, Toc } from "@/components/content/blocks";
import { RichText } from "@/components/rich-text";
import { TaxDisclaimer } from "@/components/tax-disclaimer";
import { FinalCta } from "@/components/home/closing";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => ARTICLE_SLUGS.map((slug) => ({ lang, slug })));
}

const isArticle = (slug: string): slug is ArticleSlug => ARTICLE_SLUGS.some((s) => s === slug);

export async function generateMetadata({ params }: PageProps<"/[lang]/kennisbank/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isArticle(slug)) return {};
  return pageMetadata(lang, `/kennisbank/${slug}`, getDict(lang).kb.articles[slug].meta, { type: "article" });
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/kennisbank/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isArticle(slug)) notFound();
  const t = getDict(lang);
  const article = t.kb.articles[slug];
  const path = `/kennisbank/${slug}`;
  const labels = t.common.labels;

  return (
    <>
      <JsonLd data={articleLd(lang, path, { headline: article.h1, description: article.meta.description, reviewed: t.kb.reviewed })} />
      <article className="pb-16">
        <header className="pb-10 pt-10 sm:pt-14 lg:pt-20">
          <Container size="text">
            <Breadcrumbs
              lang={lang}
              crumbs={[
                { name: t.common.nav.kb, path: "/kennisbank" },
                { name: article.h1, path },
              ]}
            />
            <h1 className="display t-h2 mt-8 text-balance">{article.h1}</h1>
            <p className="t-lead mt-5 text-pretty text-ink-soft">{article.lead}</p>
            <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
              <span>
                {labels.reviewed}: <time dateTime={t.kb.reviewed}>{formatDate(t.kb.reviewed, lang)}</time>
              </span>
              <span>{t.common.tax.taxYear}</span>
              <span>
                {article.readMinutes} {labels.minutes}
              </span>
            </p>
            <aside data-reveal="scale" className="mt-8 rounded-[1.25rem] border border-carbon/25 bg-card p-6 shadow-lift">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-carbon-deep dark:text-carbon">{labels.shortAnswer}</p>
              <p className="mt-2.5 text-[1.08rem] leading-relaxed text-ink">
                <RichText text={article.shortAnswer} lang={lang} />
              </p>
            </aside>
          </Container>
        </header>

        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,48rem)_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Toc sections={article.sections} title={labels.onThisPage} />
            </div>
          </aside>
          <div className="min-w-0">
            <Sections sections={article.sections} lang={lang} />
            <TaxDisclaimer disclaimer={t.common.tax.disclaimer} scope={t.common.tax.scope} className="mt-12" />
            <section aria-labelledby="sources-title" data-reveal className="mt-12">
              <h2 id="sources-title" className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                {labels.sources}
              </h2>
              <ul className="mt-3 grid gap-2 text-sm">
                {article.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noopener" className="text-carbon-deep underline decoration-carbon/40 underline-offset-[3px] hover:decoration-carbon dark:text-carbon">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
            <Related title={labels.related} links={article.related} lang={lang} />
          </div>
        </Container>
      </article>
      <FinalCta t={t} lang={lang} />
    </>
  );
}
