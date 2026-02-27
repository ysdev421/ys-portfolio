import type { Metadata } from "next";
import { Murecho, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const murecho = Murecho({
  variable: "--font-serif",
  weight: ["500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YS Journal | Craft & Product Blog",
  description:
    "美しいデザインと実務的な知見を両立し、企業サイト品質を目指すブログ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.variable} ${murecho.variable}`}>
        {children}
      </body>
    </html>
  );
}
