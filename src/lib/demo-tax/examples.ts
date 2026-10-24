import { buildDemoSnapshot, type DemoSnapshot } from "./engine";

const SETTINGS = { starter: false, urencriterium: true };

/** A year with a single profit figure: one Q1 invoice, so no open-quarter BTW is involved. */
export function yearWithProfit(profitCents: number, settings = SETTINGS): DemoSnapshot {
  return buildDemoSnapshot([{ date: "2026-02-15", exVatCents: profitCents, vatRate: 21 }], [], settings);
}

export type LadderRow = {
  profitCents: number;
  ibZvwCents: number;
  averageRate: number;
  /** Share of the next €1.000 profit that goes to IB + Zvw. */
  marginalRate: number;
};

const STEP_CENTS = 100_000;

export function profitLadder(profits: readonly number[]): LadderRow[] {
  return profits.map((profitCents) => {
    const base = yearWithProfit(profitCents);
    const next = yearWithProfit(profitCents + STEP_CENTS);
    return {
      profitCents,
      ibZvwCents: base.ibZvwCents,
      averageRate: base.ibZvwCents / profitCents,
      marginalRate: (next.ibZvwCents - base.ibZvwCents) / STEP_CENTS,
    };
  });
}

export const LADDER_PROFITS = [2_000_000, 3_500_000, 5_000_000, 7_500_000] as const;

/** The worked IB example in the kennisbank: €45.000 profit, urencriterium met, no starter. */
export const WORKED_PROFIT_CENTS = 4_500_000;
