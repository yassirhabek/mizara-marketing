import { notFound } from "next/navigation";
import { getDict, isLocale, locales, type Locale } from "@/i18n";
import { HtmlLang } from "@/components/html-lang";
import { appUrl, siteUrl } from "@/lib/env";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDict(lang as Locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Mizara",
        url: siteUrl,
        logo: `${siteUrl}/icon`,
      },
      {
        "@type": "SoftwareApplication",
        name: "Mizara",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        description: dict.meta.description,
        url: appUrl,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/PreOrder",
        },
      },
    ],
  };

  return (
    <>
      <HtmlLang lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
