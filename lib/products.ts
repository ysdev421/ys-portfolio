export type Product = {
  id: string;
  name: string;
  description: string;
  url?: string;
  status: "live" | "coming_soon";
};

export const products: Product[] = [
  {
    id: "exam-master",
    name: "Exam Master",
    description: "試験勉強をゲーム感覚で進められる学習アプリ",
    url: "https://exam-master-amber.vercel.app/",
    status: "live",
  },
  {
    id: "focus-stock",
    name: "Focus Stock",
    description: "思考を整理して在庫やタスクを一元管理する業務支援ツール",
    status: "coming_soon",
  },
  {
    id: "clip-cms",
    name: "Clip CMS",
    description: "少人数チーム向けの軽量コンテンツ管理プラットフォーム",
    status: "coming_soon",
  },
];
