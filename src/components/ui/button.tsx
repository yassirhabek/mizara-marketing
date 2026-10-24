import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary:
    "bg-carbon text-[#fffcf6] shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_6px_16px_-6px_color-mix(in_srgb,var(--carbon)_70%,transparent)] hover:bg-carbon-deep dark:text-[#1c1712] dark:hover:bg-[#eb9a5c]",
  secondary:
    "border border-rule bg-card text-ink shadow-lift hover:border-carbon/50 hover:text-carbon-deep dark:hover:text-carbon",
  ghost: "text-ink hover:bg-wash",
};

const sizes: Record<Size, string> = {
  md: "px-5 text-[0.95rem]",
  lg: "min-h-13 px-7 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

type LinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
};

export function ButtonLink({ variant = "primary", size = "md", arrow, className = "", children, ...props }: LinkProps) {
  return (
    <Link {...props} className={buttonClass(variant, size, className)}>
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

/** For URLs outside this site (the app). Plain anchor, so no client router prefetch. */
export function ExternalButton({
  href,
  variant = "primary",
  size = "md",
  arrow,
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={buttonClass(variant, size, className)}>
      {children}
      {arrow ? <Arrow /> : null}
    </a>
  );
}
