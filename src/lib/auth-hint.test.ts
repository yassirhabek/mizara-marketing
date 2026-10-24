import { describe, expect, it } from "vitest";
import { hasAuthHint, safeAppTarget } from "./auth-hint";

const APP = "https://app.mizara.nl";

describe("safeAppTarget", () => {
  it("keeps paths and queries on the app origin", () => {
    expect(safeAppTarget("https://app.mizara.nl/invoices?x=1", APP)).toBe("https://app.mizara.nl/invoices?x=1");
  });

  it.each([
    null,
    "",
    "/invoices",
    "//evil.example/",
    "https://evil.example/",
    "https://app.mizara.nl.evil.example/",
    "http://app.mizara.nl/",
    "javascript:alert(1)",
  ])("rejects %s", (raw) => {
    expect(safeAppTarget(raw, APP)).toBeNull();
  });
});

describe("hasAuthHint", () => {
  it("reads the cookie among others", () => {
    expect(hasAuthHint("locale=nl; mz_app=1")).toBe(true);
    expect(hasAuthHint("locale=nl")).toBe(false);
    expect(hasAuthHint("mz_app=0")).toBe(false);
  });
});
