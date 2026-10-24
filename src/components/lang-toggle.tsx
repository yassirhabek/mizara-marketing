"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/locales";

/** Same slugs in both locales, so switching only swaps the first segment. Links stay crawlable. */
export function LangToggle({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="inline-flex items-center rounded-full border border-rule bg-card/80 p-0.5 text-xs" role="group" aria-label={label}>
      {locales.map((loc) => {
        const active = loc === current;
        return (
          <Link
            key={loc}
            href={`/${loc}${rest ? `/${rest}` : ""}`}
            hrefLang={loc}
            lang={loc}
            aria-current={active ? "true" : undefined}
            scroll={false}
            className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2 font-semibold uppercase tracking-wide transition-colors ${
              active ? "bg-wash text-carbon-deep dark:text-carbon" : "text-muted hover:text-ink"
            }`}
          >
            {loc}
          </Link>
        );
      })}
    </div>
  );
}
