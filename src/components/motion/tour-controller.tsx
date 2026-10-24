"use client";

import { useEffect, useRef } from "react";

/**
 * Act IV scene switching. Watches which text article sits in the middle of the viewport
 * and flips `data-active` on the sticky stage and `aria-current` on the scene tabs. Plain
 * IntersectionObserver: it costs nothing and works with reduced motion too.
 */
export function TourController({ ids, children }: { ids: string[]; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const stages = Array.from(root.querySelectorAll<HTMLElement>("[data-stage]"));
    const tabs = Array.from(root.querySelectorAll<HTMLElement>("[data-tab]"));

    const activate = (id: string) => {
      for (const stage of stages) stage.dataset.active = String(stage.dataset.stage === id);
      for (const tab of tabs) {
        if (tab.dataset.tab === id) tab.setAttribute("aria-current", "step");
        else tab.removeAttribute("aria-current");
      }
    };
    activate(ids[0]);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.scene;
          if (entry.isIntersecting && id) activate(id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const article of root.querySelectorAll("[data-scene]")) observer.observe(article);
    return () => observer.disconnect();
  }, [ids]);

  return <div ref={ref}>{children}</div>;
}
