"use client";

import { useSyncExternalStore } from "react";
import { hasAuthHint } from "@/lib/auth-hint";

const subscribe = () => () => {};

/** Pages are static, so the server always renders the signed-out CTAs; the client swaps after hydration. */
export function useAuthHint(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => hasAuthHint(document.cookie),
    () => false,
  );
}
