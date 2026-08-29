import { Reveal } from "@/components/motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const alignment =
    align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";
  return (
    <Reveal className={alignment}>
      {eyebrow ? (
        <p className="text-[11px] uppercase tracking-[0.22em] text-carbon">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="display mt-2 text-[1.75rem] leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
