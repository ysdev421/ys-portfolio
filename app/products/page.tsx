import { products } from "@/lib/products";
import styles from "./page.module.css";

export default function ProductsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>PRODUCTS</p>
        <h1>SaaS一覧</h1>
        <p>運営中のサービスへ直接アクセスできます。</p>
      </header>

      <section className={styles.grid}>
        {products.map((product) => (
          <article key={product.id} className={styles.card}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <a href={product.url} target="_blank" rel="noopener noreferrer">
              サービスを開く
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
