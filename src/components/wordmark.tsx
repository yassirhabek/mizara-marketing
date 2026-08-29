import Link from "next/link";

export function Monogram({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Mizara"
      focusable="false"
    >
      <rect width="32" height="32" rx="7" fill="#c1592a" />
      <path
        d="M8 22V10h2.6l5.4 6.8 5.4-6.8H24v12h-2.7v-7.6l-4.6 5.8h-1.4l-4.6-5.8V22z"
        fill="#fffcf6"
      />
    </svg>
  );
}

export function Wordmark({
  href,
  tagline,
}: {
  href: string;
  tagline?: string;
}) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2.5">
      <Monogram className="h-8 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="display text-[1.35rem] tracking-tight text-carbon">
          Mizara
        </span>
        {tagline ? (
          <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted">
            {tagline}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
