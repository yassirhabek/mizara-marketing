/** The product's disclaimer and scope sentence, verbatim, wherever a tax figure appears. */
export function TaxDisclaimer({ disclaimer, scope, className = "" }: { disclaimer: string; scope: string; className?: string }) {
  return (
    <aside className={`flex gap-3 rounded-xl border border-rule bg-wash/70 px-4 py-3.5 text-sm leading-relaxed text-ink-soft ${className}`}>
      <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-warn" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 6v5M10 13.5v.5" strokeLinecap="round" />
      </svg>
      <div>
        <p>{disclaimer}</p>
        <p className="mt-1.5 text-muted">{scope}</p>
      </div>
    </aside>
  );
}
