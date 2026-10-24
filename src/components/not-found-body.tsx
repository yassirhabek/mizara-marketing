"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dict } from "@/i18n";
import { buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type Strings = Dict["common"]["notFound"];

export function NotFoundBody({ nl, en }: { nl: Strings; en: Strings }) {
  const lang = usePathname().startsWith("/en") ? "en" : "nl";
  const t = lang === "en" ? en : nl;
  return (
    <Container size="text" className="py-28 text-center sm:py-36">
      <p className="money text-sm text-muted">404</p>
      <h1 className="display t-h2 mt-4 text-balance">{t.title}</h1>
      <p className="t-lead mx-auto mt-4 max-w-lg text-pretty text-ink-soft">{t.body}</p>
      <Link href={`/${lang}`} className={buttonClass("primary", "lg", "mt-8")}>
        {t.home}
      </Link>
    </Container>
  );
}
