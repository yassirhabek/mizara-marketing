import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale, type Locale } from "@/i18n";
import { LegalPage } from "@/components/legal-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDict(lang);
  return {
    title: dict.legal.termsTitle,
    alternates: {
      canonical: `/${lang}/terms`,
      languages: { nl: "/nl/terms", en: "/en/terms", "x-default": "/nl/terms" },
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDict(locale);
  return (
    <LegalPage
      locale={locale}
      dict={dict}
      title={dict.legal.termsTitle}
      bodyText={dict.legal.termsBody}
    />
  );
}
