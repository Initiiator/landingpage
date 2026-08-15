import { ImageResponse } from "next/og";

/* On-brand Open Graph / social-share image (1200×630), generated at build time.
   Shown when an initiiator link is shared on WhatsApp, iMessage, X, LinkedIn… */

export const alt = "initiiator: real connections, nearby";
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
          padding: "100px",
          background: "linear-gradient(135deg, #ff6000 0%, #ff5a00 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 600, opacity: 0.9, marginBottom: 24 }}>
          initiiator
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: 900 }}>
          Real connections, right where you are.
        </div>
        <div style={{ display: "flex", fontSize: 36, opacity: 0.92, marginTop: 32, maxWidth: 880, lineHeight: 1.3 }}>
          Find people nearby who&apos;d actually get along with you, then meet them in real life.
        </div>
      </div>
    ),
    { ...size },
  );
}
