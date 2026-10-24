import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";

/** Crawlers that index pages for search results, including AI answer engines that cite sources. */
const SEARCH_CRAWLERS = ["Googlebot", "Bingbot", "DuckDuckBot", "Applebot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Claude-SearchBot", "Claude-User"];

/** Crawlers that collect text to train models. Kept as a separate group so the policy is one switch. */
const TRAINING_CRAWLERS = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot", "meta-externalagent", "Bytespider"];

/** Public marketing copy: allowing training is a publishing choice, not a technical one. */
const ALLOW_MODEL_TRAINING = true;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: SEARCH_CRAWLERS, allow: "/" },
      ALLOW_MODEL_TRAINING ? { userAgent: TRAINING_CRAWLERS, allow: "/" } : { userAgent: TRAINING_CRAWLERS, disallow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
