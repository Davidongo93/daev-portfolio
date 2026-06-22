import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from 'next';
import { siteConfig } from '../config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const localPath = path.join(process.cwd(), 'posts');
  const postsDirectory = fs.existsSync(localPath)
    ? localPath
    : path.join(process.cwd(), 'apps/daev/posts');

  const files = fs.existsSync(postsDirectory)
    ? fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    : [];
  const posts = files.map((filename) => {
    let lastModified = new Date();
    try {
      lastModified = fs.statSync(path.join(postsDirectory, filename)).mtime;
    } catch {
      /* keep default */
    }
    return {
      url: `${siteConfig.siteUrl}/blog/${filename.replace('.md', '')}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  return [
    {
      url: siteConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteConfig.siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts,
  ];
}
