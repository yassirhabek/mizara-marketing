import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import type { HomeStory } from "@/lib/demo-tax/story";
import { signupUrl } from "@/lib/env";
import { Container } from "@/components/ui/container";
import { ButtonLink, ExternalButton } from "@/components/ui/button";
import { InvoicePaper } from "@/components/product/invoice-paper";
import { TaxEnvelope } from "@/components/product/tax-envelope";
import { FictionTag } from "@/components/product/primitives";
import { sampleInvoice } from "@/components/product/scenes";
import { StoryMotion } from "@/components/motion/story-motion";

export function Hero({ t, lang, story }: { t: Dict; lang: Locale; story: HomeStory }) {
  const h = t.home.hero;
  return (
    <StoryMotion act="hero">
      <section aria-labelledby="hero-title" className="relative overflow-x-clip">
        <Container className="grid items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28 lg:pt-20">
          <div className="max-w-2xl">
            <h1 id="hero-title" className="display t-hero text-balance">
              <span className="block">{h.line1}</span>
              <span className="relative inline-block text-carbon-deep dark:text-carbon">
                {h.line2}
                <svg
                  data-m="underline"
                  aria-hidden="true"
                  viewBox="0 0 400 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full text-carbon/45"
                >
                  <path d="M2 9 C 90 3, 210 3, 398 7" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" pathLength={1} />
                </svg>
              </span>
            </h1>
            <p data-enter className="t-lead mt-8 max-w-xl text-pretty text-ink-soft">
              {h.lead}
            </p>
            <div data-enter className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ExternalButton href={signupUrl} size="lg" arrow>
                {t.common.cta.signup}
              </ExternalButton>
              <ButtonLink href={`/${lang}/demo`} variant="secondary" size="lg">
                {t.common.cta.demo}
              </ButtonLink>
            </div>
            <p data-enter className="mt-4 text-sm text-muted">
              {h.note}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem] lg:mr-0" role="img" aria-label={h.visualLabel}>
            <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--carbon)_16%,transparent),transparent)]" />
            <div data-enter data-m="hero-tag" className="mb-4 flex justify-center lg:justify-start">
              <FictionTag>{t.common.tax.demoBadge}</FictionTag>
            </div>
            <div data-enter data-m="hero-invoice" className="relative w-[92%] -rotate-[2.5deg] will-transform sm:w-[86%]">
              <InvoicePaper {...sampleInvoice({ ui: t.ui, lang, story })} status="open" />
            </div>
            <div data-enter data-m="hero-envelope" className="relative -mt-16 ml-auto w-[78%] rotate-[1.5deg] will-transform sm:-mt-24 sm:w-[64%]">
              <TaxEnvelope
                ui={t.ui}
                lang={lang}
                setAsideCents={story.after.setAsideCents}
                btwCents={story.after.btwPayableCents}
                ibZvwCents={story.after.ibZvwBufferedCents}
              />
            </div>
          </div>
        </Container>
      </section>
    </StoryMotion>
  );
}
