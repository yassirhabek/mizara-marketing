import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import { ARTICLE_SLUGS, localePath } from "@/lib/routes";
import { formatDate } from "@/lib/money";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-shell";
import { RichText, stripMarkup } from "@/components/rich-text";

export async function generateMetadata({ params }: PageProps<"/[lang]/kennisbank">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang, "/kennisbank", getDict(lang).kb.hub.meta);
}

export default async function KnowledgeHub({ params }: PageProps<"/[lang]/kennisbank">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const hub = t.kb.hub;

  return (
    <>
      <PageHeader lang={lang} crumbs={[{ name: t.common.nav.kb, path: "/kennisbank" }]} title={hub.h1} lead={hub.lead}>
        <p className="mt-6 max-w-2xl text-sm text-muted">
          <RichText text={hub.note} lang={lang} />
        </p>
      </PageHeader>
      <section aria-label={t.common.nav.kb} className="pb-24">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {ARTICLE_SLUGS.map((slug) => {
              const article = t.kb.articles[slug];
              return (
                <li key={slug} data-reveal className="min-w-0">
                  <article className="group relative flex h-full flex-col rounded-[1.25rem] border border-rule bg-card p-6 transition-[border-color,box-shadow] hover:border-carbon/40 hover:shadow-float sm:p-8">
                    <p className="text-sm text-muted">
                      {t.common.tax.taxYear} · {article.readMinutes} {t.common.labels.minutes}
                    </p>
                    <h2 className="display mt-3 text-2xl text-balance">
                      <Link href={localePath(lang, `/kennisbank/${slug}`)} className="after:absolute after:inset-0 after:rounded-[1.25rem] after:content-['']">
                        {article.h1}
                      </Link>
                    </h2>
                    <p className="mt-3 line-clamp-3 text-pretty text-ink-soft">{stripMarkup(article.shortAnswer)}</p>
                    <p className="mt-auto pt-5 text-sm text-muted">
                      {t.common.labels.reviewed}: <time dateTime={t.kb.reviewed}>{formatDate(t.kb.reviewed, lang)}</time>
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
