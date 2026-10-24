import Link from "next/link";
import type { Dict, ProductScene } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import type { HomeStory } from "@/lib/demo-tax/story";
import { Container } from "@/components/ui/container";
import { BankScene, ExpenseScene, InvoiceScene, TaxScene } from "@/components/product/scenes";
import { RichText } from "@/components/rich-text";
import { TourController } from "@/components/motion/tour-controller";
import { SectionHeading } from "./section-heading";

function SceneUi({ id, t, lang, story }: { id: ProductScene["id"]; t: Dict; lang: Locale; story: HomeStory }) {
  const props = { ui: t.ui, lang, story };
  switch (id) {
    case "invoices":
      return <InvoiceScene {...props} />;
    case "expenses":
      return <ExpenseScene {...props} />;
    case "bank":
      return <BankScene {...props} />;
    case "tax":
      return <TaxScene {...props} />;
  }
}

/**
 * Act IV. Text articles scroll; on large screens with JS a sticky frame shows the active
 * scene. Without JS (or below lg) each article carries its own UI inline.
 */
export function ProductTour({ t, lang, story }: { t: Dict; lang: Locale; story: HomeStory }) {
  const tour = t.home.tour;
  return (
    <section aria-labelledby="tour-title" className="relative py-24 lg:py-32">
      <Container>
        <SectionHeading id="tour-title" kicker={tour.kicker} title={tour.title} lead={tour.lead} />
        <TourController ids={tour.scenes.map((scene) => scene.id)}>
          <div className="mt-14 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              {tour.scenes.map((scene, index) => (
                <article
                  key={scene.id}
                  id={`scene-${scene.id}`}
                  data-scene={scene.id}
                  aria-labelledby={`scene-${scene.id}-title`}
                  className="scroll-mt-28 border-t border-rule py-12 first:border-t-0 first:pt-0 lg:flex lg:min-h-[78vh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-0"
                >
                  <p className="money text-sm text-muted">
                    0{index + 1} · {scene.tab}
                  </p>
                  <h3 id={`scene-${scene.id}-title`} className="display t-h3 mt-3">
                    {scene.title}
                  </h3>
                  <p className="mt-4 max-w-md text-pretty text-[1.05rem] leading-relaxed text-ink-soft">
                    <RichText text={scene.text} lang={lang} />
                  </p>
                  <ul className="mt-6 grid max-w-md gap-2.5">
                    {scene.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[0.98rem]">
                        <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-paid" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 8.5l3 3 7-7" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${lang}${scene.href}`}
                    className="mt-7 inline-flex min-h-11 items-center gap-1.5 text-[0.98rem] font-semibold text-carbon-deep underline-offset-4 hover:underline dark:text-carbon"
                  >
                    {scene.linkLabel}
                    <span aria-hidden="true">→</span>
                  </Link>
                  <div data-inline-ui className="mt-8" aria-hidden="true">
                    <SceneUi id={scene.id} t={t} lang={lang} story={story} />
                  </div>
                </article>
              ))}
            </div>

            <div data-tour-stage className="relative hidden">
              <div className="sticky top-24 pb-12">
                <nav aria-label={tour.title} className="mb-5 flex gap-1 rounded-full border border-rule bg-card/80 p-1 shadow-lift backdrop-blur">
                  {tour.scenes.map((scene) => (
                    <a
                      key={scene.id}
                      href={`#scene-${scene.id}`}
                      data-tab={scene.id}
                      className="relative flex min-h-10 flex-1 items-center justify-center rounded-full px-3 text-sm font-semibold text-ink-soft transition-colors duration-300 hover:text-ink aria-[current=step]:bg-ink aria-[current=step]:text-paper"
                    >
                      {scene.tab}
                    </a>
                  ))}
                </nav>
                <div className="grid" aria-hidden="true">
                  {tour.scenes.map((scene, index) => (
                    <div
                      key={scene.id}
                      data-stage={scene.id}
                      className="col-start-1 row-start-1 transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[active=false]:invisible data-[active=false]:translate-y-4 data-[active=false]:scale-[0.98] data-[active=false]:opacity-0"
                      data-active={index === 0 ? "true" : "false"}
                    >
                      <SceneUi id={scene.id} t={t} lang={lang} story={story} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TourController>
      </Container>
    </section>
  );
}
