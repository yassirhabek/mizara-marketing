import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/ui/container";
import type { Dict, Locale } from "@/i18n";
import { appUrl } from "@/lib/env";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Wordmark href={`/${locale}`} tagline={dict.nav.tagline} />

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#roadmap"
            className="hidden text-sm text-muted hover:text-carbon md:inline"
          >
            {dict.nav.roadmap}
          </a>
          <LangToggle current={locale} label={dict.nav.langLabel} />
          <ThemeToggle label={dict.nav.themeToggle} />
          <Link
            href={appUrl}
            className="hidden text-sm text-muted hover:text-carbon sm:inline"
          >
            {dict.nav.signIn}
          </Link>
          <a
            href="#waitlist"
            className="inline-flex min-h-9 items-center justify-center rounded-lg bg-carbon px-3.5 py-2 text-sm font-medium text-white hover:bg-carbon-deep"
          >
            {dict.nav.waitlistCta}
          </a>
        </div>
      </Container>
    </header>
  );
}
