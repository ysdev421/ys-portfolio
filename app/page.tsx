import Link from "next/link";
import { products } from "@/lib/products";
import { getPosts } from "@/lib/posts";
import styles from "./page.module.css";

export default function Home() {
  const posts = getPosts();
  const featured = posts[0];
  const latestCards = posts.slice(1, 3);

  return (
    <main id="main-content" className={styles.page}>
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
          <Link href="/products" className={styles.secondary}>
            SaaS一覧
          </Link>
          <Link href="#philosophy" className={styles.secondary}>
            編集方針
          </Link>
        </div>
      </section>

      <section className={styles.grid} id="latest">
        {featured && (
          <article className={styles.featured}>
            <div className={styles.featuredMeta}>
              <span className={styles.featuredBadge}>FEATURED</span>
              <span className="cat-badge" data-category={featured.category}>
                {featured.category}
              </span>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.summary}</p>
            <Link href={`/blog/${featured.slug}`} className={styles.featuredLink}>
              続きを読む
            </Link>
          </article>
        )}
        {latestCards.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
            <span className="cat-badge" data-category={post.category}>
              {post.category}
            </span>
            <h3>{post.title}</h3>
          </Link>
        ))}
      </section>

      <section className={styles.philosophy} id="philosophy">
        <h2>編集方針</h2>
        <p>
          読みやすさ、速さ、信頼性。大企業サイトの要件を個人開発でも再現できる形で、記事と実装に落とし込みます。
        </p>
      </section>

      <section className={styles.newsletter}>
        <div>
          <h2>更新情報を受け取る</h2>
          <p>デザイン・エンジニアリング・SaaSに関する新着記事をメールでお知らせします。</p>
        </div>
        <a
          href="mailto:hello@example.com?subject=YS%20Journal%20購読希望"
          className={styles.newsletterBtn}
        >
          購読を申し込む
        </a>
      </section>

      <section className={styles.products} id="products">
        <h2>SaaS</h2>
        <div className={styles.productGrid}>
          {products.map((product) =>
            product.status === "live" && product.url ? (
              <a
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.productCard}
              >
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span>サービスを見る</span>
              </a>
            ) : (
              <div key={product.id} className={`${styles.productCard} ${styles.productCardSoon}`}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className={styles.comingSoon}>公開準備中</span>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}
