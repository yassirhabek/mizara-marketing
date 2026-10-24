import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { NotFoundBody } from "@/components/not-found-body";

export const metadata: Metadata = { title: "404", robots: { index: false } };

export default function NotFound() {
  return <NotFoundBody nl={getDict("nl").common.notFound} en={getDict("en").common.notFound} />;
}
