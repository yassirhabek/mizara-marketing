"use client";

import { useEffect, useRef } from "react";
import { loadGsap, requestRefresh } from "@/lib/gsap";
import { ACTS, type ActName } from "./acts";

/**
 * Enhances a server-rendered act with GSAP. The HTML already shows the final, readable
 * state; animations only describe where things come from. Nothing runs when the visitor
 * prefers reduced motion, and everything is reverted on unmount.
 */
export function StoryMotion({ act, children }: { act: ActName; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !document.documentElement.classList.contains("motion-ok")) return;
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
      requestRefresh();
    });

    return () => {
      cancelled = true;
      revert?.();
      delete root.dataset.ready;
    };
  }, [act]);

  return (
    <div ref={ref} data-act={act} className="contents">
      {children}
    </div>
  );
}
