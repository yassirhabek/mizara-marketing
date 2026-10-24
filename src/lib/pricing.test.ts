import { describe, expect, it } from "vitest";
import { getDict, locales } from "@/i18n";
import { PLANS, fillPrices, formatPrice, includes, withVat } from "./pricing";

describe("pricing", () => {
  it("charges the same amounts incl. btw as the product", () => {
    expect(PLANS.map((p) => [p.id, withVat(p.monthCents), withVat(p.yearCents)])).toEqual([
      ["free", 0, 0],
      ["facturen", 847, 8470],
      ["boekhouden", 1815, 18150],
      ["boekhouden_bv", 3025, 30250],
    ]);
  });

  it("prices a year at ten months", () => {
    for (const plan of PLANS) expect(plan.yearCents).toBe(plan.monthCents * 10);
  });

  it("fills every token in the pricing copy", () => {
    for (const lang of locales) {
      const filled = fillPrices(JSON.stringify(getDict(lang).pricing), lang, { price: "x", plan: "x" });
      expect(filled.match(/\{\w+\}/g)).toBeNull();
    }
    expect(fillPrices("{boekhouden} / {limit}", "nl")).toBe(`${formatPrice(1500, "nl")} / 5`);
    expect(formatPrice(1815, "en")).toBe("€18.15");
  });

  it("includes every feature of a smaller plan", () => {
    expect(includes("free", "invoices")).toBe(true);
    expect(includes("free", "recurring")).toBe(false);
    expect(includes("boekhouden", "time")).toBe(true);
    expect(includes("boekhouden", "vpb")).toBe(false);
    expect(includes("boekhouden_bv", "bank")).toBe(true);
  });
});
