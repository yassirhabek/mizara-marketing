import { describe, expect, it } from "vitest";
import golden from "./golden.json";
import { buildDemoSnapshot, lineVatCents, splitInclVat } from "./engine";
import {
  BASELINE_EXPENSES,
  BASELINE_INVOICES,
  DEFAULT_INVOICE,
  DEMO_RECEIPT,
} from "./scenario";
import { homeStory } from "./story";

describe("demo tax engine matches the product C# engine", () => {
  for (const scenario of golden.scenarios) {
    it(scenario.name, () => {
      const snapshot = buildDemoSnapshot(
        scenario.invoices,
        scenario.expenses.map((e) => ({
          date: e.date,
          exVatCents: e.exVatCents,
          vatCents: lineVatCents(e.exVatCents, e.vatRate),
        })),
        scenario.settings,
      );
      for (const [key, value] of Object.entries(scenario.expected)) {
        expect(snapshot[key as keyof typeof snapshot], key).toBe(value);
      }
    });
  }
});

describe("demo scenario", () => {
  it("receipt splits into the €185 + €38,85 the golden fixtures use", () => {
    expect(splitInclVat(DEMO_RECEIPT.inclCents, DEMO_RECEIPT.vatRate)).toEqual({
      amountExVatCents: 18_500,
      vatCents: 3_885,
    });
  });

  it("baseline bookings equal the golden baseline scenario", () => {
    const base = golden.scenarios.find((s) => s.name === "baseline");
    expect(base).toBeDefined();
    const snapshot = buildDemoSnapshot(BASELINE_INVOICES, BASELINE_EXPENSES, {
      starter: false,
      urencriterium: true,
    });
    expect(snapshot.setAsideCents).toBe(base?.expected.setAsideCents);
  });

  it("homepage story figures are derived from the engine", () => {
    const story = homeStory();
    expect(story.invoice.exVatCents).toBe(DEFAULT_INVOICE.exVatCents);
    expect(story.invoice.vatCents).toBe(52_500);
    expect(story.reserveBefore).toBe(236_100);
    expect(story.reserveAfterInvoice).toBe(374_100);
    expect(story.reserveAfterExpense).toBe(363_800);
    expect(story.extraIbZvwCents).toBe(315_185 - 236_095);
    expect(story.keepCents).toBe(250_000 - 18_500 - (315_185 - 236_095));
  });
});
