import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, FadeItem } from "@/components/motion";
import type { Dict, RoadmapStatus } from "@/i18n";

const dot: Record<RoadmapStatus, string> = {
  shipped: "bg-paid",
  building: "bg-carbon",
  planned: "bg-muted",
};

const check: Record<RoadmapStatus, string> = {
  shipped: "text-paid",
  building: "text-carbon",
  planned: "text-muted",
};

const markPath: Record<RoadmapStatus, string> = {
  shipped: "M20 6 9 17l-5-5",
  building: "M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  planned: "M5 12h14",
};

export function Roadmap({ dict }: { dict: Dict }) {
  const r = dict.roadmap;
  return (
    <section id="roadmap" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={r.eyebrow}
          title={r.title}
          description={r.description}
        />

        <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
          {r.columns.map((col) => (
            <FadeItem key={col.status}>
              <div className="panel flex h-full flex-col p-6">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${dot[col.status]}`}
                    aria-hidden="true"
                  />
                  <h3 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                    {col.label}
                  </h3>
                </div>

                <ul className="mt-5 space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <svg
                        viewBox="0 0 24 24"
                        className={`mt-0.5 h-4 w-4 shrink-0 ${check[col.status]}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d={markPath[col.status]} />
                      </svg>
                      <span className="text-sm leading-relaxed text-ink">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeItem>
          ))}
        </Stagger>

        <p className="mt-6 text-xs text-muted">{r.footnote}</p>
      </Container>
    </section>
  );
}
