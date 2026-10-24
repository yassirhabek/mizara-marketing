"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { animate } from "motion/mini";
import type { Locale } from "@/i18n/locales";
import { buttonClass } from "@/components/ui/button";
import { isActive, type NavItem } from "@/components/nav-links";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuthHint } from "@/components/use-auth-hint";

type Labels = {
  menu: string;
  close: string;
  primary: string;
  signup: string;
  login: string;
  openApp: string;
  home: string;
  language: string;
  theme: string;
};

const EASE_OUT = [0.32, 0.72, 0, 1] as const;
const EASE_IN = [0.4, 0, 1, 1] as const;

const motionOk = () => document.documentElement.classList.contains("motion-ok");

function clearMotion(el: HTMLElement) {
  el.style.removeProperty("opacity");
  el.style.removeProperty("transform");
}

function slideClose(dialog: HTMLDialogElement | null, closing: { current: boolean }) {
  if (!dialog?.open || closing.current) return;
  if (!motionOk()) {
    dialog.close();
    return;
  }
  closing.current = true;
  dialog.setAttribute("data-closing", "");
  animate(dialog, { transform: ["none", "translateX(100%)"] }, { duration: 0.3, ease: EASE_IN }).finished.then(() => dialog.close());
}

/**
 * Uses a native modal <dialog>: focus trap, Escape and an inert page come for free. Framer Motion
 * slides the panel and staggers its items; the backdrop fades in CSS (globals.css, .mz-menu).
 */
export function MobileMenu({
  lang,
  items,
  labels,
  appUrl,
  signupUrl,
  loginUrl,
}: {
  lang: Locale;
  items: NavItem[];
  labels: Labels;
  appUrl: string;
  signupUrl: string;
  loginUrl: string;
}) {
  const signedIn = useAuthHint();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  function show() {
    const dialog = dialogRef.current;
    if (!dialog) return;
    closing.current = false;
    dialog.removeAttribute("data-closing");
    dialog.showModal();
    setOpen(true);
    if (!motionOk()) return;

    animate(dialog, { transform: ["translateX(100%)", "none"] }, { duration: 0.5, ease: EASE_OUT }).finished.then(() => clearMotion(dialog));
    dialog.querySelectorAll<HTMLElement>("[data-menu-item]").forEach((el, index) => {
      el.style.opacity = "0";
      animate(el, { opacity: [0, 1], transform: ["translateX(28px)", "none"] }, { duration: 0.5, delay: 0.1 + index * 0.045, ease: EASE_OUT }).finished.then(() => clearMotion(el));
    });
  }

  const close = () => slideClose(dialogRef.current, closing);

  function onClosed() {
    const dialog = dialogRef.current;
    if (dialog) {
      clearMotion(dialog);
      dialog.removeAttribute("data-closing");
      dialog.querySelectorAll<HTMLElement>("[data-menu-item]").forEach(clearMotion);
    }
    closing.current = false;
    setOpen(false);
  }

  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      slideClose(dialogRef.current, closing);
    }
  }, [pathname]);

  const itemClass =
    "flex min-h-12 items-center justify-between rounded-xl px-3 text-lg font-medium transition-colors hover:bg-wash aria-[current=page]:text-carbon-deep dark:aria-[current=page]:text-carbon";
  const currentDot = <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-carbon" />;
  const links = [{ href: `/${lang}`, label: labels.home, current: pathname === `/${lang}` }, ...items.map((item) => ({ ...item, current: isActive(pathname, item.href) }))];

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="group inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-wash xl:hidden"
      >
        <span className="sr-only">{labels.menu}</span>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M4 8h16" className="origin-right transition-transform duration-300 ease-out [transform-box:fill-box] group-hover:scale-x-[0.6]" />
          <path d="M4 16h16" className="origin-right transition-transform duration-300 ease-out [transform-box:fill-box] group-hover:scale-x-[0.85]" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        onClose={onClosed}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        aria-label={labels.menu}
        className="mz-menu m-0 ml-auto h-dvh max-h-none w-[min(24rem,100vw)] max-w-none bg-paper p-0 text-ink shadow-float backdrop:bg-ink/30 backdrop:backdrop-blur-sm open:flex open:flex-col"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-rule px-5">
          <span className="display text-lg">Mizara</span>
          <button
            type="button"
            onClick={close}
            className="group inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-wash"
          >
            <span className="sr-only">{labels.close}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform duration-300 ease-out group-hover:rotate-90" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav aria-label={labels.primary} className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href} data-menu-item>
                <Link href={link.href} onClick={close} aria-current={link.current ? "page" : undefined} className={itemClass}>
                  {link.label}
                  {link.current ? currentDot : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="safe-bottom flex shrink-0 flex-col gap-3 border-t border-rule px-5 pt-4">
          <div data-menu-item className="flex items-center justify-between">
            <LangToggle current={lang} label={labels.language} />
            <ThemeToggle label={labels.theme} />
          </div>
          {signedIn ? (
            <a data-menu-item href={appUrl} className={buttonClass("primary", "lg", "w-full")}>
              {labels.openApp}
            </a>
          ) : (
            <>
              <a data-menu-item href={signupUrl} className={buttonClass("primary", "lg", "w-full")}>
                {labels.signup}
              </a>
              <a data-menu-item href={loginUrl} className={buttonClass("secondary", "md", "w-full")}>
                {labels.login}
              </a>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
