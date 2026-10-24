import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import type { HomeStory } from "@/lib/demo-tax/story";
import { lineVatCents } from "@/lib/demo-tax/engine";
import { BASELINE_INVOICES, DEFAULT_INVOICE, DEMO_CLIENTS, DEMO_RECEIPT } from "@/lib/demo-tax/scenario";
import { formatDate } from "@/lib/money";
import { AppFrame } from "./app-frame";
import { InvoicePaper } from "./invoice-paper";
import { Badge, Label, Money } from "./primitives";
import { TaxEnvelope } from "./tax-envelope";

type SceneProps = { ui: Dict["ui"]; lang: Locale; story: HomeStory };

const clientName = (id: string) => DEMO_CLIENTS.find((c) => c.id === id)?.name ?? "";

export const NAV_INDEX = { tax: 0, expenses: 1, invoices: 2, bank: 4 } as const;

export function sampleInvoice({ ui, lang, story }: SceneProps) {
  const client = DEMO_CLIENTS.find((c) => c.id === DEFAULT_INVOICE.clientId) ?? DEMO_CLIENTS[0];
  return {
    ui,
    lang,
    number: DEFAULT_INVOICE.number,
    date: DEFAULT_INVOICE.date,
    dueDate: "2026-10-28",
    client,
    description: ui.sampleInvoice,
    exVatCents: story.invoice.exVatCents,
    vatRate: story.invoice.vatRate,
    vatCents: story.invoice.vatCents,
  };
}

function StatTile({ label, children, tone }: { label: string; children: React.ReactNode; tone?: "paid" }) {
  return (
    <div className="rounded-xl border border-rule bg-card px-3.5 py-3">
      <Label>{label}</Label>
      <p className={`display mt-1.5 text-lg leading-none sm:text-xl ${tone === "paid" ? "text-paid" : ""}`}>{children}</p>
    </div>
  );
}

/** Act III: everything on one screen. */
export function DashboardScene({ ui, lang, story }: SceneProps) {
  const s = story.after;
  return (
    <AppFrame nav={ui.nav} active={NAV_INDEX.tax} title={ui.overview}>
      <div className="grid gap-3 lg:grid-cols-[1fr_1.1fr]">
        <div className="grid content-start gap-3">
          <div className="grid grid-cols-3 gap-2.5">
            <StatTile label={ui.revenueYtd}>
              <Money cents={s.omzetCents} lang={lang} whole className="[font-family:inherit]" />
            </StatTile>
            <StatTile label={ui.costsYtd}>
              <Money cents={s.kostenCents} lang={lang} whole className="[font-family:inherit]" />
            </StatTile>
            <StatTile label={ui.profitYtd} tone="paid">
              <Money cents={s.winstCents} lang={lang} whole className="[font-family:inherit]" />
            </StatTile>
          </div>
          <div className="rounded-xl border border-rule bg-card">
            <div className="flex items-center justify-between border-b border-rule px-3.5 py-2.5">
              <Label>{ui.invoice}</Label>
              <Badge>{ui.openInvoices}</Badge>
            </div>
            <ul className="divide-y divide-rule/70 text-[12px]">
              <li className="flex items-center justify-between gap-3 px-3.5 py-2.5">
                <span className="min-w-0 truncate">
                  <span className="money text-muted">{DEFAULT_INVOICE.number}</span> {clientName(DEFAULT_INVOICE.clientId)}
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <Badge tone="carbon">{ui.open}</Badge>
                  <Money cents={story.invoice.inclCents} lang={lang} />
                </span>
              </li>
              {BASELINE_INVOICES.slice(-2).reverse().map((inv) => (
                <li key={inv.id} className="flex items-center justify-between gap-3 px-3.5 py-2.5">
                  <span className="min-w-0 truncate">
                    <span className="money text-muted">{inv.number}</span> {clientName(inv.clientId)}
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <Badge tone="paid">{ui.paid}</Badge>
                    <Money cents={inv.exVatCents + lineVatCents(inv.exVatCents, inv.vatRate)} lang={lang} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <TaxEnvelope
          ui={ui}
          lang={lang}
          setAsideCents={s.setAsideCents}
          btwCents={s.btwPayableCents}
          ibZvwCents={s.ibZvwBufferedCents}
          size="sm"
        />
      </div>
    </AppFrame>
  );
}

export function InvoiceScene(props: SceneProps) {
  const { ui, lang, story } = props;
  return (
    <AppFrame nav={ui.nav} active={NAV_INDEX.invoices} title={`${ui.invoice} ${DEFAULT_INVOICE.number}`}>
      <div className="grid gap-3 xl:grid-cols-[1.35fr_1fr]">
        <InvoicePaper {...sampleInvoice(props)} />
        <div className="grid content-start gap-2.5 rounded-xl border border-rule bg-card p-3.5 text-[12px]">
          <Label>{ui.keep}</Label>
          <p className="display text-2xl leading-none text-paid">
            <Money cents={story.invoiceKeepCents} lang={lang} className="[font-family:inherit]" />
          </p>
          <dl className="mt-1 grid gap-1.5">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">{ui.amount}</dt>
              <dd><Money cents={story.invoice.exVatCents} lang={lang} /></dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">IB + Zvw</dt>
              <dd><Money cents={story.invoiceIbZvwCents} lang={lang} tone="fiscal" sign="minus" /></dd>
            </div>
          </dl>
        </div>
      </div>
    </AppFrame>
  );
}

export function ReceiptPaper({ ui, lang, story, className = "" }: SceneProps & { className?: string }) {
  return (
    <div className={`receipt rounded-t-lg px-4 pb-6 pt-4 font-mono text-[11px] leading-relaxed shadow-lift ${className}`}>
      <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em]">{DEMO_RECEIPT.vendor}</p>
      <p className="text-center opacity-60">{formatDate(DEMO_RECEIPT.date, lang, "short")}</p>
      <div className="my-2 border-t border-dashed border-current/30" />
      <div className="flex justify-between gap-3">
        <span>{ui.sampleReceipt}</span>
        <Money cents={story.expense.inclCents} lang={lang} />
      </div>
      <div className="flex justify-between gap-3 opacity-60">
        <span>{ui.vat} 21%</span>
        <Money cents={story.expense.vatCents} lang={lang} />
      </div>
      <div className="my-2 border-t border-dashed border-current/30" />
      <div className="flex justify-between gap-3 font-semibold">
        <span>{ui.total}</span>
        <Money cents={story.expense.inclCents} lang={lang} />
      </div>
    </div>
  );
}

export function ExpenseScene(props: SceneProps) {
  const { ui, lang, story } = props;
  const fields: [string, React.ReactNode][] = [
    [ui.vendor, DEMO_RECEIPT.vendor],
    [ui.date, formatDate(DEMO_RECEIPT.date, lang, "short")],
    [ui.total, <Money key="t" cents={story.expense.inclCents} lang={lang} />],
    [ui.vat, <Money key="v" cents={story.expense.vatCents} lang={lang} />],
    [ui.category, ui.officeCategory],
  ];
  return (
    <AppFrame nav={ui.nav} active={NAV_INDEX.expenses} title={ui.expense}>
      <div className="grid gap-4 sm:grid-cols-[0.8fr_1fr]">
        <div className="relative mx-auto w-full max-w-[14rem] -rotate-2">
          <ReceiptPaper {...props} />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-carbon/25 to-transparent [animation:mz-scan_3.2s_ease-in-out_infinite]"
          />
        </div>
        <div className="rounded-xl border border-rule bg-card p-3.5">
          <dl className="grid gap-2 text-[12px]">
            {fields.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-3 rounded-lg border border-rule/80 bg-paper px-2.5 py-1.5">
                <dt className="text-muted">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 flex items-center justify-between gap-2">
            <Badge tone="carbon">{ui.toCheck}</Badge>
            <span className="inline-flex h-8 items-center rounded-full bg-carbon px-3.5 text-[12px] font-semibold text-[#fffcf6] dark:text-[#1c1712]">
              {ui.confirmed}
            </span>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

export function BankScene({ ui, lang, story }: SceneProps) {
  const lines: { date: string; who: string; cents: number; status: "matched" | "suggestion"; target: string }[] = [
    { date: "2026-10-14", who: clientName(DEFAULT_INVOICE.clientId), cents: story.invoice.inclCents, status: "matched", target: `${ui.invoice} ${DEFAULT_INVOICE.number}` },
    { date: "2026-10-09", who: DEMO_RECEIPT.vendor, cents: -story.expense.inclCents, status: "matched", target: ui.receipt },
    { date: "2026-10-06", who: ui.ownTransfer, cents: -150_000, status: "matched", target: ui.ownTransfer },
    { date: "2026-10-01", who: "KPN B.V.", cents: -4_235, status: "suggestion", target: ui.phoneProvider },
  ];
  return (
    <AppFrame nav={ui.nav} active={NAV_INDEX.bank} title={ui.bankImport}>
      <div className="mb-3 flex items-center gap-2 rounded-lg border border-dashed border-rule bg-card px-3 py-2 text-[12px] text-muted">
        <svg viewBox="0 0 16 16" className="h-4 w-4 text-carbon" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 1.5h5l3 3v10H4z M9 1.5v3h3" strokeLinejoin="round" />
        </svg>
        <span className="money">{ui.statementFile}</span>
        <span className="ml-auto">CAMT.053</span>
      </div>
      <ul className="divide-y divide-rule/70 rounded-xl border border-rule bg-card text-[12px]">
        {lines.map((line) => (
          <li key={line.date + line.who} className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1 px-3.5 py-2.5">
            <span className="money text-muted">{formatDate(line.date, lang, "short").replace(/ 2026$/, "")}</span>
            <span className="min-w-0 truncate font-medium">{line.who}</span>
            <Money cents={Math.abs(line.cents)} lang={lang} tone={line.cents > 0 ? "paid" : "default"} sign={line.cents > 0 ? "plus" : "minus"} />
            <span className="col-start-2 col-end-4 flex items-center gap-2 text-muted">
              <Badge tone={line.status === "matched" ? "paid" : "carbon"}>{line.status === "matched" ? ui.matched : ui.suggestion}</Badge>
              <span className="truncate">{line.target}</span>
            </span>
          </li>
        ))}
      </ul>
    </AppFrame>
  );
}

export function TaxScene({ ui, lang, story }: SceneProps) {
  const s = story.after;
  const parts = [
    { label: ui.btwQuarter, cents: s.btwPayableCents, tone: "bg-fiscal" },
    { label: ui.ibZvwYear, cents: s.ibZvwBufferedCents, tone: "bg-warn" },
  ];
  const total = parts.reduce((sum, part) => sum + part.cents, 0);
  return (
    <AppFrame nav={ui.nav} active={NAV_INDEX.tax} title={ui.taxOverview}>
      <TaxEnvelope ui={ui} lang={lang} setAsideCents={s.setAsideCents} btwCents={s.btwPayableCents} ibZvwCents={s.ibZvwBufferedCents} size="sm" />
      <div className="mt-3 rounded-xl border border-rule bg-card p-3.5">
        <div className="flex h-2.5 overflow-hidden rounded-full bg-wash" aria-hidden="true">
          {parts.map((part) => (
            <span key={part.label} className={part.tone} style={{ width: `${(part.cents / total) * 100}%` }} />
          ))}
        </div>
        <dl className="mt-3 grid gap-1.5 text-[12px]">
          <div className="flex justify-between gap-3">
            <dt className="text-muted">{ui.revenueYtd}</dt>
            <dd><Money cents={s.omzetCents} lang={lang} /></dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">{ui.profitYtd}</dt>
            <dd><Money cents={s.winstCents} lang={lang} /></dd>
          </div>
        </dl>
      </div>
    </AppFrame>
  );
}
