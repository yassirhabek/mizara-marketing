import type { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { getDict } from "@/i18n";
import { siteUrl } from "@/lib/env";
import { PUBLIC_PATHS, localePath } from "@/lib/routes";

const priority = (path: string) => {
  if (path === "") return 1;
  if (path === "/demo" || path === "/prijzen" || path.startsWith("/functies")) return 0.8;
  if (path.startsWith("/kennisbank")) return 0.7;
  if (path === "/privacy" || path === "/terms") return 0.2;
  return 0.6;
};

/** Every public page in both languages, each with its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const reviewed = new Date(getDict("nl").kb.reviewed);
  return locales.flatMap((lang) =>
    PUBLIC_PATHS.map((path) => ({
      url: `${siteUrl}${localePath(lang, path)}`,
      lastModified: reviewed,
      changeFrequency: path.startsWith("/kennisbank") ? ("monthly" as const) : ("weekly" as const),
      priority: priority(path),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}${localePath(l, path)}`])),
          "x-default": `${siteUrl}${localePath("nl", path)}`,
        },
      },
    })),
  );
}
