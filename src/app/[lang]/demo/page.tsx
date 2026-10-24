import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-shell";
import { DemoLoader } from "@/components/demo/demo-loader";
import { demoStrings } from "@/components/demo/strings";

export async function generateMetadata({ params }: PageProps<"/[lang]/demo">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang, "/demo", getDict(lang).demo.meta);
}

export default async function DemoPage({ params }: PageProps<"/[lang]/demo">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const d = t.demo;

  return (
    <>
      <PageHeader lang={lang} crumbs={[{ name: t.common.nav.demo, path: "/demo" }]} title={d.h1} lead={d.lead}>
        <div className="mt-8 max-w-2xl rounded-xl border border-rule bg-card/70 p-5">
          <h2 className="font-semibold">{d.profileTitle}</h2>
          <ul className="mt-3 grid gap-1.5 text-ink-soft sm:grid-cols-2 sm:gap-x-6">
            {d.profile.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-carbon" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </PageHeader>
      <section aria-label={d.meta.title} className="pb-20">
        <Container>
          <div className="rounded-[1.4rem] border border-rule bg-paper p-4 shadow-float sm:p-6 lg:p-8">
            <DemoLoader lang={lang} strings={demoStrings(t)} variant="page" />
          </div>
          <noscript>
            <p className="mt-4 text-sm text-muted">{d.privacyNote}</p>
          </noscript>
        </Container>
      </section>
    </>
  );
}
