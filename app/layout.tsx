import type { Metadata } from "next";
import { Murecho, Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.variable} ${murecho.variable}`}>
        <header className="site-header">
          <Link href="/" className="brand">
            YS Journal
          </Link>
          <nav className="site-nav">
            <Link href="/blog">Blog</Link>
            <Link href="/products">SaaS</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <p>更新情報を受け取りたい方は購読してください。</p>
          <a href="mailto:hello@example.com?subject=YS%20Journal%20購読希望">
            購読を申し込む
          </a>
        </footer>
      </body>
    </html>
  );
}
