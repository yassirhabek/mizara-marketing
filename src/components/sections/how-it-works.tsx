import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, FadeItem } from "@/components/motion";
import type { Dict } from "@/i18n";

export function HowItWorks({ dict }: { dict: Dict }) {
  const h = dict.how;
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={h.eyebrow} title={h.title} />

        <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
          {h.steps.map((step, i) => (
            <FadeItem key={step.title}>
              <div className="panel h-full p-6">
                <span className="money text-2xl text-carbon">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-3 text-lg tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </FadeItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
