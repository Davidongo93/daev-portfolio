import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Markdown, { type Components } from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaArrowLeft as FaBack } from 'react-icons/fa';
import BrandPlaceholder from '../../../components/Brand/BrandPlaceholder';
import ShareBar from '../../../components/ShareBar/ShareBar';
import { siteConfig } from '../../../config/site';
import { getReadingStats } from '../../../lib/readingTime';

const localPath = path.join(process.cwd(), 'posts');
const postsDirectory = fs.existsSync(localPath)
  ? localPath
  : path.join(process.cwd(), 'apps/daev/posts');

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { frontmatter } = await getPostData(params.slug);
  const description = frontmatter.description || frontmatter.excerpt || '';

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
    openGraph: {
      type: 'article',
      title: frontmatter.title,
      description,
      url: `${siteConfig.siteUrl}/blog/${params.slug}`,
      publishedTime: frontmatter.date,
      authors: [siteConfig.name],
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
  return `${base}/upload/w_1200,h_630,c_fill,q_auto,f_auto/${segments.join('/')}`;
}

export async function generateStaticParams() {
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
  return files.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}

async function getPostData(slug: string) {
  // The route param arrives URL-encoded (e.g. spaces -> %20). Decode it so the
  // filesystem path matches the real file name on disk.
  const filePath = path.join(postsDirectory, `${decodeURIComponent(slug)}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContents);
  return { frontmatter, content };
}

async function getPosts() {
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
  return files.map((filename) => {
    const slug = filename.replace('.md', '');
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter } = matter(fileContents);
    return { slug, frontmatter };
  });
}

// Render Cloudinary media inside the article body: ![caption](url) becomes a
// <figure>; .mp4 URLs render as a <video> with a generated poster, everything
// else renders as a lazy-loaded <img>. The custom <p> unwraps paragraphs that
// only wrap a media element so we never nest <figure> inside <p>.
const markdownComponents: Components = {
  img: ({ src, alt }) => {
    const caption = alt || undefined;
    if (typeof src === 'string' && src.endsWith('.mp4')) {
      const poster = src
        .replace('/video/upload/', '/video/upload/so_0,')
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
  p: ({ children, node }) => {
    const imgChildren =
      node?.children?.filter((c) => c.type === 'element' && c.tagName === 'img') ?? [];
    // Two or more images in one block become a responsive gallery grid.
    if (imgChildren.length >= 2) {
      return <div className="post-gallery">{children}</div>;
    }
    // A single standalone media element is unwrapped so the <figure> is not
    // illegally nested inside a <p>.
    if (node?.children?.length === 1 && imgChildren.length === 1) {
      return <>{children}</>;
    }
    return <p>{children}</p>;
  },
};

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const { frontmatter, content } = await getPostData(params.slug);
  const posts = await getPosts();
  const sorted = posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date as string).getTime() -
      new Date(a.frontmatter.date as string).getTime()
  );
  const currentIndex = sorted.findIndex((p) => p.slug === params.slug);
  const prevPost = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const nextPost = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;
  const { words: wordCount, minutes: readingTime } = getReadingStats(content);

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
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    wordCount,
    inLanguage: 'es',
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.siteUrl}#person`,
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    publisher: { '@id': `${siteConfig.siteUrl}#person` },
    isPartOf: { '@id': `${siteConfig.siteUrl}#website` },
    mainEntityOfPage: `${siteConfig.siteUrl}/blog/${params.slug}`,
    keywords: frontmatter.keywords?.join(', '),
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
            <FaCalendarAlt /> {frontmatter.date}
          </span>
          <span>·</span>
          <span>{readingTime} min read</span>
          {frontmatter.keywords && frontmatter.keywords.length > 0 && (
            <>
              <span>·</span>
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
            </>
          )}
        </div>

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
        <Markdown components={markdownComponents}>{content}</Markdown>
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
    </article>
  );
};

export default BlogPost;
