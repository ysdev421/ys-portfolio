import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About | YS Journal",
  description: "YS Journalの運営者について。デザインとエンジニアリングを軸に、企業サイト品質のコンテンツ発信を目指しています。",
};

export default function AboutPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>ABOUT</p>
        <h1>このサイトについて</h1>
      </header>

      <section className={styles.profile}>
        <div className={styles.avatar} aria-hidden="true">YS</div>
        <div className={styles.bio}>
          <h2>YS（運営者）</h2>
          <p>
            デザインとエンジニアリングの両面から、読みやすく信頼されるコンテンツの設計に取り組んでいます。
            個人開発でSaaSプロダクトを複数運営しながら、その過程で得た知見をこのブログで発信しています。
          </p>
          <p>
            「企業サイト品質を個人でも実現できる」をテーマに、デザインシステム・タイポグラフィ・パフォーマンス最適化など、
            実務で役立つトピックを継続的に取り上げています。
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>専門領域</h2>
        <ul className={styles.skills}>
          <li>
            <span className={styles.skillLabel}>Design</span>
            <p>UIシステム設計、タイポグラフィ、情報設計、ブランドデザイン</p>
          </li>
          <li>
            <span className={styles.skillLabel}>Engineering</span>
            <p>Next.js / React、TypeScript、パフォーマンス最適化、SEO実装</p>
          </li>
          <li>
            <span className={styles.skillLabel}>Product</span>
            <p>SaaSプロダクト開発、ユーザー体験設計、個人開発</p>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>このサイトの方針</h2>
        <p>
          YS Journalは、個人ブログでありながら企業サイト水準のデザイン品質・情報設計・運用設計を実践する場として運営しています。
          記事は実務経験に基づいた具体的な内容を重視し、抽象論ではなく実装できる知見を提供することを心がけています。
        </p>
      </section>
    </main>
  );
}
