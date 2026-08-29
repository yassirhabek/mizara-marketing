import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion";
import type { Dict } from "@/i18n";

export function Faq({ dict }: { dict: Dict }) {
  const f = dict.faq;
  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={f.eyebrow} title={f.title} align="center" />

        <Reveal className="mt-10 space-y-3">
          {f.items.map((item) => (
            <details
              key={item.q}
              className="panel group px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="display text-base tracking-tight text-ink">
                  {item.q}
                </span>
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-rule text-muted transition-transform duration-200 group-open:rotate-45">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
