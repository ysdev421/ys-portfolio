import Link from "next/link";
import { getPosts } from "@/lib/posts";
import styles from "./page.module.css";

export default function BlogIndexPage() {
  const posts = getPosts();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>BLOG</p>
        <h1>Insights for Product, Design, and Engineering</h1>
      </header>

      <section className={styles.list}>
        {posts.map((post) => (
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
