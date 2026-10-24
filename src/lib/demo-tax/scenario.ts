import type { DemoExpense, DemoInvoice } from "./engine";

/**
 * The fictional demo business. Invented names, invented figures: nothing here belongs
 * to a real customer. Dates fall in 2026; "today" in the demo is 15 October 2026, so the
 * open BTW quarter is Q4 and Q1-Q3 BTW is treated as already declared and paid.
 */
export const DEMO_TODAY = "2026-10-15";

/** The visitor plays Noor for the length of the demo. */
export const DEMO_BUSINESS = {
  name: "Noor de Vries Ontwerp",
  city: "Groningen",
  kvk: "00000000",
  vatId: "NL000000000B01",
  iban: "NL00 DEMO 0123 4567 89",
} as const;

export type DemoClient = { id: string; name: string; city: string };

export const DEMO_CLIENTS: readonly DemoClient[] = [
  { id: "noorderlicht", name: "Studio Noorderlicht B.V.", city: "Groningen" },
  { id: "bakkerij", name: "Bakkerij Van der Veen", city: "Zwolle" },
  { id: "veldwerk", name: "Stichting Veldwerk", city: "Utrecht" },
];

export type LedgerInvoice = DemoInvoice & {
  id: string;
  number: string;
  clientId: string;
  description: string;
  locked: boolean;
};

export type LedgerExpense = DemoExpense & {
  id: string;
  vendor: string;
  category: string;
  vatRate: number;
  locked: boolean;
};

/** Year-to-date bookings before the visitor arrives. Q1-Q3, BTW already declared. */
export const BASELINE_INVOICES: readonly LedgerInvoice[] = [
  { id: "b-inv-1", number: "2026-004", clientId: "veldwerk", description: "Gebruikersonderzoek ledenportaal", date: "2026-02-27", exVatCents: 1_200_000, vatRate: 21, locked: true },
  { id: "b-inv-2", number: "2026-008", clientId: "noorderlicht", description: "Ontwerp app, fase 1", date: "2026-05-29", exVatCents: 1_450_000, vatRate: 21, locked: true },
  { id: "b-inv-3", number: "2026-011", clientId: "bakkerij", description: "Nieuwe bestelwebsite", date: "2026-08-28", exVatCents: 950_000, vatRate: 21, locked: true },
];

export const BASELINE_EXPENSES: readonly LedgerExpense[] = [
  { id: "b-exp-1", vendor: "Laptopverzekering & software", category: "software", date: "2026-03-12", exVatCents: 168_000, vatCents: 35_280, vatRate: 21, locked: true },
  { id: "b-exp-2", vendor: "NS Zakelijk", category: "travel", date: "2026-06-18", exVatCents: 142_000, vatCents: 29_820, vatRate: 21, locked: true },
  { id: "b-exp-3", vendor: "Telefoon en internet", category: "phone", date: "2026-09-09", exVatCents: 110_000, vatCents: 23_100, vatRate: 21, locked: true },
];

/** The invoice the guided demo starts with (also the €2.500 example on the homepage). */
export const DEFAULT_INVOICE = {
  clientId: "noorderlicht",
  description: "Ontwerp app, fase 2",
  exVatCents: 250_000,
  vatRate: 21,
  date: "2026-10-14",
  number: "2026-014",
} as const;

/** The receipt the guided demo shows, with values a receipt reader might return. */
export const DEMO_RECEIPT = {
  vendor: "Werkplek De Hallen",
  date: "2026-10-09",
  description: "Flexplek oktober",
  inclCents: 22_385,
  vatRate: 21,
  category: "office",
} as const;

export const EXPENSE_CATEGORIES = [
  "office",
  "software",
  "travel",
  "phone",
  "insurance",
  "education",
  "marketing",
  "other",
] as const;
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
