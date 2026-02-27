import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/posts";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "記事が見つかりません" };
  }

  return {
    title: `${post.title} | YS Journal`,
    description: post.summary,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <p className={styles.meta}>
          {post.category} / {post.publishedAt} / {post.readTime}
        </p>
        <h1>{post.title}</h1>
        <p className={styles.summary}>{post.summary}</p>
        <div className={styles.body}>
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
