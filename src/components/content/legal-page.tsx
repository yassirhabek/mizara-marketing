import type { LegalDoc } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import { getDict } from "@/i18n";
import { formatDate } from "@/lib/money";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-shell";
import { Sections } from "@/components/content/blocks";
import { RichText } from "@/components/rich-text";

export function LegalPage({ lang, doc, path, crumb }: { lang: Locale; doc: LegalDoc; path: string; crumb: string }) {
  const t = getDict(lang);
  return (
    <>
      <PageHeader lang={lang} crumbs={[{ name: crumb, path }]} title={doc.h1} size="text">
        <p className="mt-4 text-sm text-muted">
          {t.common.labels.updated}: <time dateTime={doc.updated}>{formatDate(doc.updated, lang)}</time>
        </p>
        <p className="t-lead mt-6 text-pretty text-ink-soft">
          <RichText text={doc.intro} lang={lang} />
        </p>
      </PageHeader>
      <article className="pb-24">
        <Container size="text">
          <Sections sections={doc.sections} lang={lang} />
        </Container>
      </article>
    </>
  );
}
