import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import { DEMO_BUSINESS } from "@/lib/demo-tax/scenario";
import { formatDate } from "@/lib/money";
import { Money } from "./primitives";

export type InvoicePaperProps = {
  ui: Dict["ui"];
  lang: Locale;
  number: string;
  date: string;
  dueDate: string;
  client: { name: string; city: string };
  description: string;
  exVatCents: number;
  vatRate: number;
  vatCents: number;
  status?: "paid" | "open";
  className?: string;
};

/** A4-ish invoice sheet in the product's preview style. */
export function InvoicePaper({
  ui,
  lang,
  number,
  date,
  dueDate,
  client,
  description,
  exVatCents,
  vatRate,
  vatCents,
  status,
  className = "",
}: InvoicePaperProps) {
  return (
    <article className={`paper-sheet relative overflow-hidden text-[12px] leading-snug ${className}`} aria-label={`${ui.invoice} ${number}`}>
      <div className="letter-rule absolute inset-x-0 top-0 h-1 rounded-none" aria-hidden="true" />
      <div className="px-5 pb-5 pt-6 sm:px-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="display text-[15px] leading-tight">{DEMO_BUSINESS.name}</p>
            <p className="mt-0.5 text-muted">{DEMO_BUSINESS.city}</p>
            <p className="text-muted">KvK {DEMO_BUSINESS.kvk} · {DEMO_BUSINESS.vatId}</p>
          </div>
          <div className="text-right">
            <p className="display text-[17px] leading-tight text-carbon-deep dark:text-carbon">{ui.invoice}</p>
            <p className="money mt-0.5 text-muted">{number}</p>
          </div>
        </header>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">{ui.billTo}</p>
            <p className="mt-1 font-medium">{client.name}</p>
            <p className="text-muted">{client.city}</p>
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-right">
            <dt className="text-muted">{ui.invoiceDate}</dt>
            <dd className="money">{formatDate(date, lang, "short")}</dd>
            <dt className="text-muted">{ui.dueDate}</dt>
            <dd className="money">{formatDate(dueDate, lang, "short")}</dd>
          </dl>
        </div>

        <table className="mt-5 w-full border-collapse">
          <thead>
            <tr className="border-b border-rule text-[10px] uppercase tracking-[0.14em] text-muted">
              <th className="pb-1.5 text-left font-medium">{ui.description}</th>
              <th className="pb-1.5 text-right font-medium">{ui.vat}</th>
              <th className="pb-1.5 text-right font-medium">{ui.amount}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-rule/70">
              <td className="py-2 pr-2">{description}</td>
              <td className="money py-2 text-right text-muted">{vatRate}%</td>
              <td className="py-2 text-right">
                <Money cents={exVatCents} lang={lang} />
              </td>
            </tr>
          </tbody>
        </table>

        <dl className="ml-auto mt-3 grid w-full max-w-[15rem] grid-cols-[1fr_auto] gap-x-4 gap-y-1">
          <dt className="text-muted">{ui.subtotal}</dt>
          <dd className="text-right">
            <Money cents={exVatCents} lang={lang} />
          </dd>
          <dt className="text-muted">
            {ui.vat} {vatRate}%
          </dt>
          <dd className="text-right">
            <Money cents={vatCents} lang={lang} />
          </dd>
          <dt className="border-t border-rule pt-1.5 font-semibold">{ui.total}</dt>
          <dd className="border-t border-rule pt-1.5 text-right font-semibold">
            <Money cents={exVatCents + vatCents} lang={lang} />
          </dd>
        </dl>

        <footer className="mt-5 flex items-center justify-between gap-3 border-t border-dashed border-rule pt-3 text-[11px] text-muted">
          <span>{ui.paymentTerm}</span>
          <span className="money">{DEMO_BUSINESS.iban}</span>
        </footer>
      </div>
      {status ? (
        <span
          className={`absolute right-5 top-20 -rotate-12 rounded-md border-2 px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.2em] ${
            status === "paid" ? "border-paid/70 text-paid" : "border-warn/70 text-warn"
          }`}
        >
          {status === "paid" ? ui.paid : ui.open}
        </span>
      ) : null}
    </article>
  );
}
