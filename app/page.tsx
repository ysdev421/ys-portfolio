import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>YS JOURNAL</p>
        <h1>美しく、読みやすく、信頼されるブログへ。</h1>
        <p className={styles.lead}>
          デザインの美しさと実務で使える知見を両立し、企業サイト品質の情報発信を目指します。
        </p>
        <div className={styles.actions}>
          <Link href="/blog" className={styles.primary}>
            最新記事を見る
          </Link>
          <Link href="#philosophy" className={styles.secondary}>
            編集方針
          </Link>
        </div>
      </section>

      <section className={styles.grid} id="latest">
        <article className={styles.featured}>
          <p>FEATURED</p>
          <h2>企業サイト品質のブログ設計チェックリスト 2026</h2>
          <p>
            企画、導線、可読性、運用性の4軸で、公開後も育てられるブログ設計を解説します。
          </p>
        </article>
        <article className={styles.card}>
          <p>UI SYSTEM</p>
          <h3>タイポグラフィ設計で印象の9割を決める方法</h3>
        </article>
        <article className={styles.card}>
          <p>ENGINEERING</p>
          <h3>Next.js App Routerで高速な記事ページを実装する</h3>
        </article>
        <article className={styles.card}>
          <p>BRAND</p>
          <h3>色設計を変えるだけで「安っぽさ」を消す実践手順</h3>
        </article>
      </section>

      <section className={styles.philosophy} id="philosophy">
        <h2>編集方針</h2>
        <p>
          読みやすさ、速さ、信頼性。大企業サイトの要件を個人開発でも再現できる形で、記事と実装に落とし込みます。
        </p>
      </section>
    </main>
  );
}
