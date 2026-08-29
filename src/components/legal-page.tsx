import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui/container";
import type { Dict, Locale } from "@/i18n";

export function LegalPage({
  locale,
  dict,
  title,
  bodyText,
}: {
  locale: Locale;
  dict: Dict;
  title: string;
  bodyText: string;
}) {
  return (
    <>
      <SiteHeader locale={locale} dict={dict} />
      <main>
        <Container className="max-w-2xl py-16 sm:py-24">
          <div className="letter-rule w-10" />
          <h1 className="display mt-5 text-3xl tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">
            {bodyText}
          </p>
          <Link
            href={`/${locale}`}
            className="mt-10 inline-flex text-sm text-muted hover:text-carbon"
          >
            ← {dict.legal.back}
          </Link>
        </Container>
      </main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
