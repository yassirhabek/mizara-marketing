import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/content/legal-page";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang, "/terms", getDict(lang).legal.terms.meta);
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return <LegalPage lang={lang} doc={t.legal.terms} path="/terms" crumb={t.common.footer.terms} />;
}
