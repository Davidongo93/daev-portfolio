import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import PostCard from '../../../../components/PostCard/PostCard';
import { siteConfig } from '../../../../config/site';
import { DEFAULT_POST_LANG, resolveDates } from '../../../../lib/postMeta';
import { getAllPosts } from '../../../../lib/posts';
import { getIndexableTopics, getPostsForTopic, getTopic, isIndexableTopic } from '../../../../lib/topics';

// Topic pages are content taxonomy, so they read in the language the blog is
// written in rather than following the UI toggle.
const LANG = DEFAULT_POST_LANG as 'es';

export function generateStaticParams() {
  return getIndexableTopics().map(({ topic }) => ({ slug: topic.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const topic = getTopic(params.slug);
  if (!topic || !isIndexableTopic(params.slug)) return {};

  const url = `${siteConfig.siteUrl}/blog/tema/${topic.slug}`;
  return {
    title: topic.title[LANG],
    description: topic.description[LANG],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: topic.title[LANG],
      description: topic.description[LANG],
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: topic.title[LANG],
      description: topic.description[LANG],
    },
  };
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopic(params.slug);
  // A topic below the post threshold has no page: it would list one post and
  // duplicate the index. 404 keeps it out of the index until it grows.
  if (!topic || !isIndexableTopic(params.slug)) notFound();

  const posts = getPostsForTopic(params.slug, getAllPosts()).map((post) => ({
    ...post,
    frontmatter: {
      ...post.frontmatter,
      // PostCard requires these; frontmatter makes them optional.
      date: post.frontmatter.date ?? '',
      excerpt: post.frontmatter.excerpt ?? post.frontmatter.description ?? '',
      readingTime: post.readingTime,
    },
  }));

  const url = `${siteConfig.siteUrl}/blog/tema/${topic.slug}`;

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name: topic.title[LANG],
    description: topic.description[LANG],
    inLanguage: LANG,
    isPartOf: { '@id': `${siteConfig.siteUrl}/blog#blog` },
    publisher: { '@id': `${siteConfig.siteUrl}#person` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteConfig.siteUrl}/blog/${post.slug}`,
        name: post.frontmatter.title,
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: topic.label[LANG], item: url },
    ],
  };

  const updated = posts
    .map((post) => resolveDates(post.frontmatter).modified)
    .sort()
    .pop();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 md:py-16 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition mb-6"
      >
        <FaArrowLeft size={12} /> Blog
      </Link>

      <header className="mb-10 max-w-2xl">
        <h1 className="font-display font-bold text-3xl md:text-5xl text-fore mb-3">
          {topic.title[LANG]}
        </h1>
        <p className="text-muted leading-relaxed">{topic.intro[LANG]}</p>
        <p className="mt-3 text-xs font-mono text-muted">
          {posts.length} {posts.length === 1 ? 'entrada' : 'entradas'}
          {updated ? ` · actualizado ${updated}` : ''}
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} variant="grid" />
        ))}
      </div>

      <OtherTopics currentSlug={topic.slug} />
    </main>
  );
}

/** Cross-links between topic pages so no cluster is a dead end. */
function OtherTopics({ currentSlug }: { currentSlug: string }) {
  const others = getIndexableTopics().filter(({ topic }) => topic.slug !== currentSlug);
  if (others.length === 0) return null;

  return (
    <nav className="mt-16 pt-8 border-t border-border">
      <h2 className="font-display font-semibold text-fore mb-4">Otros temas</h2>
      <div className="flex flex-wrap gap-2">
        {others.map(({ topic, posts }) => (
          <Link
            key={topic.slug}
            href={`/blog/tema/${topic.slug}`}
            className="text-sm px-3 py-1.5 rounded-full border border-border bg-surface-el text-muted hover:text-accent hover:border-accent transition"
          >
            {topic.label[LANG]}{' '}
            <span className="text-xs text-muted/70">({posts.length})</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
