import type { QA } from "@/i18n";
import type { Locale } from "@/i18n/locales";
import { RichText } from "@/components/rich-text";

/** Native <details>: open/close works without JS and answers stay in the HTML. */
export function FaqList({ items, lang, className = "" }: { items: QA[]; lang: Locale; className?: string }) {
  return (
    <div className={`divide-y divide-rule border-y border-rule ${className}`}>
      {items.map((item) => (
        <details key={item.q} data-reveal className="group">
          <summary className="flex min-h-14 items-center justify-between gap-6 py-4 text-left text-[1.05rem] font-semibold">
            <h3 className="[font:inherit]">{item.q}</h3>
            <span aria-hidden="true" className="relative h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45">
              <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rounded bg-current" />
              <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded bg-current" />
            </span>
          </summary>
          <p className="max-w-2xl pb-5 pr-10 text-pretty leading-relaxed text-ink-soft motion-safe:group-open:animate-[mz-answer_0.4s_cubic-bezier(0.22,1,0.36,1)]">
            <RichText text={item.a} lang={lang} />
          </p>
        </details>
      ))}
    </div>
  );
}
