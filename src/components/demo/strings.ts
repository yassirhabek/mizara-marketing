import type { Dict } from "@/i18n";

/** The slice of the dictionary the client-side demo needs; passed as a prop. */
export type DemoStrings = {
  demo: Dict["demo"];
  ui: Dict["ui"];
  tax: Dict["common"]["tax"];
  createOwn: string;
};

export function demoStrings(t: Dict): DemoStrings {
  return { demo: t.demo, ui: t.ui, tax: t.common.tax, createOwn: t.common.cta.createOwn };
}
