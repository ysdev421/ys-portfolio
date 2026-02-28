import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ys-portfolio.vercel.app";
  const posts = getPosts();
  const latestContentDate = posts[0]?.updatedAt ?? new Date().toISOString();

  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: latestContentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestContentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: latestContentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: latestContentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...postEntries,
  ];
}
