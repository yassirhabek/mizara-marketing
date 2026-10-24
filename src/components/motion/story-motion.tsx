"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { loadGsap, requestRefresh } from "@/lib/gsap";
import { ACTS, type ActName } from "./acts";

function motionAllowed() {
  try {
    return window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  } catch {
    return false;
  }
}

/**
 * Enhances a server-rendered act with GSAP. The HTML already shows the final, readable
 * state; animations only describe where things come from. Nothing runs when the visitor
 * prefers reduced motion, and everything is reverted on unmount.
 */
export function StoryMotion({ act, children }: { act: ActName; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    if (!motionAllowed()) {
      /* CSS only hides [data-enter] while .motion-ok && !data-ready — mark ready so
         a stale class from a prior route cannot leave content invisible. */
      root.dataset.ready = "true";
      return;
    }

    document.documentElement.classList.add("js", "motion-ok");

    let cancelled = false;
    let revert: (() => void) | undefined;

    loadGsap().then((kit) => {
      if (cancelled) return;
      const ctx = kit.gsap.context(() => {
        const mm = kit.gsap.matchMedia();
        ACTS[act]({ ...kit, root, mm });
      }, root);
      root.dataset.ready = "true";
      revert = () => ctx.revert();
      /* Soft lang switches keep scrollY; refresh once layout commits so scrubbed
         acts (unify/enter/breakdown) land on the right progress instead of "from". */
      requestRefresh(0);
      requestRefresh(120);
    });

    return () => {
      cancelled = true;
      revert?.();
      delete root.dataset.ready;
    };
  }, [act, pathname]);

  return (
    <div ref={ref} data-act={act} className="contents">
      {children}
    </div>
  );
}
