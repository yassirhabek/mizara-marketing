"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DURATION, easeTransition } from "@/components/motion";
import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n";

type State = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm({
  locale,
  copy,
  variant = "onLight",
  id,
}: {
  locale: Locale;
  copy: Dict["form"];
  variant?: "onLight" | "onCarbon";
  id?: string;
}) {
  const reduce = useReducedMotion();
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string>("");
  const utmRef = useRef<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      utmRef.current = window.location.search.replace(/^\?/, "").slice(0, 400);
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "");

    if (!EMAIL_RE.test(email)) {
      setState("error");
      setError(copy.errorEmail);
      return;
    }

    setState("submitting");
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          locale,
          company,
          utm: utmRef.current || undefined,
        }),
      });

      if (res.ok) {
        setState("success");
        return;
      }
      if (res.status === 429) {
        setState("error");
        setError(copy.errorRate);
        return;
      }
      setState("error");
      setError(copy.errorGeneric);
    } catch {
      setState("error");
      setError(copy.errorGeneric);
    }
  }

  const onCarbon = variant === "onCarbon";
  const inputClass = onCarbon
    ? "w-full min-h-11 rounded-lg border border-white/25 bg-white/10 px-3 py-2.5 text-base text-white placeholder:text-white/60 focus:border-white focus:shadow-[0_0_0_3px_rgba(255,255,255,0.2)] focus:outline-none"
    : "w-full min-h-11 rounded-lg border border-rule bg-card px-3 py-2.5 text-base text-ink placeholder:text-muted transition-[border-color,box-shadow] focus:border-carbon focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--carbon)_14%,transparent)] focus:outline-none";
  const submitClass = onCarbon
    ? "inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-carbon hover:bg-white/90 disabled:opacity-60"
    : "inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-carbon px-4 py-2.5 text-sm font-medium text-white hover:bg-carbon-deep disabled:opacity-60";

  return (
    <div id={id} className="w-full max-w-md scroll-mt-24">
      <AnimatePresence mode="wait" initial={false}>
        {state === "success" ? (
          <motion.div
            key="success"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={easeTransition(reduce, DURATION.normal)}
            className={
              onCarbon
                ? "flex items-start gap-3 rounded-lg border border-white/25 bg-white/10 px-4 py-3.5 text-sm text-white"
                : "panel flex items-start gap-3 px-4 py-3.5 text-sm"
            }
            role="status"
          >
            <svg
              viewBox="0 0 24 24"
              className={`mt-0.5 h-5 w-5 shrink-0 ${onCarbon ? "text-white" : "text-paid"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span>
              <strong className="font-semibold">{copy.successTitle}</strong>{" "}
              <span className={onCarbon ? "text-white/80" : "text-muted"}>
                {copy.successBody}
              </span>
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={false}
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-2 sm:flex-row"
          >
            <div
              aria-hidden="true"
              className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
            >
              <label>
                Company
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            <label className="sr-only" htmlFor={`${id ?? "wl"}-email`}>
              {copy.emailLabel}
            </label>
            <input
              id={`${id ?? "wl"}-email`}
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={copy.emailPlaceholder}
              className={inputClass}
              disabled={state === "submitting"}
            />
            <button
              type="submit"
              className={submitClass}
              disabled={state === "submitting"}
            >
              {state === "submitting" ? copy.submitting : copy.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {state === "error" && error ? (
        <p
          className={`mt-2 text-sm ${onCarbon ? "text-white" : "text-fiscal"}`}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
