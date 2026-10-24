import type { GsapKit } from "@/lib/gsap";
import { COMPACT, DESKTOP } from "@/lib/gsap";
import { formatEuro, formatEuroWhole } from "@/lib/money";
import { isLocale } from "@/i18n/locales";

type Ctx = GsapKit & { root: HTMLElement; mm: gsap.MatchMedia };
export type ActName = "hero" | "breakdown" | "unify" | "enter" | "reveal";

const all = (root: Element, selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));
const one = (root: Element, selector: string) => root.querySelector<HTMLElement>(selector);

/** Scrubbed reveal of headings and leads, reversible on scroll-up. */
function revealCopy({ gsap, root }: Ctx, priority: number) {
  const items = all(root, "[data-m=title], [data-m=lead]");
  if (!items.length) return;
  gsap.fromTo(
    items,
    { opacity: 0.001, y: 28 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: { trigger: items[0], start: "top 88%", end: "top 55%", scrub: 0.6, refreshPriority: priority },
    },
  );
}

function hero({ gsap, root }: Ctx) {
  const path = one(root, "[data-m=underline] path");
  const enter = all(root, "[data-enter]:not([data-m])");
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
  if (path) tl.fromTo(path, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 0.25);
  tl.fromTo(enter, { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.09 }, 0.05)
    .fromTo(all(root, "[data-m=hero-tag]"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
    .fromTo(all(root, "[data-m=hero-invoice]"), { opacity: 0, y: 48, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 1.15 }, 0.2)
    .fromTo(all(root, "[data-m=hero-envelope]"), { opacity: 0, y: 70, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.15 }, 0.45);

  const stamp = one(root, "[data-m=hero-envelope] [data-m=stamp]");
  if (stamp) tl.fromTo(stamp, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.2)" }, 1.15);
}

function counterWriter(el: HTMLElement | null, whole = false) {
  const lang = el?.dataset.lang;
  const locale = isLocale(lang) ? lang : "nl";
  const fmt = whole ? formatEuroWhole : formatEuro;
  return (cents: number) => {
    if (el) el.textContent = fmt(Math.round(cents), locale);
  };
}

function breakdown(ctx: Ctx) {
  const { gsap, root, mm } = ctx;
  const section = one(root, "section");
  const ledger = one(root, "[data-m=ledger]");
  const rows = all(root, "[data-m=row]");
  const segs = all(root, "[data-m=seg]");
  const counter = one(root, "[data-m=counter]");
  const steps = (counter?.dataset.steps ?? "").split(",").map(Number);
  const write = counterWriter(counter);
  if (!section || !ledger || rows.length < 5 || segs.length < 3 || steps.length < 3) return;

  mm.add(DESKTOP, () => {
    gsap.fromTo(
      all(root, "[data-m=title], [data-m=lead], [data-m=why]"),
      { opacity: 0.001, y: 32 },
      { opacity: 1, y: 0, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 80%", end: "top 20%", scrub: 0.6, refreshPriority: 30 } },
    );

    const value = { cents: steps[0] };
    write(value.cents);
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 1 },
      onUpdate: () => write(value.cents),
      scrollTrigger: {
        trigger: section,
        start: () => (section.offsetHeight > window.innerHeight ? "bottom bottom" : "top top"),
        end: "+=160%",
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: 30,
      },
    });
    tl.fromTo(rows, { opacity: 0.12, x: 28 }, { opacity: 1, x: 0, stagger: 1, duration: 0.8 }, 0)
      .fromTo(value, { cents: steps[0] }, { cents: steps[1], duration: 0.8, lazy: false }, 1)
      .fromTo(segs[0], { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, 1)
      .fromTo(value, { cents: steps[1] }, { cents: steps[2], duration: 0.8, immediateRender: false, lazy: false }, 3)
      .fromTo(segs[1], { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, 3)
      .fromTo(segs[2], { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, 4)
      .to({}, { duration: 0.6 });
    return () => write(steps[2]);
  });

  mm.add(COMPACT, () => {
    revealCopy(ctx, 30);
    rows.forEach((row) =>
      gsap.fromTo(row, { opacity: 0.15, y: 14 }, { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: row, start: "top 92%", end: "top 70%", scrub: 0.4 } }),
    );
    gsap.fromTo(segs, { scaleX: 0 }, { scaleX: 1, stagger: 0.2, ease: "none", scrollTrigger: { trigger: ledger, start: "top 85%", end: "top 45%", scrub: 0.5 } });
  });
}

const SCATTER = [
  { x: -360, y: 230, rotation: -14 },
  { x: -120, y: 400, rotation: 8 },
  { x: 160, y: 330, rotation: -6 },
  { x: 390, y: 190, rotation: 12 },
];

function unify(ctx: Ctx) {
  const { gsap, root, mm } = ctx;
  const frags = all(root, "[data-m=frag]");
  const dash = one(root, "[data-m=dash]");
  if (!dash) return;

  mm.add(DESKTOP, () => {
    revealCopy(ctx, 20);
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      scrollTrigger: { trigger: frags[0] ?? dash, start: "top 95%", end: () => `+=${Math.round(window.innerHeight * 0.75)}`, scrub: 0.8, invalidateOnRefresh: true, refreshPriority: 20 },
    });
    frags.forEach((frag, index) => {
      const from = SCATTER[index % SCATTER.length];
      tl.fromTo(frag, { ...from, scale: 1.12 }, { x: 0, y: 0, rotation: 0, scale: 1, duration: 1 }, index * 0.08);
    });
    tl.fromTo(dash, { opacity: 0.25, scale: 0.86, y: 90 }, { opacity: 1, scale: 1, y: 0, duration: 1.1 }, 0.15).to({}, { duration: 0.35 });
  });

  mm.add(COMPACT, () => {
    revealCopy(ctx, 20);
    gsap.fromTo(frags, { opacity: 0, y: 24, rotation: (i: number) => (i % 2 ? 4 : -4) }, { opacity: 1, y: 0, rotation: 0, stagger: 0.12, ease: "none", scrollTrigger: { trigger: frags[0] ?? dash, start: "top 92%", end: "top 60%", scrub: 0.5 } });
    gsap.fromTo(dash, { opacity: 0.3, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, ease: "none", scrollTrigger: { trigger: dash, start: "top 95%", end: "top 55%", scrub: 0.5 } });
  });
}

function enter(ctx: Ctx) {
  const { gsap, root, mm } = ctx;
  const frame = one(root, "[data-m=frame]");
  if (!frame) return;
  mm.add(DESKTOP, () => {
    revealCopy(ctx, 10);
    gsap.fromTo(
      frame,
      { rotateX: 26, scale: 0.84, y: 60, opacity: 0.6 },
      { rotateX: 0, scale: 1, y: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: frame, start: "top 98%", end: "top 18%", scrub: 0.6, refreshPriority: 10 } },
    );
  });
  mm.add(COMPACT, () => {
    revealCopy(ctx, 10);
    gsap.fromTo(
      frame,
      { rotateX: 14, scale: 0.94, y: 30 },
      { rotateX: 0, scale: 1, y: 0, ease: "none", scrollTrigger: { trigger: frame, start: "top 100%", end: "top 45%", scrub: 0.5, refreshPriority: 10 } },
    );
  });
}

function reveal(ctx: Ctx) {
  const { gsap, root } = ctx;
  const envelope = one(root, "[data-m=envelope]");
  const count = one(root, "[data-m=count]");
  const stamp = one(root, "[data-m=envelope] [data-m=stamp]");
  if (!envelope) return;
  revealCopy(ctx, 0);

  const steps = all(root, "[data-m=step]");
  if (steps.length) {
    gsap.fromTo(steps, { opacity: 0.001, x: -14 }, { opacity: 1, x: 0, stagger: 0.15, ease: "none", scrollTrigger: { trigger: steps[0], start: "top 90%", end: "top 55%", scrub: 0.5 } });
  }

  const target = Number(count?.dataset.to ?? 0);
  const write = counterWriter(count, true);
  const value = { cents: 0 };
  const tl = gsap.timeline({ scrollTrigger: { trigger: envelope, start: "top 88%", end: "center 52%", scrub: 0.6 } });
  tl.fromTo(envelope, { y: 50, scale: 0.97 }, { y: 0, scale: 1, ease: "power2.out", duration: 1 }, 0).fromTo(
    value,
    { cents: 0 },
    { cents: target, ease: "power1.out", duration: 1, onUpdate: () => write(value.cents) },
    0,
  );
  if (stamp) tl.fromTo(stamp, { scale: 1.9, opacity: 0 }, { scale: 1, opacity: 1, ease: "back.out(2)", duration: 0.35 }, 0.75);
}

export const ACTS: Record<ActName, (ctx: Ctx) => void> = { hero, breakdown, unify, enter, reveal };
