export type Recommendation = {
  id: string;
  title: string;
  description: string;
  url: string;
};

export const recommendations: Recommendation[] = [
  {
    id: "vercel-blog",
    title: "Vercel Blog",
    description: "WebパフォーマンスやNext.js運用の一次情報を追える公式ブログ。",
    url: "https://vercel.com/blog",
  },
  {
    id: "stripe-resources",
    title: "Stripe Resources",
    description: "SaaSの決済・課金設計を実務視点で学べるドキュメント集。",
    url: "https://stripe.com/resources/more",
  },
  {
    id: "web-dev",
    title: "web.dev",
    description: "Core Web VitalsやUX改善のベストプラクティスを網羅。",
    url: "https://web.dev/",
  },
];

