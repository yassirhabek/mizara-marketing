import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/locales";

const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;

const linkClass =
  "font-medium text-carbon-deep underline decoration-carbon/40 decoration-1 underline-offset-[3px] transition-colors hover:decoration-carbon dark:text-carbon";

/** Renders the dictionary's inline markup: `[label](href)`, `**bold**` and `` `code` ``. */
export function RichText({ text, lang }: { text: string; lang: Locale }) {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) out.push(text.slice(last, index));
    const [, label, href, bold, code] = match;
    if (label && href) {
      if (href.startsWith("/")) {
        out.push(
          <Link key={key++} href={`/${lang}${href}`} className={linkClass}>
            {label}
          </Link>,
        );
      } else {
        const external = href.startsWith("http");
        out.push(
          <a
            key={key++}
            href={href}
            className={linkClass}
            {...(external ? { target: "_blank", rel: "noopener" } : {})}
          >
            {label}
          </a>,
        );
      }
    } else if (bold) {
      out.push(
        <strong key={key++} className="font-semibold text-ink">
          {bold}
        </strong>,
      );
    } else if (code) {
      out.push(
        <code key={key++} className="rounded bg-wash px-1 py-0.5 font-mono text-[0.9em]">
          {code}
        </code>,
      );
    }
    last = index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** Plain-text version for metadata and JSON-LD. */
export function stripMarkup(text: string) {
  return text.replace(TOKEN, (_m, label, _href, bold, code) => label ?? bold ?? code ?? "");
}
