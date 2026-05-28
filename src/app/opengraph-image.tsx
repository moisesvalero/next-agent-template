import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#f7f7f4",
        color: "#171717",
        display: "flex",
        fontFamily: "Arial, Helvetica, sans-serif",
        height: "100%",
        justifyContent: "center",
        padding: "80px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        <div
          style={{
            color: "#0b7a55",
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Plantilla Next.js
        </div>
        <div
          style={{
            fontSize: "86px",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
            maxWidth: "900px",
          }}
        >
          Webs con agentes desde el minuto uno.
        </div>
        <div
          style={{
            color: "#4b4b45",
            fontSize: "34px",
            lineHeight: 1.3,
            maxWidth: "820px",
          }}
        >
          SEO, shadcn, Supabase, Sanity, tests y CI preparados.
        </div>
      </div>
    </div>,
    size,
  );
}
