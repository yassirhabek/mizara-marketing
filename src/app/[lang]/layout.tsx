import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Figtree, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCta } from "@/components/mobile-cta";
import { RevealMotion } from "@/components/motion/reveal-motion";
import { JsonLd } from "@/components/json-ld";
import { getDict, isLocale, locales } from "@/i18n";
import { siteUrl } from "@/lib/env";
import { organizationLd, websiteLd } from "@/lib/seo";
import "../globals.css";

const ui = Figtree({
  variable: "--font-ui",
  subsets: ["latin"],
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Mizara",
  title: { default: "Mizara", template: "%s · Mizara" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3e9da" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1712" },
  ],
  viewportFit: "cover",
};

/* Runs before first paint: marks JS as available and records whether motion is allowed,
   so CSS can hide animated "from" states only when GSAP will actually play them. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches)d.classList.add('motion-ok')}catch(e){}})();`;

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);

  return (
    <html
      lang={lang}
      className={`${ui.variable} ${display.variable} ${mono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <JsonLd data={organizationLd(lang)} />
        <JsonLd data={websiteLd(lang)} />
      </head>
      <body className="flex min-h-dvh flex-col text-ink">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:shadow-lift"
          >
            {t.common.a11y.skip}
          </a>
          <SiteHeader lang={lang} />
          <main id="main" className="flex-1 overflow-x-clip">
            {children}
          </main>
          <SiteFooter lang={lang} />
          <MobileCta lang={lang} />
          <RevealMotion />
        </ThemeProvider>
      </body>
    </html>
  );
}
