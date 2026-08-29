"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n";

/**
 * The root layout renders `<html lang="nl">` statically so the landing pages can be
 * prerendered. This corrects the attribute per route on the client (crawlers that run
 * JS pick it up; the hreflang alternates in metadata are the primary signal anyway).
 */
export function HtmlLang({ lang }: { lang: Locale }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
