"use client";

type GsapModule = typeof import("gsap");
type ScrollTriggerModule = typeof import("gsap/ScrollTrigger");

export type Gsap = GsapModule["gsap"];
export type ScrollTriggerStatic = ScrollTriggerModule["ScrollTrigger"];
export type GsapKit = { gsap: Gsap; ScrollTrigger: ScrollTriggerStatic };

let kit: Promise<GsapKit> | null = null;

/** Loads GSAP and ScrollTrigger once, after hydration, as a separate chunk. */
export function loadGsap(): Promise<GsapKit> {
  kit ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, st]) => {
    const { gsap } = g;
    const { ScrollTrigger } = st;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => undefined);
    }
    return { gsap, ScrollTrigger };
  });
  return kit;
}

let refreshTimer: ReturnType<typeof setTimeout> | undefined;

/** Debounced ScrollTrigger.refresh for layout changes (late content, the demo mounting). */
export function requestRefresh(delay = 120) {
  if (!kit) return;
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    kit?.then(({ ScrollTrigger }) => ScrollTrigger.refresh());
  }, delay);
}

export const DESKTOP = "(min-width: 1024px) and (min-height: 700px)";
export const COMPACT = "(max-width: 1023px), (max-height: 699px)";
