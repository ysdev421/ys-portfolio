import { products } from "@/lib/products";
import styles from "./page.module.css";

export default function ProductsPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>PRODUCTS</p>
        <h1>SaaS一覧</h1>
        <p>運営中のサービスへ直接アクセスできます。</p>
      </header>

      <section className={styles.grid}>
        {products.map((product) => (
          <article
            key={product.id}
            className={`${styles.card} ${product.status === "coming_soon" ? styles.cardSoon : ""}`}
          >
            <div className={styles.cardTop}>
              <h2>{product.name}</h2>
              <span
                className={
                  product.status === "live" ? styles.liveBadge : styles.soonBadge
                }
              >
                {product.status === "live" ? "● LIVE" : "準備中"}
              </span>
            </div>
            <p>{product.description}</p>
            {product.status === "live" && product.url ? (
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                サービスを開く
              </a>
            ) : (
              <span className={styles.comingSoon}>近日公開予定</span>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
