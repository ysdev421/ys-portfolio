import type { Metadata } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const shipporiMincho = Shippori_Mincho({
  variable: "--font-serif",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YS Journal | Craft & Product Blog",
  description:
    "思わず見とれるデザインと、実務に効く知見を両立するブログ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${zenKakuGothicNew.variable} ${shipporiMincho.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
