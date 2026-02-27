"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import styles from "./page.module.css";

type StatusFilter = "all" | "live" | "coming_soon";

export default function ProductsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        statusFilter === "all" ? true : product.status === statusFilter,
      ),
    [statusFilter],
  );

  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>PRODUCTS</p>
        <h1>SaaS一覧</h1>
        <p>運営中のサービスへ直接アクセスできます。</p>
      </header>

      <div className={styles.filters} role="group" aria-label="公開状態フィルタ">
        <button
          type="button"
          onClick={() => setStatusFilter("all")}
          className={statusFilter === "all" ? styles.activeFilter : ""}
        >
          すべて
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter("live")}
          className={statusFilter === "live" ? styles.activeFilter : ""}
        >
          公開中
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter("coming_soon")}
          className={statusFilter === "coming_soon" ? styles.activeFilter : ""}
        >
          準備中
        </button>
      </div>

      <section className={styles.grid}>
        {filteredProducts.map((product) => (
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
