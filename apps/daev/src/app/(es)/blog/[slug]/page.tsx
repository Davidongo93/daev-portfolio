import { notFound } from 'next/navigation';
import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaPenNib,
  FaHistory,
  FaArrowLeft as FaBack,
} from 'react-icons/fa';
import BrandPlaceholder from '@/components/Brand/BrandPlaceholder';
import ShareBar from '@/components/ShareBar/ShareBar';
import CommentsSection from '@/components/Comments/CommentsSection';
import { siteConfig } from '@/config/site';
import { getReadingStats } from '@/lib/readingTime';
import {
  authorJsonLd,
  DEFAULT_POST_LANG,
  resolveAuthor,
  resolveDates,
  resolveLang,
} from '@/lib/postMeta';
import { findPostBySlug, getAllPosts, getPostSlugs } from '@/lib/posts';
import { getRelatedPosts, isIndexableTopic, topicsForPost } from '@/lib/topics';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = findPostBySlug(params.slug);
  if (!post) return {};
  const { frontmatter } = post;
  const description = frontmatter.description || frontmatter.excerpt || '';
  const author = resolveAuthor(frontmatter);
  const dates = resolveDates(frontmatter);

  // Point og:image straight at Cloudinary (a 1200x630 CDN thumbnail) instead of
  // generating it on a serverless route. The generated route was dynamic, ~4.6s
  // and ~1.9MB, so social crawlers (WhatsApp, X, Facebook) timed out and showed
  // nothing. A direct CDN image is small, instant and globally cached. Posts
  // without their own image fall back to the static branded site card.
  const ogImage = frontmatter.image
    ? toOgThumb(frontmatter.image as string)
    : `${siteConfig.siteUrl}/opengraph-image`;

  return {
    title: frontmatter.title,
    description,
    alternates: { canonical: `${siteConfig.siteUrl}/blog/${params.slug}` },
    keywords: frontmatter.keywords || [],
    authors: [{ name: author.name, ...(author.url ? { url: author.url } : {}) }],
    openGraph: {
      type: 'article',
      title: frontmatter.title,
      description,
      url: `${siteConfig.siteUrl}/blog/${params.slug}`,
      publishedTime: dates.published,
      modifiedTime: dates.modified,
      authors: [author.name],
      images: [{ url: ogImage, width: 1200, height: 630, alt: frontmatter.title as string }],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description,
      images: [ogImage],
    },
  };
}

// Turn any Cloudinary image URL into a 1200x630 OG thumbnail, replacing an
// existing leading transformation segment so the request stays a single, small
// transform (q_auto + f_auto keep it light and CDN-cached).
function toOgThumb(url: string): string {
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  const [base, rest] = url.split('/upload/');
  const segments = rest.split('/');
  // Drop a leading transformation segment (e.g. "c_limit,w_1600,q_auto") so we
  // don't chain transforms; a folder/public-id like "treenet/..." is preserved.
  if (/(^|,)[a-z]{1,3}_/.test(segments[0])) segments.shift();
  // g_auto keeps the subject in frame: portrait covers cropped to 1200x630 from
  // the centre cut faces in half.
  return `${base}/upload/w_1200,h_630,c_fill,g_auto,q_auto,f_auto/${segments.join('/')}`;
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

// Render Cloudinary media inside the article body: ![caption](url) becomes a
// <figure>; .mp4 URLs render as a <video> with a generated poster, everything
// else renders as a lazy-loaded <img>. The custom <p> unwraps paragraphs that
// only wrap a media element so we never nest <figure> inside <p>.
// A post can set `captions: false` in its frontmatter for a purely visual tour:
// the alt text still reaches screen readers and search engines, but nothing is
// printed under the photo.
// Turn any YouTube URL (watch, youtu.be or embed) into an embeddable URL,
// preserving query params like ?si=… ; returns null for non-YouTube URLs.
function toYouTubeEmbed(src: string): string | null {
  try {
    const u = new URL(src);
    const host = u.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') return `https://www.youtube.com/embed${u.pathname}${u.search}`;
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (u.pathname.startsWith('/embed/')) return `https://www.youtube.com${u.pathname}${u.search}`;
      const id = u.searchParams.get('v');
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    return null;
  } catch {
    return null;
  }
}

const buildMarkdownComponents = ({ captions }: { captions: boolean }): Components => ({
  img: ({ src, alt }) => {
    const caption = captions ? alt || undefined : undefined;
    // A YouTube link written as ![caption](url) becomes a responsive embed.
    const yt = typeof src === 'string' ? toYouTubeEmbed(src) : null;
    if (yt) {
      return (
        <figure>
          <div className="relative w-full overflow-hidden rounded-xl aspect-video">
            <iframe
              src={yt}
              title={alt || 'YouTube video'}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }
    if (typeof src === 'string' && src.endsWith('.mp4')) {
      // 30% in rather than frame 0: clips often open on a dark or blurred frame,
      // which made the poster look like a broken image.
      const poster = src
        .replace('/video/upload/', '/video/upload/so_30p,')
        .replace(/\.mp4$/, '.jpg');
      return (
        <figure>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video src={src} poster={poster} controls playsInline preload="metadata" />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }
    return (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt || ''} loading="lazy" />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  },
  // [![caption](image)](url) becomes a clickable card: the image keeps its own
  // aspect ratio (no gallery crop) and the caption doubles as the link label.
  a: ({ href, children, node }) => {
    const child = node?.children?.length === 1 ? node.children[0] : undefined;
    const img =
      child?.type === 'element' && child.tagName === 'img' ? child.properties : undefined;
    // Links that lead somewhere else — another site or another page of the blog —
    // open in a new tab so the reader never loses the article they were on.
    // In-page anchors, mailto: and tel: stay in place.
    const newTab =
      typeof href === 'string' && (/^https?:\/\//.test(href) || href.startsWith('/'));
    const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    if (img && typeof href === 'string') {
      const src = typeof img.src === 'string' ? img.src : '';
      const alt = typeof img.alt === 'string' ? img.alt : '';
      return (
        <a href={href} className="post-linkcard" {...newTabProps}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" />
          {alt && <span className="post-linkcard-label">{alt}</span>}
        </a>
      );
    }
    return (
      <a href={href} {...newTabProps}>
        {children}
      </a>
    );
  },
  p: ({ children, node }) => {
    const kids = node?.children ?? [];
    const isImage = (c: (typeof kids)[number]) => c.type === 'element' && c.tagName === 'img';
    const isLinkedImage = (c: (typeof kids)[number]) =>
      c.type === 'element' &&
      c.tagName === 'a' &&
      c.children.length === 1 &&
      isImage(c.children[0]);
    const imgChildren = kids.filter(isImage);
    const cardChildren = kids.filter(isLinkedImage);
    // Two or more linked images in one block become a card grid; they keep their
    // natural proportions instead of being cropped like gallery photos.
    if (cardChildren.length >= 2) {
      return <div className="post-cards">{children}</div>;
    }
    // Two or more images in one block become a responsive gallery grid.
    if (imgChildren.length >= 2) {
      return <div className="post-gallery">{children}</div>;
    }
    // A single standalone media element is unwrapped so the <figure> is not
    // illegally nested inside a <p>.
    if (kids.length === 1 && (imgChildren.length === 1 || cardChildren.length === 1)) {
      return <>{children}</>;
    }
    return <p>{children}</p>;
  },
  table: ({ children }) => (
    <div className="table-scroll">
      <table>{children}</table>
    </div>
  ),
});

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const post = findPostBySlug(params.slug);
  if (!post) notFound();
  const { frontmatter, content } = post;

  // getAllPosts() is already newest-first.
  const sorted = getAllPosts();
  const currentIndex = sorted.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const nextPost = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;
  const topics = topicsForPost(post);
  const related = getRelatedPosts(post, 3, sorted);
  const { words: wordCount, minutes: readingTime } = getReadingStats(content);
  const author = resolveAuthor(frontmatter);
  const dates = resolveDates(frontmatter);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description || frontmatter.excerpt,
    image: frontmatter.image
      ? frontmatter.image.startsWith('http')
        ? frontmatter.image
        : `${siteConfig.siteUrl}${frontmatter.image}`
      : `${siteConfig.siteUrl}/opengraph-image`,
    datePublished: dates.published,
    dateModified: dates.modified,
    wordCount,
    inLanguage: resolveLang(frontmatter),
    author: authorJsonLd(author),
    publisher: { '@id': `${siteConfig.siteUrl}#person` },
    isPartOf: { '@id': `${siteConfig.siteUrl}#website` },
    mainEntityOfPage: `${siteConfig.siteUrl}/blog/${params.slug}`,
    keywords: frontmatter.keywords?.join(', '),
    ...(topics.length
      ? {
          about: topics.map((topic) => ({
            '@type': 'Thing',
            name: topic.label[DEFAULT_POST_LANG],
            ...(isIndexableTopic(topic.slug)
              ? { url: `${siteConfig.siteUrl}/blog/tema/${topic.slug}` }
              : {}),
          })),
        }
      : {}),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.siteUrl}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: frontmatter.title,
        item: `${siteConfig.siteUrl}/blog/${params.slug}`,
      },
    ],
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition mb-6"
      >
        <FaBack size={12} /> Blog
      </Link>

      {/* Hero */}
      <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 border border-border">
        {frontmatter.image ? (
          <Image
            src={frontmatter.image}
            alt={frontmatter.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <BrandPlaceholder
            title={frontmatter.title}
            label={frontmatter.keywords?.[0]}
          />
        )}
      </div>

      {/* Header */}
      <header className="mb-10">
        <h1 className="font-display font-bold text-3xl md:text-5xl text-fore mb-4 leading-tight">
          {frontmatter.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <FaPenNib className="text-accent" />
            {author.url ? (
              <a
                href={author.url}
                rel={author.isSiteOwner ? undefined : 'noopener noreferrer author'}
                className="hover:text-accent transition"
              >
                {author.name}
              </a>
            ) : (
              author.name
            )}
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1.5">
            <FaCalendarAlt /> {dates.published}
          </span>
          {dates.wasRevised && (
            <>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5" title="Last revised">
                <FaHistory /> {dates.modified}
              </span>
            </>
          )}
          <span>·</span>
          <span>{readingTime} min read</span>
          {/* No leading separator: the tags wrap onto their own line, which
              left the dot dangling at the end of the byline. */}
          {frontmatter.keywords && frontmatter.keywords.length > 0 && (
            <div className="inline-flex flex-wrap gap-1.5">
              {frontmatter.keywords.map((kw: string) => (
                <span
                  key={kw}
                  className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  #{kw}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Topics — the indexable clusters, distinct from the free-form tags
            above. A topic below the post threshold has no page yet, so it
            renders as a plain label instead of a dead link. */}
        {topics.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {topics.map((topic) =>
              isIndexableTopic(topic.slug) ? (
                <Link
                  key={topic.slug}
                  href={`/blog/tema/${topic.slug}`}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-bg transition"
                >
                  {topic.label[DEFAULT_POST_LANG]}
                </Link>
              ) : (
                <span
                  key={topic.slug}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-border text-muted"
                >
                  {topic.label[DEFAULT_POST_LANG]}
                </span>
              )
            )}
          </div>
        )}

        {/* Share */}
        <div className="mt-6 pt-6 border-t border-border">
          <ShareBar
            url={`${siteConfig.siteUrl}/blog/${params.slug}`}
            title={frontmatter.title as string}
          />
        </div>
      </header>

      {/* Content */}
      <div className="prose-article">
        <Markdown remarkPlugins={[remarkGfm]} components={buildMarkdownComponents({ captions: frontmatter.captions !== false })}>
          {content}
        </Markdown>
      </div>

      {/* Prev/Next */}
      <nav className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 pt-8 border-t border-border">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="group bg-surface-el rounded-xl p-4 border border-border hover:border-accent transition"
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-muted mb-1">
              <FaArrowLeft size={10} /> Previous
            </span>
            <p className="text-sm font-medium text-fore group-hover:text-accent transition line-clamp-1">
              {(prevPost.frontmatter as { title: string }).title}
            </p>
          </Link>
        ) : (
          <span />
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group bg-surface-el rounded-xl p-4 border border-border hover:border-accent transition md:text-right"
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-muted mb-1">
              Next <FaArrowRight size={10} />
            </span>
            <p className="text-sm font-medium text-fore group-hover:text-accent transition line-clamp-1">
              {(nextPost.frontmatter as { title: string }).title}
            </p>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      {/* Related — posts that share a topic with this one. */}
      {related.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="font-display font-semibold text-xl text-fore mb-5">
            Seguir leyendo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group rounded-xl border border-border bg-surface-el p-4 transition hover:border-accent hover:-translate-y-0.5"
              >
                <p className="text-sm font-medium text-fore group-hover:text-accent transition line-clamp-2">
                  {item.frontmatter.title}
                </p>
                {item.frontmatter.excerpt && (
                  <p className="mt-2 text-xs text-muted line-clamp-3">
                    {item.frontmatter.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Comments + reactions */}
      <CommentsSection slug={decodeURIComponent(params.slug)} />
    </article>
  );
};

export default BlogPost;
