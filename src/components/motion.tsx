"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

export const paperEase = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.18,
  step: 0.3,
  normal: 0.35,
  reveal: 0.38,
  item: 0.4,
  slow: 0.45,
} as const;

export function easeTransition(
  reduce: boolean | null,
  duration: number,
  extra?: Record<string, unknown>,
) {
  return reduce ? { duration: 0 } : { duration, ease: paperEase, ...extra };
}

export function fadeUp(reduce: boolean | null): Variants {
  if (reduce) {
    return { hidden: { opacity: 1 }, show: { opacity: 1 } };
  }
  return {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.slow, ease: paperEase },
    },
  };
}

export function stagger(reduce: boolean | null, delay = 0.06): Variants {
  return {
    hidden: {},
    show: {
      transition: reduce
        ? { duration: 0 }
        : { staggerChildren: delay, delayChildren: 0.04 },
    },
  };
}

/** Reveals its children once when scrolled into view. */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      variants={fadeUp(reduce)}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0.07,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      variants={stagger(reduce, delay)}
    >
      {children}
    </motion.div>
  );
}

export function FadeItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={fadeUp(reduce)}>
      {children}
    </motion.div>
  );
}
