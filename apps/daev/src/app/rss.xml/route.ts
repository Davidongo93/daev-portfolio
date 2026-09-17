import { siteConfig } from '../../config/site';
import { DEFAULT_POST_LANG, resolveAuthor, resolveDates, toDate } from '../../lib/postMeta';
import { getAllPosts } from '../../lib/posts';

export async function GET() {
  // getAllPosts() is already newest-first.
  const items = getAllPosts().map(({ slug, frontmatter }) => ({
    slug,
    title: frontmatter.title || slug,
    description: frontmatter.description || frontmatter.excerpt || '',
    // Guest pieces are credited to their real author, not to the site owner.
    author: resolveAuthor(frontmatter).name,
    date: resolveDates(frontmatter).published,
    keywords: frontmatter.keywords ?? [],
  }));

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
