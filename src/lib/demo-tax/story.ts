import { buildDemoSnapshot, lineVatCents, splitInclVat, type DemoSnapshot } from "./engine";
import {
  BASELINE_EXPENSES,
  BASELINE_INVOICES,
  DEFAULT_INVOICE,
  DEMO_RECEIPT,
} from "./scenario";

const SETTINGS = { starter: false, urencriterium: true };

export type HomeStory = {
  invoice: { exVatCents: number; vatCents: number; inclCents: number; vatRate: number };
  expense: { exVatCents: number; vatCents: number; inclCents: number };
  /** IB + Zvw (incl. 2% margin) the invoice alone adds to the year. */
  invoiceIbZvwCents: number;
  /** Invoice ex-VAT minus the IB + Zvw it adds: an estimate, before any costs. */
  invoiceKeepCents: number;
  /** IB + Zvw (incl. 2% margin) this invoice and receipt add to the year. */
  extraIbZvwCents: number;
  /** Invoice ex-VAT minus the job cost minus the extra IB + Zvw: an estimate. */
  keepCents: number;
  reserveBefore: number;
  reserveAfterInvoice: number;
  reserveAfterExpense: number;
  ytdOmzetCents: number;
  before: DemoSnapshot;
  after: DemoSnapshot;
};

/**
 * Figures for the homepage narrative, computed with the demo engine from the demo
 * scenario rather than typed in by hand. Runs at build time on the server.
 */
export function homeStory(): HomeStory {
  const invoice = {
    date: DEFAULT_INVOICE.date,
    exVatCents: DEFAULT_INVOICE.exVatCents,
    vatRate: DEFAULT_INVOICE.vatRate,
  };
  const split = splitInclVat(DEMO_RECEIPT.inclCents, DEMO_RECEIPT.vatRate);
  const expense = { date: DEMO_RECEIPT.date, exVatCents: split.amountExVatCents, vatCents: split.vatCents };

  const before = buildDemoSnapshot(BASELINE_INVOICES, BASELINE_EXPENSES, SETTINGS);
  const withInvoice = buildDemoSnapshot([...BASELINE_INVOICES, invoice], BASELINE_EXPENSES, SETTINGS);
  const after = buildDemoSnapshot([...BASELINE_INVOICES, invoice], [...BASELINE_EXPENSES, expense], SETTINGS);

  const vatCents = lineVatCents(invoice.exVatCents, invoice.vatRate);
  const extraIbZvwCents = after.ibZvwBufferedCents - before.ibZvwBufferedCents;
  const invoiceIbZvwCents = withInvoice.ibZvwBufferedCents - before.ibZvwBufferedCents;

  return {
    invoice: { exVatCents: invoice.exVatCents, vatCents, inclCents: invoice.exVatCents + vatCents, vatRate: invoice.vatRate },
    invoiceIbZvwCents,
    invoiceKeepCents: invoice.exVatCents - invoiceIbZvwCents,
    expense: { exVatCents: expense.exVatCents, vatCents: expense.vatCents, inclCents: DEMO_RECEIPT.inclCents },
    extraIbZvwCents,
    keepCents: invoice.exVatCents - expense.exVatCents - extraIbZvwCents,
    reserveBefore: before.setAsideCents,
    reserveAfterInvoice: withInvoice.setAsideCents,
    reserveAfterExpense: after.setAsideCents,
    ytdOmzetCents: before.omzetCents,
    before,
    after,
  };
}
