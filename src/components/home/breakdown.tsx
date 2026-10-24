import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import type { HomeStory } from "@/lib/demo-tax/story";
import { Container } from "@/components/ui/container";
import { FictionTag, Money } from "@/components/product/primitives";
import { StoryMotion } from "@/components/motion/story-motion";
import { Kicker } from "./section-heading";

/** Act II: one invoice taken apart into what was never yours, what comes later, and what's left. */
export function Breakdown({ t, lang, story }: { t: Dict; lang: Locale; story: HomeStory }) {
  const b = t.home.breakdown;
  const { invoice } = story;
  const total = invoice.inclCents;
  const rows = [
    { key: "billed", text: b.rows.billed, cents: invoice.inclCents, tone: "default" as const },
    { key: "vat", text: b.rows.vat, cents: invoice.vatCents, tone: "fiscal" as const, sign: "minus" as const },
    { key: "revenue", text: b.rows.revenue, cents: invoice.exVatCents, tone: "default" as const, rule: true },
    { key: "ibZvw", text: b.rows.ibZvw, cents: story.invoiceIbZvwCents, tone: "fiscal" as const, sign: "minus" as const },
  ];
  const segments = [
    { key: "vat", cents: invoice.vatCents, className: "bg-fiscal/80" },
    { key: "ibZvw", cents: story.invoiceIbZvwCents, className: "bg-warn/80" },
    { key: "keep", cents: story.invoiceKeepCents, className: "bg-paid" },
  ];
  const steps = [invoice.inclCents, invoice.inclCents - invoice.vatCents, story.invoiceKeepCents];

  return (
    <StoryMotion act="breakdown">
      <section id="factuur" aria-labelledby="breakdown-title" className="relative py-24 lg:py-0">
        <Container className="grid gap-12 lg:min-h-dvh lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20 lg:py-14">
          <div data-m="copy">
            <Kicker>{b.kicker}</Kicker>
            <h2 id="breakdown-title" data-m="title" className="display t-h2 mt-4 text-balance">
              {b.title}
            </h2>
            <p data-m="lead" className="t-lead mt-5 max-w-xl text-pretty text-ink-soft">
              {b.lead}
            </p>
            <div data-m="why" className="mt-8 max-w-xl border-l-2 border-carbon/40 pl-5">
              <h3 className="font-semibold">{b.whyTitle}</h3>
              <p className="mt-2 text-pretty text-ink-soft">{b.whyText}</p>
            </div>
          </div>

          <figure data-m="ledger" className="panel @container relative overflow-hidden">
            <div className="border-b border-rule px-5 pb-5 pt-6 sm:px-7">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm text-muted">{b.rows.keep[0]}</p>
                <FictionTag>{t.common.tax.demoBadge}</FictionTag>
              </div>
              <p className="display t-amount mt-3 tracking-tight text-paid" aria-hidden="true">
                <span data-m="counter" data-steps={steps.join(",")} data-lang={lang}>
                  <Money cents={story.invoiceKeepCents} lang={lang} className="[font-family:inherit] [letter-spacing:inherit]" />
                </span>
              </p>
              <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-wash" aria-hidden="true">
                {segments.map((seg) => (
                  <span
                    key={seg.key}
                    data-m="seg"
                    className={`h-full origin-left ${seg.className}`}
                    style={{ width: `${(seg.cents / total) * 100}%` }}
                  />
                ))}
              </div>
            </div>

            <ol className="divide-y divide-rule/80">
              {rows.map((row) => (
                <li
                  key={row.key}
                  data-m="row"
                  className={`grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-0.5 px-5 py-4 sm:px-7 ${row.rule ? "bg-wash/50" : ""}`}
                >
                  <span className="font-medium">{row.text[0]}</span>
                  <Money cents={row.cents} lang={lang} tone={row.tone} sign={row.sign} className="text-[1.05rem]" />
                  <span className="col-span-2 text-sm text-muted">{row.text[1]}</span>
                </li>
              ))}
              <li data-m="row" className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-0.5 bg-paid/8 px-5 py-5 sm:px-7">
                <span className="font-semibold">{b.rows.keep[0]}</span>
                <Money cents={story.invoiceKeepCents} lang={lang} tone="paid" className="text-xl font-medium" />
                <span className="col-span-2 text-sm text-muted">{b.rows.keep[1]}</span>
              </li>
            </ol>
            <figcaption className="border-t border-rule px-5 py-4 text-sm text-muted sm:px-7">{b.fiction}</figcaption>
          </figure>
        </Container>
      </section>
    </StoryMotion>
  );
}
