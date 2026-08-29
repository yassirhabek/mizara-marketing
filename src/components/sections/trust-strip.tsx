import { Fragment } from "react";
import { Container } from "@/components/ui/container";
import type { Dict } from "@/i18n";

export function TrustStrip({ dict }: { dict: Dict }) {
  return (
    <section className="border-y border-rule bg-card/50">
      <Container className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-5 text-xs uppercase tracking-[0.14em] text-muted">
        {dict.trust.map((item, i) => (
          <Fragment key={item}>
            {i > 0 ? (
              <span
                aria-hidden="true"
                className="hidden h-1 w-1 rounded-full bg-rule sm:block"
              />
            ) : null}
            <span>{item}</span>
          </Fragment>
        ))}
      </Container>
    </section>
  );
}
