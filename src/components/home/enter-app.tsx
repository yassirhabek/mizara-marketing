import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import { Container } from "@/components/ui/container";
import { StoryMotion } from "@/components/motion/story-motion";
import { DemoLoader } from "@/components/demo/demo-loader";
import { demoStrings } from "@/components/demo/strings";
import { SectionHeading } from "./section-heading";

/** Act V: a tilted app window settles flat as you arrive, and the demo inside becomes yours. */
export function EnterApp({ t, lang }: { t: Dict; lang: Locale }) {
  const e = t.home.enter;
  return (
    <StoryMotion act="enter">
      <section id="probeer" aria-labelledby="enter-title" className="relative scroll-mt-20 py-24 lg:py-32">
        <Container>
          <SectionHeading id="enter-title" kicker={e.kicker} title={e.title} lead={e.lead} align="center" />
          <div className="mt-12 [perspective:1800px] lg:mt-16">
            <div
              data-m="frame"
              className="mx-auto max-w-6xl origin-[50%_0%] overflow-clip rounded-[1.4rem] border border-rule bg-paper shadow-float will-transform"
            >
              <div className="flex h-10 items-center gap-2 border-b border-rule bg-card/80 px-4" aria-hidden="true">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rule" />
                  <span className="h-2.5 w-2.5 rounded-full bg-rule" />
                  <span className="h-2.5 w-2.5 rounded-full bg-rule" />
                </span>
                <span className="mx-auto rounded-md bg-wash px-3 py-0.5 text-[11px] text-muted">mizara.app/{lang}/demo</span>
                <span className="w-10" />
              </div>
              <DemoLoader lang={lang} strings={demoStrings(t)} variant="embedded" />
            </div>
          </div>
        </Container>
      </section>
    </StoryMotion>
  );
}
