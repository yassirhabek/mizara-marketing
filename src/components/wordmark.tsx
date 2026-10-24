import Image from "next/image";
import Link from "next/link";

export function Mark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/brand/mark.svg"
      alt=""
      width={size}
      height={size}
      unoptimized
      priority
      className={`shrink-0 rounded-[22%] shadow-[0_1px_2px_rgba(42,33,26,0.12)] ${className}`}
    />
  );
}

export function Wordmark({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} aria-label={label} className="group inline-flex items-center gap-2.5 rounded-lg">
      <Mark />
      <span className="display text-[1.3rem] leading-none tracking-tight text-ink">Mizara</span>
    </Link>
  );
}
