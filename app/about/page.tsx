import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About | YS Journal",
  description:
    "YS Journalの運営者プロフィール。デザインとエンジニアリングの視点で、企業サイト品質の情報発信を行っています。",
};

const links = [
  {
    label: "GitHub",
    value: "@ysdev421",
    href: "https://github.com/ysdev421",
  },
  {
    label: "X",
    value: "@your_account",
    href: "https://x.com/",
  },
  {
    label: "Contact",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>ABOUT</p>
        <h1>このサイトについて</h1>
      </header>

      <section className={styles.profile}>
        <div className={styles.avatar} aria-hidden="true">
          YS
        </div>
        <div className={styles.bio}>
          <h2>YS / Developer & Designer</h2>
          <p>
            デザインとエンジニアリングの中間から、読みやすく成果につながるコンテンツを発信しています。
            個人開発でSaaSを運用しながら、UI設計・実装・改善を継続しています。
          </p>
          <p>
            YS Journalでは、企業サイト品質を個人開発でも再現できるように、設計判断と実装手順を具体的に共有します。
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>実績と得意領域</h2>
        <ul className={styles.skills}>
          <li>
            <span className={styles.skillLabel}>Design</span>
            <p>UIシステム設計、タイポグラフィ、情報設計、ブランド設計</p>
          </li>
          <li>
            <span className={styles.skillLabel}>Engineering</span>
            <p>Next.js / React / TypeScript、パフォーマンス最適化、SEO実装</p>
          </li>
          <li>
            <span className={styles.skillLabel}>Product</span>
            <p>SaaSの企画、MVP構築、継続改善（PDCA）</p>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>外部リンク</h2>
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <span>{link.label}</span>
                <strong>{link.value}</strong>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>運営方針</h2>
        <p>
          情報の見やすさ、技術的な再現性、運用し続けられる構成を重視しています。記事は公開後も改善を重ね、
          実務で使える形に磨き続けます。
        </p>
      </section>
    </main>
  );
}
