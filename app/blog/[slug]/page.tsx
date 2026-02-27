import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts, getRelatedPosts } from "@/lib/posts";
import { ReadingProgress } from "./ReadingProgress";
import { ShareButton } from "./ShareButton";
import { ScrollTop } from "./ScrollTop";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function headingId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

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
    keywords: post.tags,
    alternates: {
      canonical: `https://ys-portfolio.vercel.app/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.publishedAt,
      url: `https://ys-portfolio.vercel.app/blog/${slug}`,
      tags: post.tags,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post.slug, 2);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    description: post.summary,
    keywords: post.tags.join(", "),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://ys-portfolio.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://ys-portfolio.vercel.app/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://ys-portfolio.vercel.app/blog/${post.slug}` },
    ],
  };

  return (
    <main id="main-content" className={styles.page}>
      <ReadingProgress />
      <ScrollTop />
      <Link href="/blog" className={styles.backLink}>
        ← ブログ一覧に戻る
      </Link>
      <article className={styles.article}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        <div className={styles.meta}>
          <span className="cat-badge" data-category={post.category}>
            {post.category}
          </span>
          <span className={styles.metaText}>{post.publishedAt}</span>
          <span className={styles.metaText}>{post.readTime}</span>
        </div>
        <h1>{post.title}</h1>
        <p className={styles.summary}>{post.summary}</p>
        {post.tags.length > 0 && (
          <ul className={styles.tags} aria-label="タグ">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link href={`/blog?tag=${encodeURIComponent(tag)}`} className={styles.tag}>
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {post.sections.length > 1 && (
          <nav className={styles.toc} aria-label="目次">
            <p className={styles.tocTitle}>目次</p>
            <ol className={styles.tocList}>
              {post.sections.map((section) => (
                <li key={section.heading}>
                  <a href={`#${headingId(section.heading)}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className={styles.body}>
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 id={headingId(section.heading)}>{section.heading}</h2>
              {section.paras.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </section>
          ))}
        </div>
        <div className={styles.shareRow}>
          <ShareButton title={post.title} />
        </div>
        {related.length > 0 && (
          <section className={styles.related}>
            <h2>関連記事</h2>
            <ul>
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
