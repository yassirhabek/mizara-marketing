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
    title: dict.legal.privacyTitle,
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: { nl: "/nl/privacy", en: "/en/privacy", "x-default": "/nl/privacy" },
    },
  };
}

export default async function PrivacyPage({
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
      title={dict.legal.privacyTitle}
      bodyText={dict.legal.privacyBody}
    />
  );
}
