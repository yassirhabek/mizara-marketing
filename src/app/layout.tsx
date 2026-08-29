import type { Metadata, Viewport } from "next";
import { Figtree, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { defaultLocale } from "@/i18n";
import { siteUrl } from "@/lib/env";
import "./globals.css";

const ui = Figtree({
  variable: "--font-ui",
  subsets: ["latin"],
});

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mizara — ZZP-boekhouding",
    template: "%s · Mizara",
  },
  applicationName: "Mizara",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf5ec" },
    { media: "(prefers-color-scheme: dark)", color: "#221c16" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={defaultLocale}
      className={`${ui.variable} ${display.variable} ${mono.variable} min-h-dvh antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh text-ink">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
