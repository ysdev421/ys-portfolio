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

  const related = getPosts()
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 2);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    description: post.summary,
  };

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
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
        {related.length > 0 && (
          <section className={styles.related}>
            <h2>関連記事</h2>
            <ul>
              {related.map((item) => (
                <li key={item.slug}>
                  <a href={`/blog/${item.slug}`}>{item.title}</a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
