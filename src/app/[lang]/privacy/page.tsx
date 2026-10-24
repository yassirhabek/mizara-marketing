import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/content/legal-page";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang, "/privacy", getDict(lang).legal.privacy.meta);
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return <LegalPage lang={lang} doc={t.legal.privacy} path="/privacy" crumb={t.common.footer.privacy} />;
}
