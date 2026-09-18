import type { MetadataRoute } from 'next';
import { siteConfig } from '../config/site';
import { resolveDates, toDate } from '../lib/postMeta';
import { getAllPosts } from '../lib/posts';
import { getIndexableTopics } from '../lib/topics';
import { urlFor } from '../lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getAllPosts();

  // lastmod comes from the frontmatter, never from the file's mtime: git sets
  // mtime to checkout time, so an mtime-based sitemap claimed on every deploy
  // that all posts had changed that day. Crawlers learn to distrust a lastmod
  // that always says "today" while the content never changes.
  const lastModifiedOf = (frontmatter: Parameters<typeof resolveDates>[0]) =>
    toDate(resolveDates(frontmatter).modified) ?? new Date();

  const posts = allPosts.map((post) => ({
    url: `${siteConfig.siteUrl}/blog/${post.slug}`,
    lastModified: lastModifiedOf(post.frontmatter),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Only topics that cleared the post threshold have a page to list.
  const topics = getIndexableTopics(allPosts).map(({ topic, posts: topicPosts }) => ({
    url: `${siteConfig.siteUrl}/blog/tema/${topic.slug}`,
    lastModified: newestOf(topicPosts.map((post) => lastModifiedOf(post.frontmatter))),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Pages that exist in both locales list each other under `alternates` so
  // Google pairs them instead of treating /en as a thin duplicate. The blog is
  // Spanish-only and therefore declares no alternate.
  const bilingual = (path: string, changeFrequency: 'weekly' | 'monthly', priority: number) =>
    (['es', 'en'] as const).map((lang) => ({
      url: urlFor(lang, path),
      lastModified: new Date(),
      changeFrequency,
      priority: lang === 'es' ? priority : priority - 0.1,
      alternates: {
        languages: {
          'es-CO': urlFor('es', path),
          'en-US': urlFor('en', path),
          'x-default': urlFor('es', path),
        },
      },
    }));

  return [
    ...bilingual('/', 'weekly', 1.0),
    ...bilingual('/pricing', 'monthly', 0.9),
    {
      // The blog index is only as fresh as its newest post.
      url: `${siteConfig.siteUrl}/blog`,
      lastModified: newestOf(posts.map((post) => post.lastModified)),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...topics,
    ...posts,
  ];
}

function newestOf(dates: Date[]): Date {
  return dates.reduce<Date>(
    (newest, date) => (date > newest ? date : newest),
    dates[0] ?? new Date()
  );
}
