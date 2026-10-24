"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Shows the bar after the first screen and hides it once the footer is in view. */
export function MobileCtaReveal({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const pathname = usePathname();
  const onDemo = pathname.endsWith("/demo");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const footer = document.getElementById("site-footer");
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
    if (footer) observer.observe(footer);
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const visible = scrolled && !footerVisible && !onDemo;

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 transition-[transform,opacity] duration-300 ease-out sm:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
