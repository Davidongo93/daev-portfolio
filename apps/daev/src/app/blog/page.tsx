import PostGrid from '../../components/PostGrid/PostGrid';
import PostProvider from '../../components/PostProvider/PostProvider';
import { siteConfig } from '../../config/site';
import { DEFAULT_POST_LANG, toDate } from '../../lib/postMeta';

const BlogPage = () => {
  return (
    <PostProvider>
      {(posts) => {
        const sorted = [...posts].sort(
          (a, b) =>
            (toDate(b.frontmatter.date)?.getTime() ?? 0) -
            (toDate(a.frontmatter.date)?.getTime() ?? 0)
        );

        // The index declares itself as a Blog and lists its posts, so crawlers
        // and AI engines can read the collection without fetching every post.
        // Each entry points back at the canonical article URL.
        const blogJsonLd = {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          '@id': `${siteConfig.siteUrl}/blog#blog`,
          url: `${siteConfig.siteUrl}/blog`,
          name: `Blog | ${siteConfig.alias}`,
          description: siteConfig.bio.es,
          inLanguage: DEFAULT_POST_LANG,
          isPartOf: { '@id': `${siteConfig.siteUrl}#website` },
          publisher: { '@id': `${siteConfig.siteUrl}#person` },
          blogPost: sorted.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.frontmatter.title,
            url: `${siteConfig.siteUrl}/blog/${post.slug}`,
            mainEntityOfPage: `${siteConfig.siteUrl}/blog/${post.slug}`,
            datePublished: post.frontmatter.date,
            dateModified: post.frontmatter.modified,
            author: { '@type': 'Person', name: post.frontmatter.author },
            ...(post.frontmatter.image ? { image: post.frontmatter.image } : {}),
            ...(post.frontmatter.keywords?.length
              ? { keywords: post.frontmatter.keywords.join(', ') }
              : {}),
          })),
        };

        const breadcrumbJsonLd = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: `${siteConfig.siteUrl}/blog`,
            },
          ],
        };

        return (
          <main className="max-w-6xl mx-auto px-4 py-12 md:py-16 animate-fade-in">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <PostGrid posts={sorted} />
          </main>
        );
      }}
    </PostProvider>
  );
};

export default BlogPage;
