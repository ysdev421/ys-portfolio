"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getPosts } from "@/lib/posts";
import { getNewsletterMailto } from "@/lib/newsletter";
import { recommendations } from "@/lib/recommendations";
import styles from "./page.module.css";

type Category = "All" | "Design" | "Engineering" | "Brand";
type SortBy = "latest" | "readTime" | "title";

function getSearchParams() {
  if (typeof window === "undefined") {
    return new URLSearchParams();
  }
  return new URLSearchParams(window.location.search);
}

function initialCategoryFromUrl(): Category {
  const value = getSearchParams().get("category");
  return value === "Design" || value === "Engineering" || value === "Brand"
    ? value
    : "All";
}

function initialSortFromUrl(): SortBy {
  const value = getSearchParams().get("sort");
  return value === "readTime" || value === "title" ? value : "latest";
}

function initialArchiveFromUrl() {
  return getSearchParams().get("archive") ?? "all";
}

function initialQueryFromUrl() {
  return getSearchParams().get("tag") ?? "";
}

export default function BlogIndexPage() {
  const posts = getPosts();
  const newsletterUrl = process.env.NEXT_PUBLIC_NEWSLETTER_URL;
  const [activeCategory, setActiveCategory] = useState<Category>(
    initialCategoryFromUrl,
  );
  const [queryInput, setQueryInput] = useState(initialQueryFromUrl);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQueryFromUrl);
  const [email, setEmail] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>(initialSortFromUrl);
  const [archive, setArchive] = useState(initialArchiveFromUrl);

  const archiveOptions = useMemo(() => {
    const months = new Set(posts.map((post) => post.publishedAt.slice(0, 7)));
    return ["all", ...Array.from(months).sort((a, b) => (a < b ? 1 : -1))];
  }, [posts]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(queryInput);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [queryInput]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const url = new URL(window.location.href);

    if (debouncedQuery.trim()) {
      url.searchParams.set("tag", debouncedQuery.trim());
    } else {
      url.searchParams.delete("tag");
    }

    if (activeCategory !== "All") {
      url.searchParams.set("category", activeCategory);
    } else {
      url.searchParams.delete("category");
    }

    if (sortBy !== "latest") {
      url.searchParams.set("sort", sortBy);
    } else {
      url.searchParams.delete("sort");
    }

    if (archive !== "all") {
      url.searchParams.set("archive", archive);
    } else {
      url.searchParams.delete("archive");
    }

    window.history.replaceState({}, "", url.toString());
  }, [debouncedQuery, activeCategory, sortBy, archive]);

  const filteredPosts = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
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
  }, [posts, activeCategory, debouncedQuery, sortBy, archive]);

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
    window.location.href = getNewsletterMailto(email.trim());
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
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="記事を検索..."
            className={styles.searchInput}
          />
        </label>
        <label htmlFor="sort" className={styles.sortLabel}>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
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
                {idx === 0 && activeCategory === "All" && debouncedQuery === "" && (
                  <span className={styles.newBadge}>NEW</span>
                )}
                <span className={styles.metaDate}>{post.publishedAt}</span>
                <span className={styles.metaTime}>{post.readTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <p className={styles.authorMeta}>
                {post.author.name} / {post.author.role}
              </p>
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
