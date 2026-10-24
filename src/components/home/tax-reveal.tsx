import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import type { HomeStory } from "@/lib/demo-tax/story";
import { Container } from "@/components/ui/container";
import { RichText } from "@/components/rich-text";
import { Money } from "@/components/product/primitives";
import { TaxEnvelope } from "@/components/product/tax-envelope";
import { StoryMotion } from "@/components/motion/story-motion";
import { TaxDisclaimer } from "@/components/tax-disclaimer";
import { Kicker } from "./section-heading";

/** Act VI: the one number, and where it comes from. */
export function TaxReveal({ t, lang, story }: { t: Dict; lang: Locale; story: HomeStory }) {
  const r = t.home.reveal;
  const s = story.after;
  return (
    <StoryMotion act="reveal">
      <section aria-labelledby="reveal-title" className="relative py-24 lg:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <Kicker>{r.kicker}</Kicker>
            <h2 id="reveal-title" data-m="title" className="display t-h2 mt-4 text-balance">
              {r.title}
            </h2>
            <p data-m="lead" className="t-lead mt-5 max-w-xl text-pretty text-ink-soft">
              {r.lead}
            </p>
            <h3 className="mt-10 font-semibold">{r.howTitle}</h3>
            <ol className="mt-4 grid gap-4">
              {r.howSteps.map((step, index) => (
                <li key={step} data-m="step" className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="money flex h-7 w-7 items-center justify-center rounded-full border border-rule bg-card text-xs text-muted">
                    {index + 1}
                  </span>
                  <p className="text-pretty text-ink-soft">
                    <RichText text={step} lang={lang} />
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div data-m="envelope" className="relative">
            <div aria-hidden="true" className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--fiscal)_14%,transparent),transparent)]" />
            <TaxEnvelope
              ui={t.ui}
              lang={lang}
              size="lg"
              setAsideCents={s.setAsideCents}
              btwCents={s.btwPayableCents}
              ibZvwCents={s.ibZvwBufferedCents}
              amount={
                <>
                  <span data-m="count" data-to={s.setAsideCents} data-lang={lang} aria-hidden="true">
                    <Money cents={s.setAsideCents} lang={lang} whole className="[font-family:inherit] [letter-spacing:inherit]" />
                  </span>
                  <span className="sr-only">
                    <Money cents={s.setAsideCents} lang={lang} whole />
                  </span>
                </>
              }
            />
            <p className="mt-3 text-sm text-muted">{r.roundNote}</p>
            <div className="mt-6">
              <TaxDisclaimer disclaimer={t.common.tax.disclaimer} scope={t.common.tax.scope} />
            </div>
          </div>
        </Container>
      </section>
    </StoryMotion>
  );
}
