import Link from "next/link";
import { getDict, type Locale } from "@/i18n";
import { appUrl } from "@/lib/env";
import { FEATURE_SLUGS, ARTICLE_SLUGS } from "@/lib/routes";
import { Container } from "@/components/ui/container";
import { Mark } from "@/components/wordmark";

type FooterLink = { href: string; label: string; external?: boolean };

function Column({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <ul className="mt-3 space-y-1">
        {links.map((link) =>
          <li key={link.href}>
            {link.external ? (
              <a href={link.href} className="inline-flex min-h-9 items-center text-[0.95rem] text-ink-soft [overflow-wrap:anywhere] transition-colors hover:text-carbon-deep dark:hover:text-carbon">
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="inline-flex min-h-9 items-center text-[0.95rem] text-ink-soft transition-colors hover:text-carbon-deep dark:hover:text-carbon">
                {link.label}
              </Link>
            )}
          </li>,
        )}
      </ul>
    </div>
  );
}

export function SiteFooter({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const f = t.common.footer;
  const l = (path: string) => `/${lang}${path}`;

  const product: FooterLink[] = [
    { href: l("/functies"), label: t.common.nav.allFeatures },
    ...FEATURE_SLUGS.map((slug) => ({ href: l(`/functies/${slug}`), label: t.features.pages[slug].nav })),
    { href: l("/demo"), label: t.common.nav.demo },
    { href: l("/prijzen"), label: t.common.nav.pricing },
  ];
  const learn: FooterLink[] = [
    { href: l("/kennisbank"), label: t.common.nav.kb },
    ...ARTICLE_SLUGS.map((slug) => ({ href: l(`/kennisbank/${slug}`), label: t.kb.articles[slug].h1 })),
  ];
  const company: FooterLink[] = [
    { href: l("/voor-zzpers"), label: t.common.nav.audience },
    { href: l("/faq"), label: t.common.nav.faq },
    { href: "mailto:support@mizara.app", label: `${f.contact}: support@mizara.app`, external: true },
  ];
  const legal: FooterLink[] = [
    { href: `${appUrl}/privacy`, label: f.appPrivacy, external: true },
    { href: `${appUrl}/terms`, label: f.appTerms, external: true },
    { href: `${appUrl}/verwerkersovereenkomst`, label: f.dpa, external: true },
    { href: l("/privacy"), label: f.privacy },
    { href: l("/terms"), label: f.terms },
  ];

  return (
    <footer id="site-footer" className="mt-24 border-t border-rule bg-paper/70 pb-28 pt-14 sm:pb-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
          <div className="max-w-xs sm:col-span-2 lg:col-span-1">
            <Link href={l("")} className="inline-flex items-center gap-2.5 rounded-lg">
              <Mark size={28} />
              <span className="display text-lg">Mizara</span>
            </Link>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">{f.tagline}</p>
          </div>
          <Column title={f.product} links={product} />
          <Column title={f.learn} links={learn} />
          <Column title={f.company} links={company} />
          <Column title={f.legal} links={legal} />
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-rule pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl">{f.note}</p>
          <p>
            © 2026 {f.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
