import Link from "next/link";
import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import { fillPrices } from "@/lib/pricing";
import { Container } from "@/components/ui/container";
import { PlanCards } from "@/components/pricing";
import { SectionHeading } from "./section-heading";

export function PricingPreview({ t, lang }: { t: Dict; lang: Locale }) {
  const p = t.pricing;
  return (
    <section id="prijzen" aria-labelledby="pricing-title" className="scroll-mt-20 py-20 lg:py-28">
      <Container>
        <div data-reveal>
          <SectionHeading id="pricing-title" kicker={p.home.kicker} title={p.home.title} lead={fillPrices(p.home.lead, lang)} />
        </div>
        <div className="mt-12">
          <PlanCards t={t} lang={lang} />
        </div>
        <div data-reveal className="mt-8 flex flex-col gap-4 rounded-[1.25rem] border border-paid/30 bg-paid/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="text-pretty font-medium">{p.trial.title}</p>
          <Link
            href={`/${lang}/prijzen`}
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 font-semibold text-carbon-deep underline-offset-4 hover:underline dark:text-carbon"
          >
            {p.home.more} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
