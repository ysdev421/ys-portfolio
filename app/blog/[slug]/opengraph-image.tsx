import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function OGImage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const categoryColors: Record<string, string> = {
    Design: "#d9b171",
    Engineering: "#6b9de8",
    Brand: "#a87ed6",
  };

  const color = post ? (categoryColors[post.category] ?? "#d9b171") : "#d9b171";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "linear-gradient(140deg, #0a1733 0%, #123a60 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: color,
              background: `${color}22`,
              padding: "4px 14px",
              borderRadius: 999,
              border: `1px solid ${color}55`,
            }}
          >
            {post?.category ?? "BLOG"}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: post && post.title.length > 30 ? 48 : 56,
              fontWeight: 700,
              color: "#eef5ff",
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            {post?.title ?? "記事"}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 20,
              color: "rgba(238,245,255,0.7)",
              maxWidth: 800,
              lineHeight: 1.5,
            }}
          >
            {post?.summary ?? ""}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "rgba(238,245,255,0.5)",
              letterSpacing: "0.12em",
            }}
          >
            YS JOURNAL
          </div>
          <div style={{ fontSize: 15, color: "rgba(238,245,255,0.45)" }}>
            {post?.publishedAt} · {post?.readTime}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
