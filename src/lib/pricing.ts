/**
 * Mirrors the product's plans (api Mizara.Domain/Auth/Plans.cs). List prices are in cents, excl. btw;
 * change them there first, then here.
 */
import type { Locale } from "@/i18n/locales";
import { formatEuro, formatEuroWhole } from "@/lib/money";

export type PlanId = "free" | "facturen" | "boekhouden" | "boekhouden_bv";

export type Plan = { id: PlanId; monthCents: number; yearCents: number };

export const PLANS: readonly Plan[] = [
  { id: "free", monthCents: 0, yearCents: 0 },
  { id: "facturen", monthCents: 700, yearCents: 7000 },
  { id: "boekhouden", monthCents: 1500, yearCents: 15000 },
  { id: "boekhouden_bv", monthCents: 2500, yearCents: 25000 },
];

export const RECOMMENDED_PLAN: PlanId = "boekhouden";

export const VAT_PERCENT = 21;

/** Sent invoices (not quotes) per calendar month on the free plan. */
export const FREE_INVOICES_PER_MONTH = 5;

/** Accountant firm licence, per month excl. btw; extra users and clients may cost more. */
export const FIRM_FROM_MONTH_CENTS = 3500;

export const PLAN_FEATURES = ["invoices", "recurring", "time", "costs", "bank", "ledger", "taxFigures", "vpb", "jaarrekening"] as const;

export type PlanFeature = (typeof PLAN_FEATURES)[number];

/** The smallest plan that includes each feature; every bigger plan includes it too. */
export const FEATURE_FROM: Record<PlanFeature, PlanId> = {
  invoices: "free",
  recurring: "facturen",
  time: "facturen",
  costs: "boekhouden",
  bank: "boekhouden",
  ledger: "boekhouden",
  taxFigures: "boekhouden",
  vpb: "boekhouden_bv",
  jaarrekening: "boekhouden_bv",
};

const rank = (plan: PlanId) => PLANS.findIndex((p) => p.id === plan);

export const includes = (plan: PlanId, feature: PlanFeature) => rank(plan) >= rank(FEATURE_FROM[feature]);

/** What a customer is charged: the list price plus 21% btw, rounded to the cent. */
export const withVat = (exCents: number) => exCents + Math.round((exCents * VAT_PERCENT) / 100);

/** "€ 15" for whole euros, "€ 18,15" otherwise. */
export const formatPrice = (cents: number, lang: Locale) => (cents % 100 === 0 ? formatEuroWhole(cents, lang) : formatEuro(cents, lang));

/**
 * Fills the pricing copy's tokens: `{limit}`, `{firm}`, a plan id such as `{boekhouden}` (its monthly price),
 * plus any extra tokens passed in, such as `{price}` or `{plan}`.
 */
export function fillPrices(text: string, lang: Locale, extra: Record<string, string> = {}) {
  const tokens: Record<string, string> = {
    limit: String(FREE_INVOICES_PER_MONTH),
    firm: formatPrice(FIRM_FROM_MONTH_CENTS, lang),
    ...Object.fromEntries(PLANS.map((plan) => [plan.id, formatPrice(plan.monthCents, lang)])),
    ...extra,
  };
  return text.replace(/\{(\w+)\}/g, (token, key: string) => tokens[key] ?? token);
}
