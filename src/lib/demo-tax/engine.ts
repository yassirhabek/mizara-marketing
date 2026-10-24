import { IB_ZVW_SAFETY_BUFFER_RATE, NL_2026, TAX_YEAR, type TaxTables } from "./tables";

/**
 * Browser-only port of the subset of `TaxCalculator.BuildTaxSnapshot` the demo needs:
 * a solo IB-ondernemer on regular BTW, tax year 2026, an empty tax profile (no loon,
 * no other box 1 income, no eigen woning, no box 3), only direct costs (no
 * depreciation or KIA), and the year-to-date figure without projection.
 *
 * Every amount is integer cents. Rounding mirrors the product's `JsMath.Round`
 * (JS `Math.round`). `golden.json` holds outputs of the real C# engine and the unit
 * tests assert this port matches them exactly.
 */

export type DemoInvoice = { date: string; exVatCents: number; vatRate: number };
export type DemoExpense = { date: string; exVatCents: number; vatCents: number };
export type DemoSettings = { starter: boolean; urencriterium: boolean };

export type DemoSnapshot = {
  year: number;
  quarter: number;
  omzetCents: number;
  kostenCents: number;
  winstCents: number;
  zelfstandigenaftrekCents: number;
  startersaftrekCents: number;
  mkbVrijstellingCents: number;
  belastbareWinstCents: number;
  box1Cents: number;
  ahkCents: number;
  arbeidskortingCents: number;
  tariefbeperkingCents: number;
  ibCents: number;
  zvwCents: number;
  ibZvwCents: number;
  ibZvwBufferCents: number;
  ibZvwBufferedCents: number;
  outputBtwCents: number;
  inputBtwCents: number;
  btwPayableCents: number;
  setAsideCents: number;
  korOmzetCents: number;
  korThresholdCents: number;
};

const round = (value: number) => Math.floor(value + 0.5);
const ceilEuro = (cents: number) => Math.ceil(cents / 100) * 100;

export function lineVatCents(exVatCents: number, vatRate: number) {
  return round((exVatCents * vatRate) / 100);
}

export function splitInclVat(inclCents: number, vatRate: number) {
  const amountExVatCents = Math.round(inclCents / (1 + vatRate / 100));
  return { amountExVatCents, vatCents: inclCents - amountExVatCents };
}

export function quarterOf(iso: string) {
  return Math.ceil(Number(iso.slice(5, 7)) / 3);
}

function box1Tax(taxableCents: number, t: TaxTables) {
  let remaining = Math.max(0, taxableCents);
  let previous = 0;
  let tax = 0;
  for (const band of t.box1) {
    const slice = Math.min(remaining, band.upToCents - previous);
    tax += slice * band.rate;
    remaining -= slice;
    previous = band.upToCents;
    if (remaining <= 0) break;
  }
  return round(tax);
}

function algemeneHeffingskorting(incomeCents: number, t: TaxTables) {
  if (incomeCents >= t.ahkZeroFromCents) return 0;
  if (incomeCents <= t.ahkPhaseOutFromCents) return t.ahkMaxCents;
  const reduction = (incomeCents - t.ahkPhaseOutFromCents) * t.ahkPhaseOutRate;
  return Math.max(0, round(t.ahkMaxCents - reduction));
}

function arbeidskorting(incomeCents: number, t: TaxTables) {
  if (incomeCents <= 0) return 0;
  if (incomeCents >= t.arbeidskortingZeroFromCents) return 0;

  let credit: number;
  if (incomeCents <= t.arbeidskortingBracket1ToCents) {
    credit = incomeCents * t.arbeidskortingBracket1Rate;
  } else if (incomeCents <= t.arbeidskortingBracket2ToCents) {
    credit =
      t.arbeidskortingBracket1ToCents * t.arbeidskortingBracket1Rate +
      (incomeCents - t.arbeidskortingBracket1ToCents) * t.arbeidskortingBracket2Rate;
  } else if (incomeCents <= t.arbeidskortingPhaseOutFromCents) {
    credit =
      t.arbeidskortingBracket1ToCents * t.arbeidskortingBracket1Rate +
      (t.arbeidskortingBracket2ToCents - t.arbeidskortingBracket1ToCents) *
        t.arbeidskortingBracket2Rate +
      (incomeCents - t.arbeidskortingBracket2ToCents) * t.arbeidskortingBracket3Rate;
  } else {
    credit = t.arbeidskortingMaxCents;
  }

  credit = Math.min(credit, t.arbeidskortingMaxCents);
  if (incomeCents > t.arbeidskortingPhaseOutFromCents) {
    credit =
      t.arbeidskortingMaxCents -
      (incomeCents - t.arbeidskortingPhaseOutFromCents) * t.arbeidskortingPhaseOutRate;
  }
  return Math.max(0, round(credit));
}

function deductions(winst: number, s: DemoSettings, t: TaxTables, applyZelfstandigenaftrek: boolean) {
  const isStarter = s.starter && s.urencriterium;
  let zelfstandigenaftrek = 0;
  if (applyZelfstandigenaftrek && winst > 0 && s.urencriterium) {
    zelfstandigenaftrek = isStarter
      ? t.zelfstandigenaftrekCents
      : Math.min(t.zelfstandigenaftrekCents, winst);
  }
  const startersaftrek = isStarter ? t.startersaftrekCents : 0;
  const afterOndernemers = Math.max(0, winst - zelfstandigenaftrek - startersaftrek);
  const mkb = round(afterOndernemers * t.mkbVrijstellingRate);
  return {
    zelfstandigenaftrek,
    startersaftrek,
    mkb,
    belastbare: Math.max(0, afterOndernemers - mkb),
    arbeidsinkomen: Math.max(0, winst),
  };
}

function ibZvwForWinst(winst: number, s: DemoSettings, t: TaxTables) {
  const withZelf = deductions(winst, s, t, true);
  const withoutZelf = deductions(winst, s, t, false);
  const belastbare = withZelf.belastbare;

  const box1 = box1Tax(belastbare, t);
  const ahk = algemeneHeffingskorting(belastbare, t);
  const arbeids = arbeidskorting(withZelf.arbeidsinkomen, t);

  // With an empty tax profile the "other household income" terms of the product
  // engine are all zero, so the combined liability is the entrepreneur's own.
  const zelfstandigTaxBenefit = box1Tax(withoutZelf.belastbare, t) - box1;
  const cappedBenefit = round(withZelf.zelfstandigenaftrek * t.ondernemersaftrekTariefBeperkingRate);
  const tariefbeperking = Math.max(0, zelfstandigTaxBenefit - cappedBenefit);

  const ib = Math.max(0, box1 + tariefbeperking - ahk - arbeids);
  const zvw = round(Math.max(0, Math.min(belastbare, t.zvwMaxBaseCents)) * t.zvwRate);
  const ibZvw = ib + zvw;
  const buffer = round(ibZvw * IB_ZVW_SAFETY_BUFFER_RATE);

  return {
    zelfstandigenaftrek: withZelf.zelfstandigenaftrek,
    startersaftrek: withZelf.startersaftrek,
    mkb: withZelf.mkb,
    belastbare,
    box1,
    ahk,
    arbeids,
    tariefbeperking,
    ib,
    zvw,
    ibZvw,
    buffer,
  };
}

export function buildDemoSnapshot(
  invoices: readonly DemoInvoice[],
  expenses: readonly DemoExpense[],
  settings: DemoSettings,
  quarter = 4,
  tables: TaxTables = NL_2026,
): DemoSnapshot {
  let omzet = 0;
  let outputBtw = 0;
  for (const invoice of invoices) {
    omzet += invoice.exVatCents;
    if (quarterOf(invoice.date) === quarter) outputBtw += lineVatCents(invoice.exVatCents, invoice.vatRate);
  }

  let kosten = 0;
  let inputBtw = 0;
  for (const expense of expenses) {
    kosten += expense.exVatCents;
    if (quarterOf(expense.date) === quarter) inputBtw += expense.vatCents;
  }

  const winst = omzet - kosten;
  const layer = ibZvwForWinst(winst, settings, tables);
  const btwPayable = outputBtw - inputBtw;
  const ibZvwBuffered = layer.ibZvw + layer.buffer;

  return {
    year: TAX_YEAR,
    quarter,
    omzetCents: omzet,
    kostenCents: kosten,
    winstCents: winst,
    zelfstandigenaftrekCents: layer.zelfstandigenaftrek,
    startersaftrekCents: layer.startersaftrek,
    mkbVrijstellingCents: layer.mkb,
    belastbareWinstCents: layer.belastbare,
    box1Cents: layer.box1,
    ahkCents: layer.ahk,
    arbeidskortingCents: layer.arbeids,
    tariefbeperkingCents: layer.tariefbeperking,
    ibCents: layer.ib,
    zvwCents: layer.zvw,
    ibZvwCents: layer.ibZvw,
    ibZvwBufferCents: layer.buffer,
    ibZvwBufferedCents: ibZvwBuffered,
    outputBtwCents: outputBtw,
    inputBtwCents: inputBtw,
    btwPayableCents: btwPayable,
    setAsideCents: ceilEuro(ibZvwBuffered + Math.max(0, btwPayable)),
    korOmzetCents: omzet,
    korThresholdCents: tables.korThresholdCents,
  };
}
