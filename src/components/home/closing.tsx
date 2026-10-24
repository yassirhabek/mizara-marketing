import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import { appUrl, signupUrl } from "@/lib/env";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { AppButton } from "@/components/app-button";
import { FaqList } from "@/components/faq-list";
import { Mark } from "@/components/wordmark";

const IMPORT_LOGOS = [
  { src: "/import-logos/moneybird.png", alt: "Moneybird" },
  { src: "/import-logos/eboekhouden.png", alt: "e-Boekhouden" },
  { src: "/import-logos/exact.png", alt: "Exact" },
];

export function Imports({ t }: { t: Dict }) {
  const i = t.home.imports;
  return (
    <section aria-labelledby="imports-title" className="py-12">
      <Container>
        <div data-reveal className="flex flex-col items-start gap-6 rounded-[1.25rem] border border-rule bg-card/70 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 id="imports-title" className="display text-2xl">
              {i.title}
            </h2>
            <p className="mt-2 text-ink-soft">{i.text}</p>
          </div>
          <ul className="flex flex-wrap items-center gap-3">
            {IMPORT_LOGOS.map((logo) => (
              <li key={logo.alt} className="flex h-14 items-center gap-2.5 rounded-xl border border-rule bg-paper px-4">
                <Image src={logo.src} alt="" width={28} height={28} className="h-7 w-7 rounded-md object-contain" />
                <span className="text-sm font-medium">{logo.alt}</span>
              </li>
            ))}
            <li className="flex h-14 items-center rounded-xl border border-dashed border-rule px-4 text-sm font-medium text-muted">CSV · XAF</li>
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function FaqPreview({ t, lang }: { t: Dict; lang: Locale }) {
  const items = [t.faq.groups[1].items[0], t.faq.groups[1].items[2], t.faq.groups[2].items[0], t.faq.groups[2].items[2], t.faq.groups[3].items[0]];
  return (
    <section aria-labelledby="faq-title" className="py-20 lg:py-28">
      <Container size="text">
        <h2 id="faq-title" data-reveal className="display t-h2 text-balance">
          {t.home.faqTitle}
        </h2>
        <FaqList items={items} lang={lang} className="mt-10" />
        <Link href={`/${lang}/faq`} className="mt-8 inline-flex min-h-11 items-center gap-1.5 font-semibold text-carbon-deep underline-offset-4 hover:underline dark:text-carbon">
          {t.home.faqMore} <span aria-hidden="true">→</span>
        </Link>
      </Container>
    </section>
  );
}

export function FinalCta({ t, lang }: { t: Dict; lang: Locale }) {
  return (
    <section aria-labelledby="final-title" className="pb-8 pt-8">
      <Container>
        <div data-reveal="scale" className="relative overflow-hidden rounded-[1.75rem] bg-ink px-6 py-14 text-paper sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-carbon/35 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-paid/25 blur-3xl" />
          <div className="relative max-w-2xl">
            <Mark size={44} />
            <h2 id="final-title" className="display t-h2 mt-6 text-balance">
              {t.home.final.title}
            </h2>
            <p className="t-lead mt-4 max-w-xl text-paper/80">{t.home.final.text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AppButton
                guest={{ href: signupUrl, label: t.common.cta.signup }}
                member={{ href: appUrl, label: t.common.cta.openApp }}
                size="lg"
                arrow
                className="w-full text-center max-sm:whitespace-normal sm:w-auto"
              />
              <ButtonLink
                href={`/${lang}/demo`}
                variant="ghost"
                size="lg"
                className="w-full border border-paper/25 text-center max-sm:whitespace-normal text-paper hover:bg-paper/10 sm:w-auto"
              >
                {t.common.cta.demo}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
