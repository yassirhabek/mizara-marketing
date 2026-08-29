"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n";

export function LangToggle({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next === current) return;
    // The proxy persists the `locale` cookie once it sees the new `/xx` segment.
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || `/${next}`);
  }

  return (
    <div
      className="inline-flex items-center rounded-lg border border-rule bg-card p-0.5 text-xs"
      role="group"
      aria-label={label}
    >
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          aria-pressed={loc === current}
          className={`rounded-md px-2 py-1 font-medium uppercase tracking-wide transition-colors ${
            loc === current
              ? "bg-wash text-carbon"
              : "text-muted hover:text-ink"
          }`}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
