import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDict, isLocale, locales } from "@/i18n";

export const alt = "Mizara";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDict(isLocale(lang) ? lang : "nl");
  const mark = await readFile(join(process.cwd(), "public/brand/mark.svg"));
  const markSrc = `data:image/svg+xml;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #faf5ec 0%, #f3e9da 100%)",
          color: "#2a211a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <img src={markSrc} width={64} height={64} alt="" />
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em" }}>Mizara</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.035em" }}>{t.home.hero.line1}</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.035em", color: "#c1592a" }}>{t.home.hero.line2}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 26, color: "#776658" }}>
          <div>{t.common.footer.tagline}</div>
          <div style={{ display: "flex", padding: "8px 18px", borderRadius: 999, border: "2px solid #b23a2e", color: "#b23a2e", fontSize: 20, fontWeight: 700, letterSpacing: "0.12em" }}>
            {t.ui.reserveBadge.toUpperCase()}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
