import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { personalInfo } from "@/content";

/**
 * Dynamically generated Open Graph image, served at /opengraph-image.
 * Rendered at request time so it always reflects current site config — no
 * static binary to maintain. Next.js wires this into the page metadata
 * automatically.
 */
export const runtime = "edge";
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e1116",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: 16,
            background: "#f5f7fa",
            color: "#0e1116",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          LK
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#c4ccd6", fontSize: 30, marginBottom: 12 }}>
            {personalInfo.role}
          </div>
          <div
            style={{
              color: "#f5f7fa",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            {personalInfo.name}
          </div>
          <div
            style={{
              color: "#9aa4b2",
              fontSize: 32,
              marginTop: 24,
              maxWidth: 900,
            }}
          >
            {siteConfig.description}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
