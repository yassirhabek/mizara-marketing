"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useReducer, useRef, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { appUrl, signupUrl } from "@/lib/env";
import { useAuthHint } from "@/components/use-auth-hint";
import { formatDate, formatEuro, formatEuroWhole, centsToInput } from "@/lib/money";
import { DEMO_CLIENTS, DEMO_RECEIPT, EXPENSE_CATEGORIES, type ExpenseCategory } from "@/lib/demo-tax/scenario";
import { splitInclVat } from "@/lib/demo-tax/engine";
import { VAT_RATES } from "@/lib/demo-tax/tables";
import { InvoicePaper } from "@/components/product/invoice-paper";
import { Badge, FictionTag, Label, Money, Stamp } from "@/components/product/primitives";
import { TaxDisclaimer } from "@/components/tax-disclaimer";
import { buttonClass } from "@/components/ui/button";
import type { DemoStrings } from "./strings";
import type { DemoVariant } from "./demo-loader";
import {
  GUIDED_EXPENSE_ID,
  STEPS,
  figures,
  guidedExpense,
  guidedInvoice,
  initialState,
  invoiceVatCents,
  ledger,
  reducer,
  validAmount,
  type Action,
  type DemoState,
  type Figures,
} from "./state";

type Props = { lang: Locale; strings: DemoStrings; variant: DemoVariant };
type Ctx = { lang: Locale; s: DemoStrings; state: DemoState; dispatch: React.Dispatch<Action>; f: Figures };

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const field =
  "block w-full min-h-11 rounded-xl border border-rule bg-card px-3.5 text-base text-ink transition-[border-color,box-shadow] focus:border-carbon focus:outline-none focus:ring-3 focus:ring-carbon/20 aria-[invalid=true]:border-fiscal";

const clientById = (id: string) => DEMO_CLIENTS.find((client) => client.id === id) ?? DEMO_CLIENTS[0];

/** A euro amount that counts to its new value instead of jumping. Owns its text node. */
function TweenMoney({ cents, lang, whole, className = "" }: { cents: number; lang: Locale; whole?: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(cents);
  const fmt = whole ? formatEuroWhole : formatEuro;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from = shown.current;
    if (from === cents || prefersReducedMotion()) {
      shown.current = cents;
      el.textContent = fmt(cents, lang);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 520);
      const eased = 1 - Math.pow(1 - p, 3);
      shown.current = Math.round(from + (cents - from) * eased);
      el.textContent = fmt(shown.current, lang);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [cents, lang, fmt]);

  return <span ref={ref} className={`money ${className}`} />;
}

export default function Demo({ lang, strings: s, variant }: Props) {
  const amountInput = (cents: number) => centsToInput(cents, lang);
  const [state, dispatch] = useReducer(reducer, undefined, () => initialState(amountInput));
  const f = useMemo(() => figures(state), [state]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const ctx: Ctx = { lang, s, state, dispatch, f };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    const top = rootRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) rootRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }, [state.step]);

  const stepIndex = STEPS.indexOf(state.step);
  const titles = { invoice: s.demo.invoice.title, expense: s.demo.expense.title, overview: s.demo.overview.title, sandbox: s.demo.sandbox.title };
  const texts = { invoice: s.demo.invoice.text, expense: s.demo.expense.text, overview: s.demo.overview.text, sandbox: s.demo.sandbox.text };

  return (
    <div ref={rootRef} className={`scroll-mt-24 text-left ${variant === "embedded" ? "p-4 sm:p-6 lg:p-8" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Stepper ctx={ctx} />
        <FictionTag>{s.tax.demoBadge}</FictionTag>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
        <div className="min-w-0">
          <p className="text-sm text-muted">{s.demo.stepOf.replace("{n}", String(stepIndex + 1)).replace("{total}", String(STEPS.length))}</p>
          <h3 ref={headingRef} tabIndex={-1} className="display mt-1 text-2xl text-balance outline-none sm:text-3xl">
            {titles[state.step]}
          </h3>
          <p className="mt-2 max-w-prose text-pretty text-ink-soft">{texts[state.step]}</p>
          <div className="mt-6">
            {state.step === "invoice" ? <InvoiceForm ctx={ctx} /> : null}
            {state.step === "expense" ? <ReceiptForm ctx={ctx} /> : null}
            {state.step === "overview" ? <OverviewIntro ctx={ctx} /> : null}
            {state.step === "sandbox" ? <Sandbox ctx={ctx} amountInput={amountInput} /> : null}
          </div>
        </div>

        <div className={`min-w-0 lg:sticky lg:top-24 lg:order-none lg:self-start ${state.step === "overview" ? "order-first" : ""}`}>
          {state.step === "invoice" ? <InvoicePreview ctx={ctx} /> : null}
          {state.step === "expense" ? <ReceiptPreview ctx={ctx} /> : null}
          {state.step === "overview" || state.step === "sandbox" ? <Overview ctx={ctx} /> : null}
        </div>
      </div>

      {state.step === "sandbox" ? <Result s={s} /> : null}
      <p className="mt-6 text-xs text-muted">{s.demo.privacyNote}</p>
    </div>
  );
}

function Stepper({ ctx }: { ctx: Ctx }) {
  const { s, state, dispatch } = ctx;
  const current = STEPS.indexOf(state.step);
  return (
    <ol className="flex flex-wrap items-center gap-1.5">
      {STEPS.map((step, index) => {
        const reachable = index <= state.reached;
        const active = index === current;
        return (
          <li key={step}>
            <button
              type="button"
              disabled={!reachable}
              aria-current={active ? "step" : undefined}
              onClick={() => dispatch({ type: "go", step })}
              className={`inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-sm font-medium transition-colors ${
                active ? "bg-ink text-paper" : reachable ? "bg-wash text-ink hover:bg-rule" : "text-muted/70"
              }`}
            >
              <span className={`money flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${active ? "bg-paper/15" : "bg-card"}`}>
                {index < state.reached && !active ? "✓" : index + 1}
              </span>
              {s.demo.steps[step]}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function VatRadios({ name, value, onChange, legend, help }: { name: string; value: number; onChange: (rate: number) => void; legend: string; help?: Record<"21" | "9" | "0", string> }) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="mt-2 grid gap-2">
        {VAT_RATES.map((rate) => (
          <label
            key={rate}
            className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border border-rule bg-card px-3.5 py-2.5 transition-colors has-[:checked]:border-carbon has-[:checked]:bg-carbon/5"
          >
            <input type="radio" name={name} value={rate} checked={value === rate} onChange={() => onChange(rate)} className="mt-1 accent-[var(--carbon)]" />
            <span>
              <span className="money font-medium">{rate}%</span>
              {help ? <span className="block text-sm text-muted">{help[String(rate) as "21" | "9" | "0"]}</span> : null}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function AmountField({ label, help, error, value, onChange, showError }: { label: string; help: string; error: string; value: string; onChange: (value: string) => void; showError: boolean }) {
  const id = useId();
  const invalid = showError && validAmount(value) === null;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-2">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true">
          €
        </span>
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={invalid}
          aria-describedby={`${id}-help`}
          className={`${field} money pl-8`}
        />
      </div>
      <p id={`${id}-help`} className={`mt-1.5 text-sm ${invalid ? "text-fiscal" : "text-muted"}`} aria-live="polite">
        {invalid ? error : help}
      </p>
    </div>
  );
}

function InvoiceForm({ ctx }: { ctx: Ctx }) {
  const { s, state, dispatch } = ctx;
  const d = s.demo.invoice;
  const clientId = useId();
  const [touched, setTouched] = useState(false);
  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        setTouched(true);
        dispatch({ type: "bookInvoice" });
      }}
      noValidate
    >
      <div>
        <label htmlFor={clientId} className="text-sm font-medium">
          {d.client}
        </label>
        <select id={clientId} value={state.invoice.clientId} onChange={(event) => dispatch({ type: "invoice", patch: { clientId: event.target.value } })} className={`${field} mt-2`}>
          {DEMO_CLIENTS.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
      <AmountField
        label={d.amount}
        help={d.amountHelp}
        error={d.amountError}
        value={state.invoice.amount}
        showError={touched || state.invoice.amount.trim() !== "" }
        onChange={(amount) => dispatch({ type: "invoice", patch: { amount } })}
      />
      <VatRadios name="invoice-vat" legend={d.vatRate} help={d.vatHelp} value={state.invoice.vatRate} onChange={(vatRate) => dispatch({ type: "invoice", patch: { vatRate } })} />
      <div>
        <button type="submit" className={buttonClass("primary", "lg", "w-full sm:w-auto")}>
          {state.invoiceBooked ? s.demo.next : d.create}
        </button>
      </div>
    </form>
  );
}

function InvoicePreview({ ctx }: { ctx: Ctx }) {
  const { s, state, lang } = ctx;
  const cents = validAmount(state.invoice.amount) ?? 0;
  return (
    <figure>
      <figcaption className="mb-3 flex items-center justify-between gap-3">
        <Label>{s.demo.invoice.preview}</Label>
      </figcaption>
      <InvoicePaper
        ui={s.ui}
        lang={lang}
        number="2026-014"
        date="2026-10-14"
        dueDate="2026-10-28"
        client={clientById(state.invoice.clientId)}
        description={s.ui.sampleInvoice}
        exVatCents={cents}
        vatRate={state.invoice.vatRate}
        vatCents={invoiceVatCents(cents, state.invoice.vatRate)}
        status={state.invoiceBooked ? "open" : undefined}
        className="mx-auto max-w-lg text-[12.5px]"
      />
    </figure>
  );
}

function useScanning(active: boolean) {
  const [scanning, setScanning] = useState(() => active && !prefersReducedMotion());
  useEffect(() => {
    if (!scanning) return;
    const timer = setTimeout(() => setScanning(false), 1300);
    return () => clearTimeout(timer);
  }, [scanning]);
  return scanning;
}

function ReceiptForm({ ctx }: { ctx: Ctx }) {
  const { s, state, dispatch, lang } = ctx;
  const d = s.demo.expense;
  const scanning = useScanning(!state.receiptBooked);
  const vendorId = useId();
  const categoryId = useId();
  const [touched, setTouched] = useState(false);
  const check = state.receiptBooked ? null : <Badge tone="carbon">{d.checkPrompt}</Badge>;

  if (scanning) {
    return (
      <p className="flex min-h-40 items-center gap-3 rounded-xl border border-dashed border-rule bg-card px-4 text-ink-soft" role="status">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-carbon" aria-hidden="true" />
        {d.scanning}
      </p>
    );
  }

  return (
    <form
      className="grid gap-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setTouched(true);
        dispatch({ type: "bookReceipt" });
      }}
    >
      <p className="rounded-xl border border-warn/30 bg-warn/8 px-3.5 py-2.5 text-sm text-ink-soft">{d.readNote}</p>
      <div>
        <div className="flex items-center justify-between gap-2">
          <label htmlFor={vendorId} className="text-sm font-medium">
            {d.vendor}
          </label>
          {check}
        </div>
        <input id={vendorId} value={state.receipt.vendor} onChange={(event) => dispatch({ type: "receipt", patch: { vendor: event.target.value } })} className={`${field} mt-2`} autoComplete="off" />
      </div>
      <div className="grid gap-1.5">
        <span className="text-sm font-medium">{d.date}</span>
        <p className="money flex min-h-11 items-center rounded-xl border border-rule bg-wash/60 px-3.5 text-ink-soft">{formatDate(DEMO_RECEIPT.date, lang, "long")}</p>
      </div>
      <AmountField
        label={d.total}
        help={d.confirmHelp}
        error={s.demo.invoice.amountError}
        value={state.receipt.total}
        showError={touched || state.receipt.total.trim() !== ""}
        onChange={(total) => dispatch({ type: "receipt", patch: { total } })}
      />
      <VatRadios name="receipt-vat" legend={d.vatRate} value={state.receipt.vatRate} onChange={(vatRate) => dispatch({ type: "receipt", patch: { vatRate } })} />
      <div>
        <label htmlFor={categoryId} className="text-sm font-medium">
          {d.category}
        </label>
        <CategorySelect id={categoryId} s={s} value={state.receipt.category} onChange={(category) => dispatch({ type: "receipt", patch: { category } })} />
      </div>
      <div>
        <button type="submit" className={buttonClass("primary", "lg", "w-full sm:w-auto")}>
          {state.receiptBooked ? s.demo.next : d.confirm}
        </button>
      </div>
    </form>
  );
}

function CategorySelect({ id, s, value, onChange }: { id: string; s: DemoStrings; value: ExpenseCategory; onChange: (category: ExpenseCategory) => void }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(event) => {
        const next = EXPENSE_CATEGORIES.find((category) => category === event.target.value);
        if (next) onChange(next);
      }}
      className={`${field} mt-2`}
    >
      {EXPENSE_CATEGORIES.map((category) => (
        <option key={category} value={category}>
          {s.demo.expense.categories[category]}
        </option>
      ))}
    </select>
  );
}

function ReceiptPreview({ ctx }: { ctx: Ctx }) {
  const { s, state, lang } = ctx;
  const scanning = useScanning(!state.receiptBooked);
  const incl = validAmount(state.receipt.total) ?? 0;
  const expense = guidedExpense({ ...state, receiptBooked: true });
  return (
    <figure className="mx-auto max-w-sm">
      <figcaption className="mb-3">
        <Label>{s.demo.expense.receiptTitle}</Label>
      </figcaption>
      <div className="relative rotate-[-1.5deg] overflow-hidden">
        <div className="receipt rounded-t-lg px-6 pb-8 pt-6 font-mono text-[12.5px] leading-relaxed shadow-lift">
          <p className="text-center text-[13px] font-semibold uppercase tracking-[0.18em]">{DEMO_RECEIPT.vendor}</p>
          <p className="text-center opacity-60">Groningen · {formatDate(DEMO_RECEIPT.date, lang, "short")}</p>
          <div className="my-3 border-t border-dashed border-current/30" />
          <div className="flex justify-between gap-3">
            <span>{s.ui.sampleReceipt}</span>
            <span>{formatEuro(DEMO_RECEIPT.inclCents, lang)}</span>
          </div>
          <div className="flex justify-between gap-3 opacity-60">
            <span>
              {s.ui.vat} {DEMO_RECEIPT.vatRate}%
            </span>
            <span>{formatEuro(splitInclVat(DEMO_RECEIPT.inclCents, DEMO_RECEIPT.vatRate).vatCents, lang)}</span>
          </div>
          <div className="my-3 border-t border-dashed border-current/30" />
          <div className="flex justify-between gap-3 font-semibold">
            <span>{s.ui.total}</span>
            <span>{formatEuro(DEMO_RECEIPT.inclCents, lang)}</span>
          </div>
          <p className="mt-4 text-center opacity-50">PIN · ****1234</p>
        </div>
        {scanning ? (
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-carbon/25 to-carbon/50 [animation:mz-scan_1.2s_ease-in-out_infinite]" />
        ) : null}
      </div>
      {!scanning && expense ? (
        <dl className="mt-5 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 rounded-xl border border-rule bg-card p-4 text-sm">
          <dt className="text-muted">{s.ui.amount}</dt>
          <dd className="text-right">
            <Money cents={expense.exVatCents} lang={lang} />
          </dd>
          <dt className="text-muted">
            {s.ui.vat} {expense.vatRate}%
          </dt>
          <dd className="text-right">
            <Money cents={expense.vatCents} lang={lang} />
          </dd>
          <dt className="border-t border-rule pt-1.5 font-medium">{s.ui.total}</dt>
          <dd className="border-t border-rule pt-1.5 text-right font-medium">
            <Money cents={incl} lang={lang} />
          </dd>
        </dl>
      ) : null}
    </figure>
  );
}

function OverviewIntro({ ctx }: { ctx: Ctx }) {
  const { s, dispatch } = ctx;
  return (
    <div className="grid gap-5">
      <Assumptions s={s} />
      <div>
        <button type="button" onClick={() => dispatch({ type: "next" })} className={buttonClass("primary", "lg", "w-full sm:w-auto")}>
          {s.demo.next}
        </button>
      </div>
    </div>
  );
}

function Assumptions({ s }: { s: DemoStrings }) {
  return (
    <details className="group rounded-xl border border-rule bg-card">
      <summary className="flex min-h-11 items-center justify-between gap-3 px-4 py-2.5 text-sm font-semibold">
        {s.demo.overview.assumptionsTitle}
        <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-180">
          ⌄
        </span>
      </summary>
      <ul className="grid gap-1.5 px-4 pb-4 text-sm text-ink-soft">
        {s.demo.overview.assumptions.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
            {item}
          </li>
        ))}
      </ul>
    </details>
  );
}

function Overview({ ctx }: { ctx: Ctx }) {
  const { s, lang, f } = ctx;
  const o = s.demo.overview;
  const n = f.now;
  const delta = f.reserveDeltaCents;
  const announce = s.demo.sandbox.announce.replace("{amount}", formatEuroWhole(n.setAsideCents, lang));

  const details: [string, number, "minus" | undefined][] = [
    [o.details.winst, n.winstCents, undefined],
    [o.details.zelfstandigenaftrek, n.zelfstandigenaftrekCents, "minus"],
    [o.details.startersaftrek, n.startersaftrekCents, "minus"],
    [o.details.mkb, n.mkbVrijstellingCents, "minus"],
    [o.details.belastbaar, n.belastbareWinstCents, undefined],
    [o.details.box1, n.box1Cents, undefined],
    [o.details.ahk, n.ahkCents, "minus"],
    [o.details.arbeidskorting, n.arbeidskortingCents, "minus"],
    [o.details.tariefbeperking, n.tariefbeperkingCents, undefined],
    [o.details.ib, n.ibCents, undefined],
    [o.details.zvw, n.zvwCents, undefined],
    [o.details.buffer, n.ibZvwBufferCents, undefined],
    [o.details.outputBtw, n.outputBtwCents, undefined],
    [o.details.inputBtw, n.inputBtwCents, "minus"],
  ];

  return (
    <div className="grid gap-3">
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
      <div className="panel overflow-hidden">
        <div className="flex items-start justify-between gap-4 px-5 pb-4 pt-5">
          <div className="min-w-0">
            <Label>{o.reserve}</Label>
            <p className="display mt-2 text-5xl leading-none tracking-tight sm:text-6xl">
              <TweenMoney cents={n.setAsideCents} lang={lang} whole className="[font-family:inherit] [letter-spacing:inherit]" />
            </p>
            {delta !== 0 ? (
              <p className="mt-2.5 text-sm text-muted">
                <span className={`money font-medium ${delta > 0 ? "text-fiscal" : "text-paid"}`}>
                  {delta > 0 ? "+" : "−"} {formatEuroWhole(Math.abs(delta), lang)}
                </span>{" "}
                {o.change}
              </p>
            ) : null}
          </div>
          <Stamp>{s.ui.reserveBadge}</Stamp>
        </div>
        <dl className="grid gap-3 border-t border-rule px-5 py-4 text-sm">
          <div className="flex items-baseline justify-between gap-3">
            <dt>
              <span className="block font-medium">{o.btw}</span>
              <span className="text-muted">{o.btwHelp}</span>
            </dt>
            <dd>
              <TweenMoney cents={Math.max(0, n.btwPayableCents)} lang={lang} className="text-fiscal" />
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt>
              <span className="block font-medium">{o.ibZvw}</span>
              <span className="text-muted">{o.ibZvwHelp}</span>
            </dt>
            <dd>
              <TweenMoney cents={n.ibZvwBufferedCents} lang={lang} />
            </dd>
          </div>
        </dl>
      </div>

      <dl className="grid grid-cols-3 gap-2">
        {(
          [
            [o.omzet, n.omzetCents],
            [o.kosten, n.kostenCents],
            [o.winst, n.winstCents],
          ] as const
        ).map(([label, cents]) => (
          <div key={label} className="rounded-xl border border-rule bg-card px-3 py-3">
            <dt className="text-[11px] leading-tight text-muted">{label}</dt>
            <dd className="mt-1 text-[15px] font-medium sm:text-base">
              <TweenMoney cents={cents} lang={lang} whole />
            </dd>
          </div>
        ))}
      </dl>

      {f.keepCents !== null ? (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-paid/30 bg-paid/8 px-4 py-3.5">
          <div>
            <p className="font-medium">{o.keep}</p>
            <p className="text-sm text-muted">{o.keepHelp}</p>
          </div>
          <p className="display text-2xl text-paid">
            <TweenMoney cents={f.keepCents} lang={lang} className="[font-family:inherit]" />
          </p>
        </div>
      ) : null}

      <p className="text-sm text-muted">{o.kor.replace("{omzet}", formatEuroWhole(n.korOmzetCents, lang))}</p>

      <details className="group rounded-xl border border-rule bg-card">
        <summary className="flex min-h-11 items-center justify-between gap-3 px-4 py-2.5 text-sm font-semibold">
          {o.detailsTitle}
          <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-180">
            ⌄
          </span>
        </summary>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {details.map(([label, cents, sign]) => (
              <tr key={label} className="border-t border-rule/70">
                <th scope="row" className="px-4 py-2 text-left font-normal text-ink-soft">
                  {label}
                </th>
                <td className="px-4 py-2 text-right">
                  <Money cents={cents} lang={lang} sign={cents > 0 ? sign : undefined} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>

      <TaxDisclaimer disclaimer={s.tax.disclaimer} scope={s.tax.scope} />
    </div>
  );
}

function Sandbox({ ctx, amountInput }: { ctx: Ctx; amountInput: (cents: number) => string }) {
  const { s, state, dispatch, lang } = ctx;
  const d = s.demo.sandbox;
  const { invoices, expenses } = ledger(state);
  const guidedInv = guidedInvoice(state);
  const guidedExp = guidedExpense(state);

  return (
    <div className="grid gap-6">
      <p className="sticky top-16 z-10 flex items-center justify-between gap-3 rounded-xl border border-rule bg-paper/95 px-4 py-3 shadow-lift backdrop-blur lg:hidden">
        <span className="text-sm text-muted">{s.demo.overview.reserve}</span>
        <TweenMoney cents={ctx.f.now.setAsideCents} lang={lang} whole className="text-lg font-semibold" />
      </p>
      <div className="grid gap-2">
        <Toggle label={d.uren} help={d.urenHelp} checked={state.settings.urencriterium} onChange={(urencriterium) => dispatch({ type: "settings", patch: { urencriterium } })} />
        <Toggle label={d.starter} help={d.starterHelp} checked={state.settings.starter} onChange={(starter) => dispatch({ type: "settings", patch: { starter } })} />
      </div>

      <LedgerList
        title={d.invoices}
        lang={lang}
        removeLabel={d.remove}
        lockedLabel={d.locked}
        onRemove={(id) => dispatch({ type: "remove", id })}
        items={invoices.map((invoice) => ({
          id: invoice.id,
          label: `${invoice.number} · ${clientById(invoice.clientId).name}`,
          cents: invoice.exVatCents,
          rate: invoice.vatRate,
          locked: invoice.locked,
          highlight: invoice.id === guidedInv?.id,
        }))}
      />
      <QuickAdd
        s={s}
        kind="invoice"
        amountInput={amountInput}
        onAdd={(cents, vatRate) => dispatch({ type: "addInvoice", exVatCents: cents, vatRate })}
      />

      <LedgerList
        title={d.expenses}
        lang={lang}
        removeLabel={d.remove}
        lockedLabel={d.locked}
        onRemove={(id) => dispatch({ type: "remove", id })}
        items={expenses.map((expense) => ({
          id: expense.id,
          label: expense.id === GUIDED_EXPENSE_ID ? guidedExp?.vendor || DEMO_RECEIPT.vendor : categoryLabel(s, expense.category),
          cents: expense.exVatCents,
          rate: expense.vatRate,
          locked: expense.locked,
          highlight: expense.id === GUIDED_EXPENSE_ID,
        }))}
      />
      <QuickAdd
        s={s}
        kind="expense"
        amountInput={amountInput}
        onAdd={(cents, vatRate, category) => dispatch({ type: "addExpense", inclCents: cents, vatRate, category })}
      />

      <div>
        <button
          type="button"
          onClick={() => dispatch({ type: "reset", state: initialState(amountInput) })}
          className={buttonClass("secondary", "md")}
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M2.5 8a5.5 5.5 0 1 0 1.7-4M2.5 2.5v3h3" />
          </svg>
          {d.reset}
        </button>
      </div>
    </div>
  );
}

function categoryLabel(s: DemoStrings, category: string) {
  const match = EXPENSE_CATEGORIES.find((c) => c === category);
  return match ? s.demo.expense.categories[match] : category;
}

function Toggle({ label, help, checked, onChange }: { label: string; help: string; checked: boolean; onChange: (checked: boolean) => void }) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-rule bg-card px-4 py-3">
      <label htmlFor={id} className="cursor-pointer">
        <span className="block font-medium">{label}</span>
        <span className="block text-sm text-muted">{help}</span>
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors before:absolute before:-inset-2 before:content-[''] ${checked ? "bg-carbon" : "bg-rule"}`}
      >
        <span className={`h-5 w-5 rounded-full bg-card shadow-sm transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-1"}`} />
      </button>
    </div>
  );
}

type ListItem = { id: string; label: string; cents: number; rate: number; locked: boolean; highlight: boolean };

function LedgerList({ title, items, lang, removeLabel, lockedLabel, onRemove }: { title: string; items: ListItem[]; lang: Locale; removeLabel: string; lockedLabel: string; onRemove: (id: string) => void }) {
  return (
    <section>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-2 divide-y divide-rule overflow-hidden rounded-xl border border-rule bg-card">
        {items.map((item) => (
          <li key={item.id} className={`flex min-h-12 items-center gap-3 px-3.5 py-2 text-sm ${item.highlight ? "bg-carbon/5" : ""}`}>
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            <span className="money shrink-0 text-xs text-muted">{item.rate}%</span>
            <Money cents={item.cents} lang={lang} className="shrink-0" />
            {item.locked ? (
              <span className="w-20 shrink-0 text-right text-xs text-muted">{lockedLabel}</span>
            ) : (
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="inline-flex min-h-9 w-20 shrink-0 items-center justify-end gap-1 rounded-lg text-xs font-medium text-fiscal hover:underline"
                aria-label={`${removeLabel}: ${item.label}`}
              >
                {removeLabel}
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function QuickAdd({
  s,
  kind,
  amountInput,
  onAdd,
}: {
  s: DemoStrings;
  kind: "invoice" | "expense";
  amountInput: (cents: number) => string;
  onAdd: (cents: number, vatRate: number, category: ExpenseCategory) => void;
}) {
  const [amount, setAmount] = useState(() => amountInput(kind === "invoice" ? 120_000 : 6_050));
  const [rate, setRate] = useState(21);
  const [category, setCategory] = useState<ExpenseCategory>("software");
  const amountId = useId();
  const rateId = useId();
  const categoryId = useId();
  const valid = validAmount(amount) !== null;
  const label = kind === "invoice" ? s.demo.invoice.amount : s.demo.expense.total;

  return (
    <form
      noValidate
      className="grid grid-cols-2 items-end gap-2 sm:grid-cols-[1fr_6rem_auto]"
      onSubmit={(event) => {
        event.preventDefault();
        const cents = validAmount(amount);
        if (cents !== null) onAdd(cents, rate, category);
      }}
    >
      <div className="col-span-2 sm:col-span-1">
        <label htmlFor={amountId} className="text-xs font-medium text-muted">
          {label}
        </label>
        <input id={amountId} inputMode="decimal" autoComplete="off" value={amount} onChange={(event) => setAmount(event.target.value)} aria-invalid={!valid} className={`${field} money mt-1`} />
      </div>
      <div>
        <label htmlFor={rateId} className="text-xs font-medium text-muted">
          {s.ui.vat}
        </label>
        <select id={rateId} value={rate} onChange={(event) => setRate(Number(event.target.value))} className={`${field} mt-1`}>
          {VAT_RATES.map((r) => (
            <option key={r} value={r}>
              {r}%
            </option>
          ))}
        </select>
      </div>
      {kind === "expense" ? (
        <div className="sm:order-last sm:col-span-3">
          <label htmlFor={categoryId} className="text-xs font-medium text-muted">
            {s.demo.expense.category}
          </label>
          <CategorySelect id={categoryId} s={s} value={category} onChange={setCategory} />
        </div>
      ) : null}
      <button type="submit" disabled={!valid} className={buttonClass("secondary", "md", "col-span-2 sm:col-span-1 disabled:opacity-50")}>
        + {kind === "invoice" ? s.demo.sandbox.addInvoice : s.demo.sandbox.addExpense}
      </button>
    </form>
  );
}

function Result({ s }: { s: DemoStrings }) {
  const signedIn = useAuthHint();
  return (
    <section className="mt-10 overflow-hidden rounded-[1.25rem] bg-ink px-6 py-10 text-paper sm:px-10" aria-labelledby="demo-result">
      <h3 id="demo-result" className="display text-3xl text-balance sm:text-4xl">
        {s.demo.result.title}
      </h3>
      <p className="mt-3 max-w-xl text-paper/80">{s.demo.result.text}</p>
      <a href={signedIn ? appUrl : signupUrl} className={buttonClass("primary", "lg", "mt-7")}>
        {signedIn ? s.openApp : s.createOwn}
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
