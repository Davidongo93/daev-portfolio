import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Markdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaArrowLeft as FaBack } from 'react-icons/fa';
import { siteConfig } from '../../../config/site';

const localPath = path.join(process.cwd(), 'posts');
const postsDirectory = fs.existsSync(localPath)
  ? localPath
  : path.join(process.cwd(), 'apps/daev/posts');

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { frontmatter } = await getPostData(params.slug);
  const description = frontmatter.description || frontmatter.excerpt || '';
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
      images: frontmatter.image ? [{ url: frontmatter.image }] : ['/profileDave.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description,
      images: frontmatter.image ? [frontmatter.image] : ['/profileDave.png'],
    },
  };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
  return files.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}

async function getPostData(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.md`);
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

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

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
  const readingTime = getReadingTime(content);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description || frontmatter.excerpt,
    image: frontmatter.image
      ? `${siteConfig.siteUrl}${frontmatter.image}`
      : `${siteConfig.siteUrl}/profileDave.png`,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    mainEntityOfPage: `${siteConfig.siteUrl}/blog/${params.slug}`,
    keywords: frontmatter.keywords?.join(', '),
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition mb-6"
      >
        <FaBack size={12} /> Blog
      </Link>

      {/* Hero */}
      {frontmatter.image && (
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 border border-border">
          <Image
            src={frontmatter.image}
            alt={frontmatter.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

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
      </header>

      {/* Content */}
      <div className="prose-article">
        <Markdown>{content}</Markdown>
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
