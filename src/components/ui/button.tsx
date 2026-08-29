"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, easeTransition } from "@/components/motion";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-carbon text-white hover:bg-carbon-deep",
  secondary:
    "border border-rule bg-card text-ink hover:border-carbon hover:text-carbon",
  ghost: "text-muted hover:text-ink",
};

const base =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50";

const MotionLink = motion.create(Link);

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
> & { variant?: Variant };

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      {...props}
      whileHover={reduce ? undefined : { y: -1 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={easeTransition(reduce, DURATION.fast)}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <MotionLink
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      whileHover={reduce ? undefined : { y: -1 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={easeTransition(reduce, DURATION.fast)}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </MotionLink>
  );
}
