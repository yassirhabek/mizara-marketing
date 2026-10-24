"use client";

import { ExternalButton } from "@/components/ui/button";
import { useAuthHint } from "@/components/use-auth-hint";

export function HeaderAuthCtas({
  labels,
  appUrl,
  loginUrl,
  signupUrl,
}: {
  labels: { login: string; signup: string; openApp: string };
  appUrl: string;
  loginUrl: string;
  signupUrl: string;
}) {
  const signedIn = useAuthHint();

  if (signedIn) {
    return (
      <div className="hidden min-[360px]:block">
        <ExternalButton href={appUrl}>{labels.openApp}</ExternalButton>
      </div>
    );
  }

  return (
    <>
      <a
        href={loginUrl}
        className="hidden min-h-11 items-center rounded-full px-4 text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-ink md:inline-flex"
      >
        {labels.login}
      </a>
      <div className="hidden min-[360px]:block">
        <ExternalButton href={signupUrl}>{labels.signup}</ExternalButton>
      </div>
    </>
  );
}
