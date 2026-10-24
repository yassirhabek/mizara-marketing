import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import type { HomeStory } from "@/lib/demo-tax/story";
import { Container } from "@/components/ui/container";
import { DashboardScene } from "@/components/product/scenes";
import { StoryMotion } from "@/components/motion/story-motion";
import { SectionHeading } from "./section-heading";

function FileIcon({ ext, tone }: { ext: string; tone: string }) {
  return (
    <span className={`relative inline-flex h-9 w-7 shrink-0 items-end justify-center rounded-[4px] pb-1 text-[7px] font-bold uppercase tracking-wide text-white ${tone}`} aria-hidden="true">
      <span className="absolute right-0 top-0 h-2 w-2 rounded-bl-[3px] bg-white/40" />
      {ext}
    </span>
  );
}

/** Act III: loose files settle into one overview. */
export function Unify({ t, lang, story }: { t: Dict; lang: Locale; story: HomeStory }) {
  const u = t.home.unify;
  const fragments = [
    { key: "invoice", label: u.fragments.invoice, ext: "pdf", tone: "bg-carbon" },
    { key: "receipt", label: u.fragments.receipt, ext: "jpg", tone: "bg-warn" },
    { key: "statement", label: u.fragments.statement, ext: "xml", tone: "bg-paid" },
    { key: "sheet", label: u.fragments.sheet, ext: "xlsx", tone: "bg-[#3f7a5a]" },
  ];
  return (
    <StoryMotion act="unify">
      <section aria-labelledby="unify-title" className="relative overflow-x-clip py-24 lg:py-32">
        <Container>
          <SectionHeading id="unify-title" kicker={u.kicker} title={u.title} lead={u.lead} align="center" />
          <div className="relative mt-12 lg:mt-14">
            <ul aria-label={t.ui.sources} className="relative z-10 flex flex-wrap justify-center gap-2.5">
              {fragments.map((frag) => (
                <li
                  key={frag.key}
                  data-m="frag"
                  className="flex items-center gap-2.5 rounded-xl border border-rule bg-card py-2 pl-2.5 pr-4 text-sm font-medium shadow-lift will-transform"
                >
                  <FileIcon ext={frag.ext} tone={frag.tone} />
                  <span className="money text-[12.5px]">{frag.label}</span>
                </li>
              ))}
            </ul>
            <div data-m="dash" className="relative mx-auto mt-8 max-w-5xl will-transform" aria-hidden="true">
              <DashboardScene ui={t.ui} lang={lang} story={story} />
            </div>
          </div>
        </Container>
      </section>
    </StoryMotion>
  );
}
