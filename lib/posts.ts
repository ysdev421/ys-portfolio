export type Section = {
  heading: string;
  paras: string[];
};

export type Post = {
  slug: string;
  title: string;
  summary: string;
  category: "Design" | "Engineering" | "Brand";
  tags: string[];
  publishedAt: string;
  readTime: string;
  sections: Section[];
};

export const posts: Post[] = [
  {
    slug: "enterprise-blog-checklist-2026",
    title: "企業サイト品質のブログ設計チェックリスト 2026",
    summary:
      "情報設計、デザイン、運用の三位一体で、長期運用できるブログを設計するための実践ガイド。",
    category: "Design",
    tags: ["情報設計", "UX", "CTA", "運用"],
    publishedAt: "2026-02-27",
    readTime: "8 min",
    sections: [
      {
        heading: "最初に決めるべきこと",
        paras: [
          "企業品質のブログは、見た目だけでなく運用設計まで含めて評価されます。",
          "記事テンプレート、カテゴリ設計、CTA導線を先に定義しておくことで、公開後の改善が安定します。",
        ],
      },
      {
        heading: "CTA設計",
        paras: [
          "CTAは記事の最後だけでなく、本文中にも自然に配置するのが有効です。",
          "SaaS導線、購読、問い合わせの3種類を用意し、ユーザーの温度感に合わせて選べる構成にします。",
        ],
      },
    ],
  },
  {
    slug: "typography-system-for-trust",
    title: "信頼感を生むタイポグラフィ設計の基本",
    summary: "フォント、余白、行間の最適化で、読み続けても疲れない記事体験を実現する。",
    category: "Brand",
    tags: ["タイポグラフィ", "可読性", "余白"],
    publishedAt: "2026-02-20",
    readTime: "6 min",
    sections: [
      {
        heading: "読みやすさは設計できる",
        paras: [
          "本文の行間は1.8前後、1行の文字数は35〜45字を基準にすると安定します。",
          "見出しと本文のコントラストを意図的に作ることで、読了率が改善します。",
        ],
      },
    ],
  },
  {
    slug: "nextjs-performance-patterns",
    title: "Next.jsで記事ページを高速化する実装パターン",
    summary: "静的生成とキャッシュ戦略を組み合わせ、安定した高速配信を実現する。",
    category: "Engineering",
    tags: ["Next.js", "SSG", "Performance"],
    publishedAt: "2026-02-12",
    readTime: "7 min",
    sections: [
      {
        heading: "静的生成を基本にする",
        paras: [
          "記事ページは可能な限り静的生成し、TTFBの安定化を優先します。",
          "更新頻度に応じて再生成タイミングを調整し、運用コストとのバランスを取ります。",
        ],
      },
    ],
  },
  {
    slug: "saas-monetization-roadmap",
    title: "個人開発SaaSの収益化ロードマップ",
    summary: "課題検証から価格設計まで、実行順序が分かる収益化の実践ガイド。",
    category: "Brand",
    tags: ["SaaS", "収益化", "MVP"],
    publishedAt: "2026-02-07",
    readTime: "9 min",
    sections: [
      {
        heading: "MVP前にやる検証",
        paras: [
          "実装前に5〜10人の想定ユーザーへ課題ヒアリングを行い、検証軸を定義します。",
          "課題の深さと支払い意欲を同時に確認すると、優先順位の判断が早くなります。",
        ],
      },
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

export function getRelatedPosts(slug: string, limit = 2) {
  const current = getPostBySlug(slug);
  if (!current) {
    return [];
  }

  return getPosts()
    .filter((post) => post.slug !== current.slug)
    .map((post) => {
      const sharedTagCount = post.tags.filter((tag) =>
        current.tags.includes(tag),
      ).length;
      const sameCategoryBonus = post.category === current.category ? 2 : 0;
      const recencyBonus =
        Date.parse(post.publishedAt) > Date.parse(current.publishedAt) ? 1 : 0;
      return {
        post,
        score: sharedTagCount * 3 + sameCategoryBonus + recencyBonus,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return Date.parse(b.post.publishedAt) - Date.parse(a.post.publishedAt);
    })
    .slice(0, limit)
    .map((item) => item.post);
}
