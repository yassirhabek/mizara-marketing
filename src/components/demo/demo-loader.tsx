"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { requestRefresh } from "@/lib/gsap";
import type { DemoStrings } from "./strings";

export type DemoVariant = "embedded" | "page";

const Demo = dynamic(() => import("./demo"), { ssr: false, loading: () => null });

/**
 * Reserves the demo's space so nothing shifts, then loads the interactive island: right
 * away on /demo, and only when it nears the viewport on the homepage.
 */
export function DemoLoader({ lang, strings, variant }: { lang: Locale; strings: DemoStrings; variant: DemoVariant }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(variant === "page");

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (visible) requestRefresh(400);
  }, [visible]);

  return (
    <div ref={ref} className="min-h-[46rem] sm:min-h-[40rem] lg:min-h-[38rem]">
      {visible ? (
        <Demo lang={lang} strings={strings} variant={variant} />
      ) : (
        <p className="flex min-h-[inherit] items-center justify-center text-sm text-muted">
          <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-carbon" aria-hidden="true" />
          {strings.demo.loading}
        </p>
      )}
    </div>
  );
}
