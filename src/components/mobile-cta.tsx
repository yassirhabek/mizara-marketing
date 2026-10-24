import Link from "next/link";
import { getDict, type Locale } from "@/i18n";
import { signupUrl } from "@/lib/env";
import { buttonClass } from "@/components/ui/button";
import { MobileCtaReveal } from "@/components/mobile-cta-reveal";

/** Sticky primary action on small screens. Server-rendered; the reveal only toggles visibility. */
export function MobileCta({ lang }: { lang: Locale }) {
  const t = getDict(lang).common;
  return (
    <MobileCtaReveal>
      <div className="safe-bottom flex gap-2 border-t border-rule bg-paper/90 px-4 pt-3 max-[359px]:px-3 backdrop-blur-md">
        <a href={signupUrl} className={buttonClass("primary", "md", "min-w-0 flex-1 max-[359px]:px-3")}>
          {t.cta.signup}
        </a>
        <Link href={`/${lang}/demo`} className={buttonClass("secondary", "md", "shrink-0 max-[359px]:px-3")}>
          {t.cta.demoShort}
        </Link>
      </div>
    </MobileCtaReveal>
  );
}
