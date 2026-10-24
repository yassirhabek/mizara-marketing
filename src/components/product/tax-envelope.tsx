import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import { Label, Money, Stamp } from "./primitives";

/** Mirrors the product's TaxEnvelope: one number to keep, split into BTW and IB + Zvw. */
export function TaxEnvelope({
  ui,
  lang,
  setAsideCents,
  btwCents,
  ibZvwCents,
  amount,
  size = "md",
  className = "",
}: {
  ui: Dict["ui"];
  lang: Locale;
  setAsideCents: number;
  btwCents: number;
  ibZvwCents: number;
  /** Optional replacement for the big number, e.g. an animated counter. */
  amount?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const numberSize = { sm: "text-3xl", md: "text-4xl sm:text-5xl", lg: "text-5xl sm:text-7xl" }[size];
  return (
    <div className={`panel overflow-hidden ${className}`}>
      <div className="flex items-start justify-between gap-4 px-5 pb-4 pt-5">
        <div className="min-w-0">
          <Label>{ui.reserveLabel}</Label>
          <p className={`display mt-2 leading-none tracking-tight ${numberSize}`}>
            {amount ?? <Money cents={setAsideCents} lang={lang} whole className="[font-family:inherit] [letter-spacing:inherit]" />}
          </p>
        </div>
        <Stamp>{ui.reserveBadge}</Stamp>
      </div>
      <dl className="grid gap-2.5 border-t border-rule px-5 py-4 text-sm">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-muted">{ui.btwQuarter}</dt>
          <dd>
            <Money cents={btwCents} lang={lang} tone="fiscal" />
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-muted">{ui.ibZvwYear}</dt>
          <dd>
            <Money cents={ibZvwCents} lang={lang} />
          </dd>
        </div>
      </dl>
    </div>
  );
}
