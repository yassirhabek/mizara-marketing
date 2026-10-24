/**
 * 2026 figures copied from the product's `TaxTableRegistry.Nl2026`
 * (mizara/api/src/Mizara.Domain/Tax/TaxTables.cs). Only the fields the demo engine
 * reads are included. All amounts in cents.
 */
export const TAX_YEAR = 2026;

export const NL_2026 = {
  korThresholdCents: 2_000_000,
  zelfstandigenaftrekCents: 120_000,
  startersaftrekCents: 212_300,
  mkbVrijstellingRate: 0.127,
  zvwRate: 0.0485,
  zvwMaxBaseCents: 7_941_200,
  ondernemersaftrekTariefBeperkingRate: 0.3756,
  box1: [
    { upToCents: 3_888_300, rate: 0.3575 },
    { upToCents: 7_842_600, rate: 0.3756 },
    { upToCents: Number.POSITIVE_INFINITY, rate: 0.495 },
  ],
  ahkMaxCents: 311_500,
  ahkPhaseOutFromCents: 2_973_600,
  ahkPhaseOutRate: 0.06398,
  ahkZeroFromCents: 7_842_600,
  arbeidskortingMaxCents: 568_500,
  arbeidskortingPhaseOutFromCents: 4_559_200,
  arbeidskortingPhaseOutRate: 0.0651,
  arbeidskortingZeroFromCents: 13_292_100,
  arbeidskortingBracket1ToCents: 1_196_500,
  arbeidskortingBracket1Rate: 0.08324,
  arbeidskortingBracket2ToCents: 2_584_500,
  arbeidskortingBracket2Rate: 0.31009,
  arbeidskortingBracket3Rate: 0.0195,
} as const;

export type TaxTables = typeof NL_2026;

/** Small upward buffer on IB + Zvw for cash planning safety (product: IbZvwSafetyBufferRate). */
export const IB_ZVW_SAFETY_BUFFER_RATE = 0.02;

export const VAT_RATES = [21, 9, 0] as const;
export type VatRate = (typeof VAT_RATES)[number];
