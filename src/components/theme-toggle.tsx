"use client";

import { useTheme } from "next-themes";

export function ThemeToggle({ label }: { label: string }) {
  const { setTheme } = useTheme();

  function toggle() {
    const isDark =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-rule bg-card text-muted transition-colors hover:border-carbon hover:text-carbon"
    >
      {/* moon — shown in light mode (click to go dark) */}
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      {/* sun — shown in dark mode (click to go light) */}
      <svg
        viewBox="0 0 24 24"
        className="hidden h-[18px] w-[18px] dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
