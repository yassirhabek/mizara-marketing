import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion";
import type { Dict } from "@/i18n";

export function ReserveExplainer({ dict }: { dict: Dict }) {
  const r = dict.reserve;
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading eyebrow={r.eyebrow} title={r.title} description={r.body} />
          <p className="mt-5 max-w-xl text-xs leading-relaxed text-muted">
            {r.caveat}
          </p>
        </div>

        <Reveal>
          <ul className="panel divide-y divide-rule">
            {r.points.map((point) => (
              <li key={point} className="flex items-center gap-3 px-5 py-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-carbon/10 text-carbon">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="text-sm text-ink">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
