import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion";
import type { Dict } from "@/i18n";

export function PrivacySection({ dict }: { dict: Dict }) {
  const p = dict.privacy;
  return (
    <section className="border-t border-rule bg-card/40 py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} />

        <Reveal>
          <ul className="space-y-3">
            {p.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-paid/15 text-paid">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed text-ink">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
