import Link from "next/link";
import { products } from "@/lib/products";
import { getPosts } from "@/lib/posts";
import styles from "./page.module.css";

const entryPoints = [
  {
    title: "課題から記事を探す",
    body: "カテゴリ・タグ・検索で、今ぶつかっている課題に近い記事から読めます。",
    href: "/blog",
    cta: "ブログを見る",
  },
  {
    title: "公開中SaaSを使う",
    body: "実際に運用しているサービスへ直接アクセスして、機能や品質を確認できます。",
    href: "/products",
    cta: "SaaS一覧へ",
  },
  {
    title: "運営方針を知る",
    body: "どんな基準で記事を更新しているか、設計思想と改善履歴を公開しています。",
    href: "/about",
    cta: "Aboutへ",
  },
  {
    title: "軽く遊ぶ",
    body: "実験的なミニゲームを公開中。UIや操作感の検証を兼ねたコンテンツです。",
    href: "/game",
    cta: "Gameへ",
  },
];

export default function Home() {
  const posts = getPosts();
  const featured = posts[0];
  const latestPosts = posts.slice(1, 4);
  const liveProducts = products.filter(
    (product) => product.status === "live" && product.url,
  );

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>YS JOURNAL</p>
        <h1>設計判断と実装手順を、行動できる形で残す。</h1>
        <p className={styles.lead}>
          このサイトは「読むだけ」で終わらせないための実装メディアです。記事・SaaS・改善ログを一体で運用し、
          知見が成果に変わるまでの導線を設計しています。
        </p>
      </section>

      <section className={styles.entrySection} aria-label="目的別ナビゲーション">
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>START HERE</p>
          <h2>まず何をしたいかで選ぶ</h2>
        </div>
        <div className={styles.entryGrid}>
          {entryPoints.map((item) => (
            <Link key={item.title} href={item.href} className={styles.entryCard}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span>{item.cta}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.latestSection} aria-label="最新更新">
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>LATEST</p>
          <h2>最新の更新</h2>
        </div>
        {featured && (
          <article className={styles.featured}>
            <div className={styles.featuredMeta}>
              <span className={styles.featuredBadge}>FEATURED</span>
              <span className="cat-badge" data-category={featured.category}>
                {featured.category}
              </span>
              <span className={styles.metaDate}>{featured.publishedAt}</span>
            </div>
            <h3>{featured.title}</h3>
            <p>{featured.summary}</p>
            <Link href={`/blog/${featured.slug}`} className={styles.featuredLink}>
              記事を読む
            </Link>
          </article>
        )}
        <div className={styles.latestGrid}>
          {latestPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.latestCard}>
              <span className="cat-badge" data-category={post.category}>
                {post.category}
              </span>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.productsSection} aria-label="公開中サービス">
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>PRODUCTS</p>
          <h2>公開中のSaaS</h2>
        </div>
        <div className={styles.productGrid}>
          {liveProducts.map((product) => (
            <a
              key={product.id}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.productCard}
            >
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span>サービスを開く</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
