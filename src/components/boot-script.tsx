"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/* Runs before first paint: marks JS as available and records whether motion is allowed,
   so CSS can hide animated "from" states only when GSAP will actually play them.
   Server emits text/javascript (browser executes during HTML parse). Client emits
   text/plain so React 19 does not warn about non-executing client script tags.
   @see https://nextjs.org/docs/app/guides/preventing-flash-before-hydration */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches)d.classList.add('motion-ok')}catch(e){}})();`;

function applyBootClasses() {
  const root = document.documentElement;
  root.classList.add("js");
  try {
    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      root.classList.add("motion-ok");
    } else {
      root.classList.remove("motion-ok");
    }
  } catch {
    root.classList.remove("motion-ok");
  }
}

export function BootScript() {
  const pathname = usePathname();

  /* Soft navigations (e.g. language toggle) re-render <html className> and can wipe
     classes the inline script added. Re-apply before paint so GSAP/CSS stay in sync. */
  useLayoutEffect(() => {
    applyBootClasses();
  }, [pathname]);

  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: bootScript }}
    />
  );
}
