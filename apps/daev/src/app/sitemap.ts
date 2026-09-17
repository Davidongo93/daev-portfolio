import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { MetadataRoute } from 'next';
import { siteConfig } from '../config/site';
import { resolveDates, toDate } from '../lib/postMeta';

export default function sitemap(): MetadataRoute.Sitemap {
  const localPath = path.join(process.cwd(), 'posts');
  const postsDirectory = fs.existsSync(localPath)
    ? localPath
    : path.join(process.cwd(), 'apps/daev/posts');

  const files = fs.existsSync(postsDirectory)
    ? fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    : [];

  const posts = files.map((filename) => {
    // lastmod comes from the frontmatter, never from the file's mtime: git sets
    // mtime to checkout time, so on every deploy the mtime version claimed all
    // posts had been modified that day. Crawlers learn to distrust a sitemap
    // whose lastmod always says "today" while the content never changes.
    const { data: frontmatter } = matter(
      fs.readFileSync(path.join(postsDirectory, filename), 'utf-8')
    );
    const { modified } = resolveDates(frontmatter);

    return {
      url: `${siteConfig.siteUrl}/blog/${filename.replace('.md', '')}`,
      lastModified: toDate(modified) ?? new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  // The blog index is only as fresh as its newest post.
  const newestPost = posts.reduce<Date | null>(
    (newest, post) =>
      !newest || post.lastModified > newest ? post.lastModified : newest,
    null
  );

  return [
    {
      url: siteConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteConfig.siteUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.siteUrl}/blog`,
      lastModified: newestPost ?? new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts,
  ];
}
