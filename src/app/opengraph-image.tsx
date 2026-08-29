import { ImageResponse } from "next/og";

export const alt = "Mizara — ZZP-boekhouding";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#faf5ec",
          color: "#2a211a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "16px",
              background: "#c1592a",
              color: "#fffcf6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "52px",
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ fontSize: "44px", fontWeight: 700, color: "#c1592a" }}>
            Mizara
          </div>
        </div>
        <div
          style={{
            marginTop: "48px",
            fontSize: "68px",
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          Je belastingpotje, altijd up-to-date.
        </div>
        <div style={{ marginTop: "28px", fontSize: "30px", color: "#776658" }}>
          Boekhouding voor Nederlandse zzp&#39;ers · private bèta
        </div>
      </div>
    ),
    size,
  );
}
