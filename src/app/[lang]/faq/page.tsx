import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-shell";
import { FaqList } from "@/components/faq-list";
import { FinalCta } from "@/components/home/closing";

export async function generateMetadata({ params }: PageProps<"/[lang]/faq">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang, "/faq", getDict(lang).faq.meta);
}

const groupId = (index: number) => `groep-${index + 1}`;

export default async function FaqPage({ params }: PageProps<"/[lang]/faq">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const faq = t.faq;

  return (
    <>
      <PageHeader lang={lang} crumbs={[{ name: t.common.nav.faq, path: "/faq" }]} title={faq.h1} lead={faq.lead} />
      <div className="pb-20">
        <Container className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-labelledby="faq-toc" className="lg:sticky lg:top-24 lg:self-start">
            <p id="faq-toc" className="text-sm font-semibold">
              {t.common.labels.onThisPage}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {faq.groups.map((group, index) => (
                <li key={group.title}>
                  <a href={`#${groupId(index)}`} className="inline-flex min-h-10 items-center rounded-full border border-rule bg-card px-3.5 text-sm text-ink-soft hover:text-ink lg:min-h-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-1">
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid max-w-3xl gap-14">
            {faq.groups.map((group, index) => (
              <section key={group.title} aria-labelledby={groupId(index)}>
                <h2 id={groupId(index)} className="display t-h3 scroll-mt-24">
                  {group.title}
                </h2>
                <FaqList items={group.items} lang={lang} className="mt-5" />
              </section>
            ))}
          </div>
        </Container>
      </div>
      <FinalCta t={t} lang={lang} />
    </>
  );
}
