import type { Metadata } from "next";
import { Noto_Serif_JP, Zen_Kaku_Gothic_New } from "next/font/google";
import Link from "next/link";
import { GaPageView } from "./GaPageView";
import "./globals.css";

const zenKakuGothic = Zen_Kaku_Gothic_New({
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-serif",
  weight: ["500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YS Journal | Craft & Product Blog",
  description:
    "美しいデザインと実務的な知見を両立し、企業サイト品質を目指すブログ。",
  metadataBase: new URL("https://ys-portfolio.vercel.app"),
  openGraph: {
    title: "YS Journal | Craft & Product Blog",
    description:
      "美しいデザインと実務的な知見を両立し、企業サイト品質を目指すブログ。",
    url: "https://ys-portfolio.vercel.app",
    siteName: "YS Journal",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YS Journal | Craft & Product Blog",
    description:
      "美しいデザインと実務的な知見を両立し、企業サイト品質を目指すブログ。",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://ys-portfolio.vercel.app/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="ja">
      <body className={`${zenKakuGothic.variable} ${notoSerifJp.variable}`}>
        {gaMeasurementId ? <GaPageView measurementId={gaMeasurementId} /> : null}
        <a href="#main-content" className="skip-link">
          コンテンツへスキップ
        </a>
        <header className="site-header">
          <Link href="/" className="brand">
            YS Journal
          </Link>
          <nav className="site-nav">
            <Link href="/blog">Blog</Link>
            <Link href="/products">SaaS</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <p className="footer-copy">© {new Date().getFullYear()} YS Journal</p>
          <nav className="footer-nav" aria-label="フッターナビゲーション">
            <Link href="/blog">Blog</Link>
            <Link href="/products">SaaS</Link>
            <Link href="/about">About</Link>
            <a href="/feed.xml" aria-label="RSSフィード">RSS</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
