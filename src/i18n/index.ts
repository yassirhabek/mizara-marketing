import { nl } from "./nl";
import { en } from "./en";
import type { Dict } from "./types";

export const locales = ["nl", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "nl";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

const dicts = { nl, en } satisfies Record<Locale, Dict>;

export function getDict(locale: Locale): Dict {
  return dicts[locale];
}

export type { Dict } from "./types";
