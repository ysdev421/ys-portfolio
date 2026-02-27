export type Product = {
  id: string;
  name: string;
  description: string;
  url: string;
};

export const products: Product[] = [
  {
    id: "exam-master",
    name: "Exam Master",
    description: "試験勉強をゲーム感覚で進められる学習アプリ",
    url: "https://exam-master-amber.vercel.app/",
  },
];

