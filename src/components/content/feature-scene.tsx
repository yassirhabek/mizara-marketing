import type { Dict, FeatureSlug } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import type { HomeStory } from "@/lib/demo-tax/story";
import { BankScene, ExpenseScene, InvoiceScene, TaxScene } from "@/components/product/scenes";

const SCENES = {
  facturen: InvoiceScene,
  kosten: ExpenseScene,
  bank: BankScene,
  belastingoverzicht: TaxScene,
} satisfies Record<FeatureSlug, unknown>;

export function FeatureScene({ slug, ui, lang, story }: { slug: FeatureSlug; ui: Dict["ui"]; lang: Locale; story: HomeStory }) {
  const Scene = SCENES[slug];
  return <Scene ui={ui} lang={lang} story={story} />;
}
