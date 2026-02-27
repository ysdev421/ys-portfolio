export type Post = {
  slug: string;
  title: string;
  summary: string;
  category: "Design" | "Engineering" | "Brand";
  publishedAt: string;
  readTime: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "enterprise-blog-checklist-2026",
    title: "企業サイト品質のブログ設計チェックリスト 2026",
    summary:
      "情報設計、デザイン、運用の三位一体で、長期運用できるブログを設計するための実践ガイド。",
    category: "Design",
    publishedAt: "2026-02-27",
    readTime: "8 min",
    body: [
      "企業品質のブログは、見た目だけでなく運用設計まで含めて評価されます。",
      "特に重要なのは、記事テンプレートの統一、CTA導線の明確化、そして公開後の改善サイクルです。",
      "本記事では、初期構築時に決めておくべき設計項目をチェックリスト形式で整理します。",
    ],
  },
  {
    slug: "typography-system-for-trust",
    title: "信頼感を生むタイポグラフィ設計の基本",
    summary: "フォント、余白、行間の最適化で、読み続けても疲れない記事体験を実現する。",
    category: "Brand",
    publishedAt: "2026-02-20",
    readTime: "6 min",
    body: [
      "タイポグラフィはブランド印象の基盤です。",
      "見出しと本文のコントラストを明確にし、リズムのある余白設計を行うことで可読性が高まります。",
    ],
  },
  {
    slug: "nextjs-performance-patterns",
    title: "Next.jsで記事ページを高速化する実装パターン",
    summary: "静的生成とキャッシュ戦略を組み合わせ、安定した高速配信を実現する。",
    category: "Engineering",
    publishedAt: "2026-02-12",
    readTime: "7 min",
    body: [
      "高速化はSEOと読了率の両方に効く、最重要テーマです。",
      "画像最適化、レンダリング戦略、メタデータ管理を組み合わせて改善を積み上げます。",
    ],
  },
];

export function getPosts() {
  return [...posts].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0,
  );
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
