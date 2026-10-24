import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import { FEATURE_SLUGS, localePath } from "@/lib/routes";
import { homeStory } from "@/lib/demo-tax/story";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-shell";
import { FeatureScene } from "@/components/content/feature-scene";
import { FinalCta } from "@/components/home/closing";

export async function generateMetadata({ params }: PageProps<"/[lang]/functies">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(lang, "/functies", getDict(lang).features.hub.meta);
}

export default async function FeaturesHub({ params }: PageProps<"/[lang]/functies">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const hub = t.features.hub;
  const story = homeStory();

  return (
    <>
      <PageHeader lang={lang} crumbs={[{ name: t.common.nav.features, path: "/functies" }]} title={hub.h1} lead={hub.lead} />

      <section aria-label={t.common.nav.features} className="pb-16">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {FEATURE_SLUGS.map((slug) => {
              const page = t.features.pages[slug];
              return (
                <li key={slug} data-reveal>
                  <Link
                    href={localePath(lang, `/functies/${slug}`)}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-rule bg-card transition-[border-color,box-shadow] hover:border-carbon/40 hover:shadow-float"
                  >
                    <div className="p-6 sm:p-7">
                      <h2 className="display text-2xl">{page.nav}</h2>
                      <p className="mt-2 text-pretty text-ink-soft">{page.summary}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-carbon-deep dark:text-carbon">
                        {t.common.labels.learnMore} {page.nav.toLowerCase()}
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </span>
                    </div>
                    <div className="pointer-events-none mt-auto max-h-64 overflow-hidden border-t border-rule bg-wash/50 px-6 pt-6 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]" aria-hidden="true">
                      <FeatureScene slug={slug} ui={t.ui} lang={lang} story={story} />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="extras-title" className="pb-20">
        <Container>
          <h2 id="extras-title" className="display t-h3">
            {hub.extrasTitle}
          </h2>
          <ul data-reveal="scale" className="mt-6 grid gap-px overflow-hidden rounded-[1.25rem] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {hub.extras.map((extra) => (
              <li key={extra.title} className="bg-card p-6">
                <h3 className="font-semibold">{extra.title}</h3>
                <p className="mt-2 text-pretty text-ink-soft">{extra.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCta t={t} lang={lang} />
    </>
  );
}
