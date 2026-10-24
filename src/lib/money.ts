import type { Locale } from "@/i18n/locales";

const numberLocale = (locale: Locale) => (locale === "nl" ? "nl-NL" : "en-IE");

export function formatEuro(cents: number, locale: Locale = "nl") {
  return new Intl.NumberFormat(numberLocale(locale), {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

/** Whole euros, for large display figures that are already rounded up to the euro. */
export function formatEuroWhole(cents: number, locale: Locale = "nl") {
  return new Intl.NumberFormat(numberLocale(locale), {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Math.round(cents / 100));
}

export function formatPercent(rate: number, locale: Locale = "nl") {
  return new Intl.NumberFormat(numberLocale(locale), {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(rate);
}

/** Parses a typed euro amount ("1.250,50", "1250.5", "€ 85") into cents; null when not a number. */
export function parseEuroInput(raw: string): number | null {
  let value = raw.replace(/[€\s]/g, "");
  if (!value) return null;
  const lastComma = value.lastIndexOf(",");
  const lastDot = value.lastIndexOf(".");
  if (/^\d{1,3}(,\d{3})+$/.test(value)) {
    value = value.replace(/,/g, "");
  } else if (lastComma > lastDot) {
    value = value.replace(/\./g, "").replace(",", ".");
  } else if (lastDot > lastComma && lastComma !== -1) {
    value = value.replace(/,/g, "");
  } else if (lastDot !== -1 && value.length - lastDot - 1 === 3 && lastComma === -1) {
    value = value.replace(/\./g, "");
  }
  if (!/^-?\d+(\.\d{0,2})?$/.test(value)) return null;
  const amount = Number(value);
  if (!Number.isFinite(amount)) return null;
  return Math.round(amount * 100);
}

export function centsToInput(cents: number, locale: Locale = "nl") {
  const euros = (cents / 100).toFixed(2);
  return locale === "nl" ? euros.replace(".", ",") : euros;
}

export function formatDate(iso: string, locale: Locale, style: "long" | "short" = "long") {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-GB", {
    day: "numeric",
    month: style === "long" ? "long" : "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
