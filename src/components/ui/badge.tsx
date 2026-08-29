type Tone = "default" | "carbon" | "paid" | "fiscal";

const tones: Record<Tone, string> = {
  default: "bg-wash text-muted",
  carbon: "bg-carbon/10 text-carbon",
  paid: "bg-paid/10 text-paid",
  fiscal: "bg-fiscal/10 text-fiscal",
};

export function Badge({
  children,
  tone = "default",
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
