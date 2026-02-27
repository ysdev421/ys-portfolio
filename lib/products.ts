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
    id: "ses-portfolio-app",
    name: "SES Portfolio App",
    description: "SES向けに実績・スキルを整理して提示できるポートフォリオサイト",
    url: "https://ses-portfolio-app.vercel.app/",
    status: "live",
  },
  {
    id: "sedori-app",
    name: "Sedori App",
    description: "仕入れと販売の収支管理を効率化するせどり支援アプリ",
    url: "https://sedori-app-xi.vercel.app/",
    status: "live",
  },
];
