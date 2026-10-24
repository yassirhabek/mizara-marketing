import { nl } from "./nl";
import { en } from "./en";
import type { Locale } from "./locales";
import type { Dict } from "./types";

export * from "./locales";
export type * from "./types";

const dicts = { nl, en } satisfies Record<Locale, Dict>;

/** Server-side only: pass the strings a client component needs as props. */
export function getDict(locale: Locale): Dict {
  return dicts[locale];
}
