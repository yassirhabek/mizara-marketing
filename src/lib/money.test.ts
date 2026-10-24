import { describe, expect, it } from "vitest";
import { formatEuro, parseEuroInput } from "./money";

describe("parseEuroInput", () => {
  it.each([
    ["2500", 250_000],
    ["2.500", 250_000],
    ["2.500,50", 250_050],
    ["2500,5", 250_050],
    ["2500.50", 250_050],
    ["1,250.50", 125_050],
    ["2,500", 250_000],
    ["12,500", 1_250_000],
    ["€ 85", 8_500],
    ["0,99", 99],
  ])("%s -> %d cents", (input, cents) => {
    expect(parseEuroInput(input)).toBe(cents);
  });

  it.each(["", "abc", "12,345,6", "1.2.3,4,5", "2500,555"])("rejects %s", (input) => {
    expect(parseEuroInput(input)).toBeNull();
  });
});

describe("formatEuro", () => {
  it("uses Dutch notation", () => {
    expect(formatEuro(302_500, "nl").replace(/\s/g, " ")).toBe("€ 3.025,00");
  });
});
