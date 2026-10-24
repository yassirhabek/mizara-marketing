import Image from "next/image";

/**
 * A compact stand-in for the product shell: window bar, the product's sidebar sections,
 * and a content area. Purely presentational.
 */
export function AppFrame({
  nav,
  active,
  title,
  children,
  className = "",
  bodyClassName = "",
}: {
  nav: string[];
  active: number;
  title: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[1.1rem] border border-rule bg-paper shadow-float ${className}`}>
      <div className="flex h-9 items-center gap-2 border-b border-rule bg-card/80 px-3.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
        </span>
        <span className="mx-auto rounded-md bg-wash px-3 py-0.5 text-[11px] text-muted">app.mizara.nl</span>
        <span className="w-10" aria-hidden="true" />
      </div>
      <div className="grid grid-cols-[auto_1fr]">
        <aside className="hidden w-40 flex-col gap-0.5 border-r border-rule bg-card/50 p-3 sm:flex" aria-hidden="true">
          <div className="mb-3 flex items-center gap-2 px-1.5">
            <Image src="/brand/mark.svg" alt="" width={20} height={20} unoptimized className="rounded-[5px]" />
            <span className="display text-[13px]">Mizara</span>
          </div>
          {nav.map((item, index) => (
            <span
              key={item}
              className={`rounded-lg px-2.5 py-1.5 text-[12px] ${
                index === active ? "bg-carbon/10 font-semibold text-carbon-deep dark:text-carbon" : "text-ink-soft"
              }`}
            >
              {item}
            </span>
          ))}
        </aside>
        <div className={`min-w-0 p-4 sm:p-5 ${bodyClassName}`}>
          <p className="display mb-3 text-[15px]">{title}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
