export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2 text-sm font-semibold text-carbon-deep dark:text-carbon ${className}`}>
      <span aria-hidden="true" className="h-px w-6 bg-current" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  kicker,
  title,
  lead,
  align = "left",
  className = "",
}: {
  id: string;
  kicker?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {kicker ? <Kicker className={center ? "justify-center" : ""}>{kicker}</Kicker> : null}
      <h2 id={id} data-m="title" className="display t-h2 mt-4 text-balance">
        {title}
      </h2>
      {lead ? (
        <p data-m="lead" className={`t-lead mt-5 text-pretty text-ink-soft ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
