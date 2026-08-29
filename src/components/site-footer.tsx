import Link from "next/link";
import { Monogram } from "@/components/wordmark";
import { LangToggle } from "@/components/lang-toggle";
import { Container } from "@/components/ui/container";
import type { Dict, Locale } from "@/i18n";
import { appUrl } from "@/lib/env";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  const f = dict.footer;
  return (
    <footer className="border-t border-rule bg-card/60">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Monogram className="h-7 w-7" />
          <div>
            <p className="display text-base tracking-tight text-carbon">Mizara</p>
            <p className="text-xs text-muted">{f.blurb}</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <Link href={`/${locale}/privacy`} className="hover:text-carbon">
            {f.privacy}
          </Link>
          <Link href={`/${locale}/terms`} className="hover:text-carbon">
            {f.terms}
          </Link>
          <a href="mailto:hallo@mizara.app" className="hover:text-carbon">
            {f.contact}
          </a>
          <Link href={appUrl} className="hover:text-carbon">
            {f.signIn}
          </Link>
          <LangToggle current={locale} label={dict.nav.langLabel} />
        </nav>
      </Container>
      <Container className="pb-8">
        <p className="text-xs text-muted">{f.rights}</p>
      </Container>
    </footer>
  );
}
