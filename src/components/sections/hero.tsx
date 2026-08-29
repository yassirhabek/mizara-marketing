import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion";
import { WaitlistForm } from "@/components/waitlist-form";
import type { Dict, Locale } from "@/i18n";
import { appUrl } from "@/lib/env";

export function Hero({ locale, dict }: { locale: Locale; dict: Dict }) {
  const h = dict.hero;
  return (
    <section className="relative overflow-hidden">
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8">
        <Reveal>
          <Badge tone="carbon">{h.badge}</Badge>
          <h1 className="display mt-5 text-[2.25rem] leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
            {h.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {h.subhead}
          </p>

          <div className="mt-8" id="waitlist">
            <WaitlistForm locale={locale} copy={dict.form} />
            <p className="mt-2 text-xs text-muted">{h.formNote}</p>
          </div>

          <Link
            href={appUrl}
            className="mt-6 inline-flex text-sm text-muted underline-offset-4 hover:text-carbon hover:underline"
          >
            {h.signInPrompt} →
          </Link>
        </Reveal>

        <Reveal className="lg:justify-self-end">
          <ReserveMock dict={dict} />
        </Reveal>
      </Container>
    </section>
  );
}

function ReserveMock({ dict }: { dict: Dict }) {
  const h = dict.hero;
  const total = "€ 4.812";
  const segments = [
    { w: "44%", className: "bg-carbon" },
    { w: "43%", className: "bg-fiscal" },
    { w: "13%", className: "bg-warn" },
  ];

  return (
    <div
      className="panel w-full max-w-sm p-6"
      aria-hidden="true"
    >
      <div className="letter-rule w-10" />
      <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-muted">
        {h.reserveLabel}
      </p>
      <p className="money mt-2 text-4xl font-medium tracking-tight text-ink">
        {total}
      </p>
      <p className="mt-1 text-xs text-muted">{h.reserveCaption}</p>

      <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-wash">
        {segments.map((s, i) => (
          <div key={i} className={s.className} style={{ width: s.w }} />
        ))}
      </div>

      <dl className="mt-4 space-y-2">
        {h.reserveParts.map((part, i) => (
          <div
            key={part.label}
            className="flex items-center justify-between text-sm"
          >
            <dt className="flex items-center gap-2 text-muted">
              <span
                className={`h-2 w-2 rounded-full ${segments[i]?.className ?? "bg-carbon"}`}
              />
              {part.label}
            </dt>
            <dd className="money text-ink">{part.amount}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
