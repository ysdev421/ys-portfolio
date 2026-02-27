import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "YS Journal | Craft & Product Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "linear-gradient(140deg, #0a1733 0%, #123a60 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "rgba(238,245,255,0.6)",
            marginBottom: 24,
          }}
        >
          YS JOURNAL
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#eef5ff",
            lineHeight: 1.1,
            maxWidth: 800,
          }}
        >
          美しく、読みやすく、信頼されるブログへ。
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 22,
            color: "rgba(238,245,255,0.75)",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          デザインと実務知見を両立した企業サイト品質の情報発信
        </div>
        <div
          style={{
            position: "absolute",
            top: 72,
            right: 80,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(217, 177, 113, 0.2)",
          }}
        />
      </div>
    ),
    size,
  );
}
