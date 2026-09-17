import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { siteConfig } from '../../config/site';
import { DEFAULT_POST_LANG, resolveAuthor, resolveDates, toDate } from '../../lib/postMeta';

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
      const dates = resolveDates(fm);
      return {
        slug,
        title: fm.title || slug,
        description: fm.description || fm.excerpt || '',
        // Guest pieces are credited to their real author, not to the site owner.
        author: resolveAuthor(fm).name,
        date: dates.published,
        keywords: (fm.keywords as string[] | undefined) ?? [],
      };
    })
    .sort((a, b) => (toDate(b.date)?.getTime() ?? 0) - (toDate(a.date)?.getTime() ?? 0));

  const latest = toDate(items[0]?.date) ?? new Date();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${siteConfig.alias} | ${siteConfig.name}`)}</title>
    <link>${siteConfig.siteUrl}/blog</link>
    <description>${escapeXml(siteConfig.bio.es)}</description>
    <language>${DEFAULT_POST_LANG}-CO</language>
    <lastBuildDate>${latest.toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items
      .map(
        (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${siteConfig.siteUrl}/blog/${item.slug}</link>
      <guid isPermaLink="true">${siteConfig.siteUrl}/blog/${item.slug}</guid>
      <description>${escapeXml(item.description)}</description>
      <dc:creator>${escapeXml(item.author)}</dc:creator>
      <pubDate>${(toDate(item.date) ?? new Date()).toUTCString()}</pubDate>${item.keywords
        .map((kw) => `\n      <category>${escapeXml(kw)}</category>`)
        .join('')}
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
