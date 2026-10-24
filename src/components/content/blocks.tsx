import Link from "next/link";
import type { Block, Section } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import { localePath } from "@/lib/routes";
import { RichText } from "@/components/rich-text";

function BlockView({ block, lang }: { block: Block; lang: Locale }) {
  switch (block.kind) {
    case "p":
      return (
        <p>
          <RichText text={block.text} lang={lang} />
        </p>
      );
    case "ul":
    case "ol": {
      const List = block.kind;
      return (
        <List>
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} lang={lang} />
            </li>
          ))}
        </List>
      );
    }
    case "table":
      return (
        <div className="relative -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table>
            {block.caption ? <caption>{block.caption}</caption> : null}
            <thead>
              <tr>
                {block.head.map((cell, index) => (
                  <th key={cell} scope="col" className={block.numericCols?.includes(index) ? "num" : undefined}>
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={index} scope="row">
                        <RichText text={cell} lang={lang} />
                      </th>
                    ) : (
                      <td key={index} className={block.numericCols?.includes(index) ? "num" : undefined}>
                        <RichText text={cell} lang={lang} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <aside className={`not-prose my-6 rounded-xl border px-5 py-4 ${block.tone === "warn" ? "border-warn/35 bg-warn/8" : "border-rule bg-card"}`}>
          {block.title ? <p className="font-semibold text-ink">{block.title}</p> : null}
          <p className={`text-ink-soft ${block.title ? "mt-1.5" : ""}`}>
            <RichText text={block.text} lang={lang} />
          </p>
        </aside>
      );
    case "calc":
      return (
        <figure className="not-prose my-7 overflow-hidden rounded-xl border border-rule bg-card">
          <figcaption className="border-b border-rule bg-wash/60 px-5 py-3 text-sm font-semibold">{block.title}</figcaption>
          <dl className="divide-y divide-rule/70">
            {block.rows.map((row) => (
              <div key={row.label} className={`flex items-baseline justify-between gap-4 px-5 py-2.5 ${row.strong ? "bg-wash/40 font-semibold" : ""}`}>
                <dt className={row.strong ? "text-ink" : "text-ink-soft"}>{row.label}</dt>
                <dd className="money whitespace-nowrap text-ink">
                  {row.sign === "minus" ? "− " : row.sign === "plus" ? "+ " : ""}
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          {block.note ? (
            <p className="border-t border-rule px-5 py-3 text-sm text-muted">
              <RichText text={block.note} lang={lang} />
            </p>
          ) : null}
        </figure>
      );
  }
}

export function Blocks({ blocks, lang }: { blocks: Block[]; lang: Locale }) {
  return (
    <>
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} lang={lang} />
      ))}
    </>
  );
}

export function Sections({ sections, lang }: { sections: Section[]; lang: Locale }) {
  return (
    <div className="prose-mz">
      {sections.map((section) => (
        <section key={section.id} aria-labelledby={section.id} data-reveal>
          <h2 id={section.id} className="scroll-mt-24">
            {section.title}
          </h2>
          <Blocks blocks={section.blocks} lang={lang} />
        </section>
      ))}
    </div>
  );
}

export function Toc({ sections, title }: { sections: Section[]; title: string }) {
  return (
    <nav aria-labelledby="toc-title" className="text-sm">
      <p id="toc-title" className="font-semibold">
        {title}
      </p>
      <ol className="mt-3 grid gap-1 border-l border-rule">
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-ink-soft transition-colors hover:border-carbon hover:text-ink">
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Related({ title, links, lang }: { title: string; links: { href: string; label: string }[]; lang: Locale }) {
  return (
    <nav aria-labelledby="related-title" className="mt-14 border-t border-rule pt-8">
      <h2 id="related-title" className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
        {title}
      </h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-3">
        {links.map((link) => (
          <li key={link.href} data-reveal>
            <Link
              href={localePath(lang, link.href)}
              className="group flex h-full min-h-14 items-center justify-between gap-3 rounded-xl border border-rule bg-card px-4 py-3 font-medium transition-colors hover:border-carbon/50"
            >
              {link.label}
              <span aria-hidden="true" className="text-muted transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
