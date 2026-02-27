"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getPosts } from "@/lib/posts";
import styles from "./page.module.css";

export default function BlogIndexPage() {
  const posts = getPosts();
  const [activeCategory, setActiveCategory] = useState<
    "All" | "Design" | "Engineering" | "Brand"
  >("All");

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) =>
        activeCategory === "All" ? true : post.category === activeCategory,
      ),
    [posts, activeCategory],
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>BLOG</p>
        <h1>Insights for Product, Design, and Engineering</h1>
      </header>

      <div className={styles.filters}>
        {(["All", "Design", "Engineering", "Brand"] as const).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={activeCategory === category ? styles.activeFilter : ""}
          >
            {category}
          </button>
        ))}
      </div>

      <section className={styles.list}>
        {filteredPosts.map((post) => (
          <article key={post.slug} className={styles.card}>
            <p className={styles.meta}>
              {post.category} / {post.publishedAt} / {post.readTime}
            </p>
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
            <Link href={`/blog/${post.slug}`}>続きを読む</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
