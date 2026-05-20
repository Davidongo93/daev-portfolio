import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { siteConfig } from '../../config/site';

export async function GET() {
  const localPath = path.join(process.cwd(), 'posts');
  const postsDirectory = fs.existsSync(localPath)
    ? localPath
    : path.join(process.cwd(), 'apps/daev/posts');

  const files = fs.existsSync(postsDirectory)
    ? fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    : [];

  const items = files
    .map((filename) => {
      const slug = filename.replace('.md', '');
      const fileContents = fs.readFileSync(path.join(postsDirectory, filename), 'utf-8');
      const { data: fm } = matter(fileContents);
      return {
        slug,
        title: fm.title || slug,
        description: fm.description || fm.excerpt || '',
        date: fm.date,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.alias} | ${siteConfig.name}</title>
    <link>${siteConfig.siteUrl}</link>
    <description>${siteConfig.bio.en}</description>
    <language>en-us</language>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${siteConfig.siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items
      .map(
        (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${siteConfig.siteUrl}/blog/${item.slug}</link>
      <guid>${siteConfig.siteUrl}/blog/${item.slug}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.date ? new Date(item.date).toUTCString() : new Date().toUTCString()}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
