import { buildDemoSnapshot, lineVatCents, splitInclVat, type DemoSettings, type DemoSnapshot } from "@/lib/demo-tax/engine";
import {
  BASELINE_EXPENSES,
  BASELINE_INVOICES,
  DEFAULT_INVOICE,
  DEMO_CLIENTS,
  DEMO_RECEIPT,
  DEMO_TODAY,
  type ExpenseCategory,
  type LedgerExpense,
  type LedgerInvoice,
} from "@/lib/demo-tax/scenario";
import { parseEuroInput } from "@/lib/money";

export const STEPS = ["invoice", "expense", "overview", "sandbox"] as const;
export type Step = (typeof STEPS)[number];

export const MIN_AMOUNT_CENTS = 100;
export const MAX_AMOUNT_CENTS = 25_000_000;

export const GUIDED_INVOICE_ID = "guided-invoice";
export const GUIDED_EXPENSE_ID = "guided-expense";

export type InvoiceDraft = { clientId: string; amount: string; vatRate: number };
export type ReceiptDraft = { vendor: string; total: string; vatRate: number; category: ExpenseCategory };

export type DemoState = {
  step: Step;
  /** Furthest step reached, so the stepper only offers steps the visitor has unlocked. */
  reached: number;
  invoice: InvoiceDraft;
  invoiceBooked: boolean;
  receipt: ReceiptDraft;
  receiptBooked: boolean;
  extraInvoices: LedgerInvoice[];
  extraExpenses: LedgerExpense[];
  settings: DemoSettings;
  seq: number;
};

export function initialState(amountInput: (cents: number) => string): DemoState {
  return {
    step: "invoice",
    reached: 0,
    invoice: { clientId: DEFAULT_INVOICE.clientId, amount: amountInput(DEFAULT_INVOICE.exVatCents), vatRate: DEFAULT_INVOICE.vatRate },
    invoiceBooked: false,
    receipt: { vendor: DEMO_RECEIPT.vendor, total: amountInput(DEMO_RECEIPT.inclCents), vatRate: DEMO_RECEIPT.vatRate, category: DEMO_RECEIPT.category },
    receiptBooked: false,
    extraInvoices: [],
    extraExpenses: [],
    settings: { starter: false, urencriterium: true },
    seq: 0,
  };
}

/** A typed amount in cents when it is within the demo's range, otherwise null. */
export function validAmount(raw: string): number | null {
  const cents = parseEuroInput(raw);
  return cents !== null && cents >= MIN_AMOUNT_CENTS && cents <= MAX_AMOUNT_CENTS ? cents : null;
}

export type Action =
  | { type: "go"; step: Step }
  | { type: "next" }
  | { type: "invoice"; patch: Partial<InvoiceDraft> }
  | { type: "bookInvoice" }
  | { type: "receipt"; patch: Partial<ReceiptDraft> }
  | { type: "bookReceipt" }
  | { type: "addInvoice"; exVatCents: number; vatRate: number }
  | { type: "addExpense"; inclCents: number; vatRate: number; category: ExpenseCategory }
  | { type: "remove"; id: string }
  | { type: "settings"; patch: Partial<DemoSettings> }
  | { type: "reset"; state: DemoState };

const stepIndex = (step: Step) => STEPS.indexOf(step);

function advance(state: DemoState, step: Step): DemoState {
  return { ...state, step, reached: Math.max(state.reached, stepIndex(step)) };
}

export function reducer(state: DemoState, action: Action): DemoState {
  switch (action.type) {
    case "go":
      return stepIndex(action.step) <= state.reached ? { ...state, step: action.step } : state;
    case "next": {
      const next = STEPS[stepIndex(state.step) + 1];
      return next ? advance(state, next) : state;
    }
    case "invoice":
      return { ...state, invoice: { ...state.invoice, ...action.patch } };
    case "bookInvoice":
      if (validAmount(state.invoice.amount) === null) return state;
      return advance({ ...state, invoiceBooked: true }, "expense");
    case "receipt":
      return { ...state, receipt: { ...state.receipt, ...action.patch } };
    case "bookReceipt":
      if (validAmount(state.receipt.total) === null) return state;
      return advance({ ...state, receiptBooked: true }, "overview");
    case "addInvoice": {
      const seq = state.seq + 1;
      const client = DEMO_CLIENTS[seq % DEMO_CLIENTS.length];
      const invoice: LedgerInvoice = {
        id: `sandbox-inv-${seq}`,
        number: `2026-${String(14 + seq).padStart(3, "0")}`,
        clientId: client.id,
        description: "",
        date: DEMO_TODAY,
        exVatCents: action.exVatCents,
        vatRate: action.vatRate,
        locked: false,
      };
      return { ...state, seq, extraInvoices: [...state.extraInvoices, invoice] };
    }
    case "addExpense": {
      const seq = state.seq + 1;
      const split = splitInclVat(action.inclCents, action.vatRate);
      const expense: LedgerExpense = {
        id: `sandbox-exp-${seq}`,
        vendor: "",
        category: action.category,
        date: DEMO_TODAY,
        exVatCents: split.amountExVatCents,
        vatCents: split.vatCents,
        vatRate: action.vatRate,
        locked: false,
      };
      return { ...state, seq, extraExpenses: [...state.extraExpenses, expense] };
    }
    case "remove":
      if (action.id === GUIDED_INVOICE_ID) return { ...state, invoiceBooked: false };
      if (action.id === GUIDED_EXPENSE_ID) return { ...state, receiptBooked: false };
      return {
        ...state,
        extraInvoices: state.extraInvoices.filter((item) => item.id !== action.id),
        extraExpenses: state.extraExpenses.filter((item) => item.id !== action.id),
      };
    case "settings":
      return { ...state, settings: { ...state.settings, ...action.patch } };
    case "reset":
      return action.state;
  }
}

export function guidedInvoice(state: DemoState): LedgerInvoice | null {
  const exVatCents = validAmount(state.invoice.amount);
  if (!state.invoiceBooked || exVatCents === null) return null;
  return {
    id: GUIDED_INVOICE_ID,
    number: DEFAULT_INVOICE.number,
    clientId: state.invoice.clientId,
    description: "",
    date: DEFAULT_INVOICE.date,
    exVatCents,
    vatRate: state.invoice.vatRate,
    locked: false,
  };
}

export function guidedExpense(state: DemoState): LedgerExpense | null {
  const inclCents = validAmount(state.receipt.total);
  if (!state.receiptBooked || inclCents === null) return null;
  const split = splitInclVat(inclCents, state.receipt.vatRate);
  return {
    id: GUIDED_EXPENSE_ID,
    vendor: state.receipt.vendor,
    category: state.receipt.category,
    date: DEMO_RECEIPT.date,
    exVatCents: split.amountExVatCents,
    vatCents: split.vatCents,
    vatRate: state.receipt.vatRate,
    locked: false,
  };
}

export type Ledger = { invoices: LedgerInvoice[]; expenses: LedgerExpense[] };

export function ledger(state: DemoState): Ledger {
  const invoice = guidedInvoice(state);
  const expense = guidedExpense(state);
  return {
    invoices: [...BASELINE_INVOICES, ...(invoice ? [invoice] : []), ...state.extraInvoices],
    expenses: [...BASELINE_EXPENSES, ...(expense ? [expense] : []), ...state.extraExpenses],
  };
}

export type Figures = {
  before: DemoSnapshot;
  now: DemoSnapshot;
  /** Reserve change since the visitor started booking. */
  reserveDeltaCents: number;
  /** What the guided invoice leaves after its job cost and the extra IB + Zvw; null until both are booked. */
  keepCents: number | null;
};

export function figures(state: DemoState): Figures {
  const { invoices, expenses } = ledger(state);
  const before = buildDemoSnapshot(BASELINE_INVOICES, BASELINE_EXPENSES, state.settings);
  const now = buildDemoSnapshot(invoices, expenses, state.settings);
  const invoice = guidedInvoice(state);
  const expense = guidedExpense(state);
  let keepCents: number | null = null;
  if (invoice && expense) {
    const withBoth = buildDemoSnapshot([...BASELINE_INVOICES, invoice], [...BASELINE_EXPENSES, expense], state.settings);
    keepCents = invoice.exVatCents - expense.exVatCents - (withBoth.ibZvwBufferedCents - before.ibZvwBufferedCents);
  }
  return { before, now, reserveDeltaCents: now.setAsideCents - before.setAsideCents, keepCents };
}

export const invoiceVatCents = (exVatCents: number, vatRate: number) => lineVatCents(exVatCents, vatRate);
