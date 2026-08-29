import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { defaultLocale, isLocale } from "@/i18n";

// The proxy normally redirects "/" to a locale before this renders; this is a fallback.
export default async function RootPage() {
  const cookieLocale = (await cookies()).get("locale")?.value;
  if (isLocale(cookieLocale)) redirect(`/${cookieLocale}`);

  const accept = (await headers()).get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const tag = part.split(";")[0]?.trim().slice(0, 2).toLowerCase();
    if (isLocale(tag)) redirect(`/${tag}`);
  }
  redirect(`/${defaultLocale}`);
}
