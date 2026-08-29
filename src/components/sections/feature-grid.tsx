import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, FadeItem } from "@/components/motion";
import type { Dict } from "@/i18n";

const icons = [
  // Invoices & quotes
  "M8 3h6l4 4v14H6V5a2 2 0 0 1 2-2zM14 3v4h4M9 13h6M9 17h6",
  // Receipts with OCR
  "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",
  // VAT & IB prepared
  "M4 5h16M4 5l2 14h12l2-14M9 10v5M15 10v5",
  // Switching / import
  "M4 8h11M4 8l4-4M4 8l4 4M20 16H9M20 16l-4-4M20 16l-4 4",
  // KOR meter
  "M4 20a8 8 0 1 1 16 0M12 20v-6M12 8h.01",
  // Accountant access
  "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0",
];

export function FeatureGrid({ dict }: { dict: Dict }) {
  const f = dict.features;
  return (
    <section className="border-t border-rule bg-card/40 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={f.eyebrow} title={f.title} align="center" />

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {f.items.map((item, i) => (
            <FadeItem key={item.title}>
              <article className="panel h-full p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-carbon/10 text-carbon">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={icons[i]} />
                  </svg>
                </span>
                <h3 className="display mt-4 text-lg tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </article>
            </FadeItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
