"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { inView } from "motion";
import { animate } from "motion/mini";

const EASE = [0.22, 1, 0.36, 1] as const;
const STAGGER = 0.07;
const MAX_STAGGER_STEPS = 6;

const FROM: Record<string, string> = {
  up: "translateY(24px)",
  scale: "translateY(12px) scale(0.97)",
  left: "translateX(-20px)",
};

function motionAllowed() {
  try {
    return window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  } catch {
    return false;
  }
}

/**
 * Scroll reveals for server-rendered `[data-reveal]` elements outside the GSAP acts. CSS hides them
 * only while JS runs with motion allowed (see globals.css), so without JS or with reduced motion they
 * are simply there. Elements that come into view in the same frame are staggered in DOM order.
 */
export function RevealMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (!motionAllowed()) return;
    document.documentElement.classList.add("js", "motion-ok");

    const targets = [...document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])")].filter((el) => !el.closest("[data-act]"));
    let pending: HTMLElement[] = [];
    let frame = 0;

    const flush = () => {
      frame = 0;
      const batch = pending.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      pending = [];
      batch.forEach((el, index) => {
        const from = FROM[el.dataset.reveal ?? ""] ?? FROM.up;
        animate(el, { opacity: [0, 1], transform: [from, "none"] }, { duration: 0.75, delay: Math.min(index, MAX_STAGGER_STEPS) * STAGGER, ease: EASE }).finished.then(() => {
          el.dataset.shown = "";
          el.style.removeProperty("opacity");
          el.style.removeProperty("transform");
        });
      });
    };

    const stops = targets.map((el) => {
      el.dataset.armed = "";
      return inView(
        el,
        () => {
          pending.push(el);
          if (!frame) frame = requestAnimationFrame(flush);
        },
        { margin: "0px 0px -8% 0px" },
      );
    });

    return () => {
      stops.forEach((stop) => stop());
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
