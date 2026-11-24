import { ImageResponse } from "next/og";

// The picture a WhatsApp, LinkedIn or X share of the link shows. Brand colours: Deep Green ground, chartreuse accent.
export const alt = "ENOS One — One Account. The Whole Internet Economy.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpengraphImage() {
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
          background: "linear-gradient(160deg, #123d32 0%, #0e3329 60%, #0a2a21 100%)",
          color: "#fff",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, letterSpacing: 6, color: "#66cb95", fontFamily: "monospace" }}>
          <div style={{ width: 40, height: 3, background: "#66cb95" }} />
          ENOS ONE · ONE ACCOUNT. EVERY RAIL.
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 100, lineHeight: 1, letterSpacing: -2, fontWeight: 700 }}>
          <span>One Account.</span>
          <span style={{ display: "flex", gap: 26 }}>
            The Whole <span style={{ color: "#d8ff32", fontStyle: "italic" }}>Internet Economy.</span>
          </span>
        </div>
        <div style={{ fontSize: 30, color: "rgba(255,255,255,0.75)", fontFamily: "sans-serif" }}>
          The dollar account for one-person companies and every business in the Global South.
        </div>
      </div>
    ),
    size,
  );
}
