import type { Locale } from "@/i18n/locales";
import { formatEuro, formatEuroWhole } from "@/lib/money";

type Tone = "default" | "fiscal" | "paid" | "muted" | "carbon";

const toneClass: Record<Tone, string> = {
  default: "",
  fiscal: "text-fiscal",
  paid: "text-paid",
  muted: "text-muted",
  carbon: "text-carbon-deep dark:text-carbon",
};

export function Money({
  cents,
  lang,
  tone = "default",
  whole,
  sign,
  className = "",
}: {
  cents: number;
  lang: Locale;
  tone?: Tone;
  whole?: boolean;
  sign?: "minus" | "plus";
  className?: string;
}) {
  const text = whole ? formatEuroWhole(cents, lang) : formatEuro(cents, lang);
  const prefix = sign === "minus" ? "− " : sign === "plus" ? "+ " : "";
  return <span className={`money ${toneClass[tone]} ${className}`}>{prefix}{text}</span>;
}

export function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "carbon" | "paid" | "fiscal" }) {
  const tones = {
    default: "bg-wash text-muted",
    carbon: "bg-carbon/10 text-carbon-deep dark:text-carbon",
    paid: "bg-paid/12 text-paid",
    fiscal: "bg-fiscal/10 text-fiscal",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${tones[tone]}`}>
      {children}
    </span>
  );
}

/** The fiscal stamp from the product's reserve card. */
export function Stamp({ children }: { children: React.ReactNode }) {
  return (
    <span data-m="stamp" className="inline-flex -rotate-6 flex-col items-center justify-center rounded-full border-2 border-fiscal/70 px-3 py-2 text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.16em] text-fiscal">
      {children}
    </span>
  );
}

export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted ${className}`}>{children}</p>;
}

export function FictionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-rule bg-card/80 px-2.5 py-1 text-[11px] font-medium text-muted">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-warn" />
      {children}
    </span>
  );
}
