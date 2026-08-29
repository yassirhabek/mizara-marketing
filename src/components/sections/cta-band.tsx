import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion";
import { WaitlistForm } from "@/components/waitlist-form";
import type { Dict, Locale } from "@/i18n";

export function CtaBand({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="bg-carbon text-white">
      <Container className="py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="display text-[1.75rem] leading-tight tracking-tight sm:text-4xl">
            {dict.cta.title}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/80 sm:text-base">
            {dict.cta.body}
          </p>
          <div className="mt-8 flex justify-center">
            <WaitlistForm
              locale={locale}
              copy={dict.form}
              variant="onCarbon"
              id="waitlist-bottom"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
