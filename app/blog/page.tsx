"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { getPosts } from "@/lib/posts";
import { recommendations } from "@/lib/recommendations";
import styles from "./page.module.css";

function initialQueryFromUrl() {
  if (typeof window === "undefined") {
    return "";
  }
  return new URLSearchParams(window.location.search).get("tag") ?? "";
}

export default function BlogIndexPage() {
  const posts = getPosts();
  const newsletterUrl = process.env.NEXT_PUBLIC_NEWSLETTER_URL;
  const [activeCategory, setActiveCategory] = useState<
    "All" | "Design" | "Engineering" | "Brand"
  >("All");
  const [query, setQuery] = useState(initialQueryFromUrl);
  const [email, setEmail] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "readTime" | "title">(
    "latest",
  );
  const [archive, setArchive] = useState("all");

  const archiveOptions = useMemo(() => {
    const months = new Set(posts.map((post) => post.publishedAt.slice(0, 7)));
    return ["all", ...Array.from(months).sort((a, b) => (a < b ? 1 : -1))];
  }, [posts]);

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
    const base = posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchesArchive =
        archive === "all" || post.publishedAt.startsWith(archive);
      return matchesCategory && matchesQuery && matchesArchive;
    });

    const readMinutes = (value: string) =>
      Number.parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;

    return [...base].sort((a, b) => {
      if (sortBy === "readTime") {
        return readMinutes(a.readTime) - readMinutes(b.readTime);
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title, "ja");
      }
      return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
    });
  }, [posts, activeCategory, query, sortBy, archive]);

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) {
      return;
    }
    if (newsletterUrl) {
      const url = new URL(newsletterUrl);
      url.searchParams.set("email", email.trim());
      window.location.href = url.toString();
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
        <label htmlFor="sort" className={styles.sortLabel}>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "latest" | "readTime" | "title")
            }
            className={styles.sortSelect}
          >
            <option value="latest">新着順</option>
            <option value="readTime">読了時間が短い順</option>
            <option value="title">タイトル順</option>
          </select>
        </label>
        <label htmlFor="archive" className={styles.sortLabel}>
          <select
            id="archive"
            value={archive}
            onChange={(e) => setArchive(e.target.value)}
            className={styles.sortSelect}
          >
            {archiveOptions.map((value) => (
              <option key={value} value={value}>
                {value === "all" ? "全期間" : value}
              </option>
            ))}
          </select>
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

      <section className={styles.recommend}>
        <h2>Recommended Reads</h2>
        <div className={styles.recommendGrid}>
          {recommendations.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.recommendCard}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
