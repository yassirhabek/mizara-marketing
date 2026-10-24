import { describe, expect, it } from "vitest";
import { homeStory } from "@/lib/demo-tax/story";
import { centsToInput } from "@/lib/money";
import { figures, initialState, reducer, type Action, type DemoState } from "./state";

const start = () => initialState((cents) => centsToInput(cents, "nl"));
const run = (state: DemoState, ...actions: Action[]) => actions.reduce(reducer, state);

describe("demo state", () => {
  it("starts at the baseline reserve", () => {
    const f = figures(start());
    expect(f.now.setAsideCents).toBe(homeStory().reserveBefore);
    expect(f.reserveDeltaCents).toBe(0);
    expect(f.keepCents).toBeNull();
  });

  it("the guided flow lands on the homepage figures", () => {
    const story = homeStory();
    const state = run(start(), { type: "bookInvoice" }, { type: "bookReceipt" });
    const f = figures(state);
    expect(state.step).toBe("overview");
    expect(f.now.setAsideCents).toBe(story.reserveAfterExpense);
    expect(f.now.btwPayableCents).toBe(story.after.btwPayableCents);
    expect(f.keepCents).toBe(story.keepCents);
  });

  it("refuses to book an invalid amount", () => {
    const state = run(start(), { type: "invoice", patch: { amount: "abc" } }, { type: "bookInvoice" });
    expect(state.invoiceBooked).toBe(false);
    expect(state.step).toBe("invoice");
  });

  it("cannot jump ahead to steps not yet reached", () => {
    expect(run(start(), { type: "go", step: "sandbox" }).step).toBe("invoice");
  });

  it("next moves from the overview into the sandbox", () => {
    const state = run(start(), { type: "bookInvoice" }, { type: "bookReceipt" }, { type: "next" });
    expect(state.step).toBe("sandbox");
    expect(run(state, { type: "go", step: "invoice" }, { type: "go", step: "sandbox" }).step).toBe("sandbox");
  });

  it("sandbox additions and removals update the reserve", () => {
    const booked = run(start(), { type: "bookInvoice" }, { type: "bookReceipt" });
    const base = figures(booked).now.setAsideCents;
    const added = run(booked, { type: "addInvoice", exVatCents: 100_000, vatRate: 21 });
    expect(figures(added).now.setAsideCents).toBeGreaterThan(base);
    const id = added.extraInvoices[0].id;
    expect(figures(run(added, { type: "remove", id })).now.setAsideCents).toBe(base);
  });

  it("startersaftrek lowers the estimate", () => {
    const booked = run(start(), { type: "bookInvoice" });
    const withStarter = run(booked, { type: "settings", patch: { starter: true } });
    expect(figures(withStarter).now.ibZvwCents).toBeLessThan(figures(booked).now.ibZvwCents);
  });
});
