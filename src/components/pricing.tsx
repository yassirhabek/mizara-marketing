import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import { signupUrl } from "@/lib/env";
import { PLANS, PLAN_FEATURES, RECOMMENDED_PLAN, fillPrices, formatPrice, includes, withVat } from "@/lib/pricing";
import { ExternalButton } from "@/components/ui/button";
import { RichText } from "@/components/rich-text";

function Check({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 shrink-0 text-paid ${className}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}

export function PlanCards({ t, lang }: { t: Dict; lang: Locale }) {
  const p = t.pricing;
  return (
    <ul className="grid gap-5 pt-3 sm:grid-cols-2 xl:grid-cols-4">
      {PLANS.map((plan) => {
        const copy = p.plans[plan.id];
        const free = plan.monthCents === 0;
        const recommended = plan.id === RECOMMENDED_PLAN;
        return (
          <li
            key={plan.id}
            data-reveal
            className={`relative flex min-w-0 flex-col rounded-[1.25rem] border bg-card p-6 transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-float sm:p-7 ${recommended ? "border-carbon shadow-lift ring-1 ring-carbon/30" : "border-rule"}`}
          >
            {recommended ? (
              <p className="absolute -top-3 left-6 rounded-full bg-carbon px-3 py-1 text-xs font-semibold text-[#fffcf6] dark:text-[#1c1712]">{p.recommended}</p>
            ) : null}
            <h3 className="display text-xl">{copy.name}</h3>
            <p className="mt-1.5 text-sm text-pretty text-ink-soft xl:min-h-10">{copy.tagline}</p>
            <p className="mt-6 flex flex-wrap items-baseline gap-x-1.5">
              <span className="display text-[2.6rem] leading-none tracking-tight tabular-nums">{formatPrice(plan.monthCents, lang)}</span>
              <span className="text-sm text-muted">{p.perMonth}</span>
            </p>
            <div className="mt-2 text-xs leading-relaxed text-muted sm:min-h-10">
              {free ? (
                <p>{p.freeForever}</p>
              ) : (
                <>
                  <p>
                    {p.exVat} · {fillPrices(p.inclVat, lang, { price: formatPrice(withVat(plan.monthCents), lang) })}
                  </p>
                  <p>{fillPrices(p.perYear, lang, { price: formatPrice(plan.yearCents, lang) })}</p>
                </>
              )}
            </div>
            <ul className="mt-6 flex-1 space-y-2.5 border-t border-rule pt-6 text-[0.95rem]">
              {copy.features.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <Check className="mt-1" />
                  {fillPrices(feature, lang)}
                </li>
              ))}
            </ul>
            <ExternalButton href={signupUrl} variant={recommended ? "primary" : "secondary"} className="mt-7 w-full">
              {free ? p.startFree : fillPrices(p.startWith, lang, { plan: copy.name })}
            </ExternalButton>
          </li>
        );
      })}
    </ul>
  );
}

export function TrialNote({ t, lang }: { t: Dict; lang: Locale }) {
  const trial = t.pricing.trial;
  return (
    <div data-reveal className="flex gap-4 rounded-[1.25rem] border border-paid/30 bg-paid/[0.06] p-6 sm:p-7">
      <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paid/15 text-paid">
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="14" height="13" rx="2" />
          <path d="M3 8h14M7 2.5v3M13 2.5v3M7.5 12.5l1.8 1.8 3.4-3.6" />
        </svg>
      </span>
      <div className="min-w-0">
        <h2 className="font-semibold text-balance">{trial.title}</h2>
        <p className="mt-2 text-pretty text-[0.98rem] leading-relaxed text-ink-soft">
          <RichText text={fillPrices(trial.text, lang)} lang={lang} />
        </p>
      </div>
    </div>
  );
}

export function CompareTable({ t, lang }: { t: Dict; lang: Locale }) {
  const c = t.pricing.compare;
  return (
    <div data-reveal className="relative overflow-x-auto rounded-[1.25rem] border border-rule bg-card">
      <table className="w-full min-w-[36rem] sm:min-w-[40rem] border-collapse text-left text-[0.95rem]">
        <caption className="sr-only">{c.caption}</caption>
        <thead>
          <tr className="border-b border-rule">
            <th scope="col" className="sticky left-0 z-10 bg-card px-5 py-4 text-sm font-semibold text-muted">
              {c.feature}
            </th>
            {PLANS.map((plan) => (
              <th key={plan.id} scope="col" className={`px-4 py-4 text-center ${plan.id === RECOMMENDED_PLAN ? "bg-carbon/[0.06]" : ""}`}>
                <span className="block font-semibold">{t.pricing.plans[plan.id].name}</span>
                <span className="mt-0.5 block text-sm font-normal tabular-nums text-muted">{formatPrice(plan.monthCents, lang)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PLAN_FEATURES.map((feature) => (
            <tr key={feature} className="border-b border-rule last:border-0">
              <th scope="row" className="sticky left-0 z-10 bg-card px-5 py-3.5 font-medium max-sm:max-w-40 max-sm:text-sm">
                {c.rows[feature]}
              </th>
              {PLANS.map((plan) => (
                <td key={plan.id} className={`px-4 py-3.5 text-center ${plan.id === RECOMMENDED_PLAN ? "bg-carbon/[0.06]" : ""}`}>
                  {feature === "invoices" ? (
                    <span className="whitespace-nowrap text-sm">{plan.monthCents === 0 ? fillPrices(c.limit, lang) : c.unlimited}</span>
                  ) : includes(plan.id, feature) ? (
                    <>
                      <Check className="mx-auto" />
                      <span className="sr-only">{c.included}</span>
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true" className="text-muted">·</span>
                      <span className="sr-only">{c.notIncluded}</span>
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
