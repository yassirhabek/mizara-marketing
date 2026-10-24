"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { href: string; label: string };

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3.5 text-[0.95rem] font-medium transition-colors ${
                active ? "text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
              {active ? (
                <span aria-hidden="true" className="absolute inset-x-3.5 bottom-2 h-0.5 rounded-full bg-carbon" />
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
