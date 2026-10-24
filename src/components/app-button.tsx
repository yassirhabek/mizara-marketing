"use client";

import type { ComponentProps } from "react";
import { ExternalButton } from "@/components/ui/button";
import { useAuthHint } from "@/components/use-auth-hint";

type Target = { href: string; label: string };

/** A button into the app: `guest` (usually sign-up) by default, `member` once this browser has signed in. */
export function AppButton({
  guest,
  member,
  ...style
}: { guest: Target; member: Target } & Omit<ComponentProps<typeof ExternalButton>, "href" | "children">) {
  const target = useAuthHint() ? member : guest;
  return (
    <ExternalButton href={target.href} {...style}>
      {target.label}
    </ExternalButton>
  );
}
