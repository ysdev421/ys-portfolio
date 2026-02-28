import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getNextReads,
  getPostBySlug,
  getPosts,
  getRelatedPosts,
} from "@/lib/posts";
import { ReadingProgress } from "./ReadingProgress";
import { Comments } from "./Comments";
import { ShareButton } from "./ShareButton";
import { ScrollTop } from "./ScrollTop";
import { TocNav } from "./TocNav";
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
  const nextReads = getNextReads(
    post.slug,
    related.map((item) => item.slug),
    3,
  );
  const hasGiscusConfig =
    !!process.env.NEXT_PUBLIC_GISCUS_REPO &&
    !!process.env.NEXT_PUBLIC_GISCUS_REPO_ID &&
    !!process.env.NEXT_PUBLIC_GISCUS_CATEGORY &&
    !!process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `https://ys-portfolio.vercel.app/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "YS Journal",
      url: "https://ys-portfolio.vercel.app",
    },
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
        <div className={styles.authorCard}>
          <div className={styles.authorAvatar} aria-hidden>
            {post.author.name.slice(0, 1)}
          </div>
          <div>
            <p className={styles.authorName}>{post.author.name}</p>
            <p className={styles.authorBio}>{post.author.role}</p>
          </div>
        </div>
        <div className={styles.freshness}>
          <p>最終更新: {post.updatedAt}</p>
          <p>最終確認: {post.reviewedAt}</p>
        </div>
        {post.revisions.length > 0 && (
          <section className={styles.revisions} aria-label="更新履歴">
            <h2>更新履歴</h2>
            <ul>
              {post.revisions.map((revision) => (
                <li key={`${revision.date}-${revision.note}`}>
                  <span>{revision.date}</span>
                  <p>{revision.note}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
        {post.tags.length > 0 && (
          <ul className={styles.tags} aria-label="タグ">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link href={`/blog?q=${encodeURIComponent(tag)}`} className={styles.tag}>
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {post.sections.length > 1 && (
          <TocNav
            items={post.sections.map((section) => ({
              id: headingId(section.heading),
              heading: section.heading,
            }))}
          />
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
        <section className={styles.postCta} aria-label="読了後のアクション">
          <h2>次のアクション</h2>
          <p>実装を進めるなら、まずはSaaS一覧と最新記事をチェックしてください。</p>
          <div className={styles.postCtaActions}>
            <Link href="/products" className={styles.postCtaPrimary}>
              SaaS一覧を見る
            </Link>
          </div>
        </section>
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
        {nextReads.length > 0 && (
          <section className={styles.nextReads}>
            <h2>次に読む記事</h2>
            <ul>
              {nextReads.map((item) => (
                <li key={item.slug}>
                  <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        {hasGiscusConfig && (
          <section className={styles.comments} aria-label="コメント">
            <h2>コメント</h2>
            <Comments term={post.slug} />
          </section>
        )}
      </article>
    </main>
  );
}

