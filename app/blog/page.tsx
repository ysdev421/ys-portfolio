"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { getPosts } from "@/lib/posts";
import styles from "./page.module.css";

function initialQueryFromUrl() {
  if (typeof window === "undefined") {
    return "";
  }
  return new URLSearchParams(window.location.search).get("tag") ?? "";
}

export default function BlogIndexPage() {
  const posts = getPosts();
  const [activeCategory, setActiveCategory] = useState<
    "All" | "Design" | "Engineering" | "Brand"
  >("All");
  const [query, setQuery] = useState(initialQueryFromUrl);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const url = new URL(window.location.href);
    if (query.trim()) {
      url.searchParams.set("tag", query.trim());
    } else {
      url.searchParams.delete("tag");
    }
    window.history.replaceState({}, "", url.toString());
  }, [query]);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [posts, activeCategory, query]);

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) {
      return;
    }
    const subject = encodeURIComponent("YS Journal 購読希望");
    const body = encodeURIComponent(`購読希望メール: ${email.trim()}`);
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
  }

  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>BLOG</p>
        <h1>Insights for Product, Design, and Engineering</h1>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="カテゴリ絞り込み">
          {(["All", "Design", "Engineering", "Brand"] as const).map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category ? styles.activeFilter : ""}
            >
              {category}
            </button>
          ))}
        </div>
        <label htmlFor="search" className={styles.searchLabel}>
          <input
            id="search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="記事を検索..."
            className={styles.searchInput}
          />
        </label>
      </div>

      <p className={styles.count}>{filteredPosts.length} 件の記事</p>

      <section className={styles.list}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, idx) => (
            <article key={post.slug} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className="cat-badge" data-category={post.category}>
                  {post.category}
                </span>
                {idx === 0 && activeCategory === "All" && query === "" && (
                  <span className={styles.newBadge}>NEW</span>
                )}
                <span className={styles.metaDate}>{post.publishedAt}</span>
                <span className={styles.metaTime}>{post.readTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              {post.tags.length > 0 && (
                <ul className={styles.tags} aria-label="タグ">
                  {post.tags.map((tag) => (
                    <li key={tag} className={styles.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              <Link href={`/blog/${post.slug}`}>続きを読む</Link>
            </article>
          ))
        ) : (
          <div className={styles.empty}>
            <p>条件に一致する記事が見つかりませんでした。</p>
          </div>
        )}
      </section>

      <section className={styles.subscribe}>
        <h2>更新をメールで受け取る</h2>
        <p>新しい記事と改善ログを配信します。</p>
        <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="メールアドレス"
            required
          />
          <button type="submit">購読する</button>
        </form>
      </section>
    </main>
  );
}
