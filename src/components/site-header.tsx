import { getDict, type Locale } from "@/i18n";
import { loginUrl, signupUrl } from "@/lib/env";
import { Container } from "@/components/ui/container";
import { ExternalButton } from "@/components/ui/button";
import { Wordmark } from "@/components/wordmark";
import { NavLinks, type NavItem } from "@/components/nav-links";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";

export function navItems(lang: Locale): NavItem[] {
  const { nav } = getDict(lang).common;
  return [
    { href: `/${lang}/functies`, label: nav.features },
    { href: `/${lang}/voor-zzpers`, label: nav.audience },
    { href: `/${lang}/prijzen`, label: nav.pricing },
    { href: `/${lang}/demo`, label: nav.demo },
    { href: `/${lang}/kennisbank`, label: nav.kb },
    { href: `/${lang}/faq`, label: nav.faq },
  ];
}

export function SiteHeader({ lang }: { lang: Locale }) {
  const t = getDict(lang).common;
  const items = navItems(lang);

  return (
    <header className="sticky top-0 z-50 border-b border-rule/70 bg-desk/85 backdrop-blur-md supports-[backdrop-filter]:bg-desk/70">
      <Container className="flex h-16 items-center gap-4">
        <Wordmark href={`/${lang}`} label={`Mizara, ${t.nav.home}`} />

        <nav aria-label={t.nav.primary} className="ml-6 hidden xl:block">
          <NavLinks items={items} />
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-1 sm:flex">
            <LangToggle current={lang} label={t.a11y.language} />
            <ThemeToggle label={t.a11y.theme} />
          </div>
          <a
            href={loginUrl}
            className="hidden min-h-11 items-center rounded-full px-4 text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-ink md:inline-flex"
          >
            {t.cta.login}
          </a>
          <div className="hidden min-[360px]:block">
            <ExternalButton href={signupUrl}>{t.cta.signup}</ExternalButton>
          </div>
          <MobileMenu
            lang={lang}
            items={items}
            labels={{
              menu: t.nav.menu,
              close: t.nav.closeMenu,
              primary: t.nav.primary,
              signup: t.cta.signup,
              login: t.cta.login,
              home: t.nav.home,
              language: t.a11y.language,
              theme: t.a11y.theme,
            }}
            signupUrl={signupUrl}
            loginUrl={loginUrl}
          />
        </div>
      </Container>
    </header>
  );
}
