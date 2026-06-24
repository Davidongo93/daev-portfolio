'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaArrowRight, FaClock } from 'react-icons/fa';
import BrandPlaceholder from '../Brand/BrandPlaceholder';
import { useLang } from '../../context/LangContext';

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    image?: string;
    keywords?: string[];
    description?: string;
    readingTime?: number;
  };
}

interface PostCardProps {
  post: Post;
  variant?: 'grid' | 'list';
}

const PostCard: React.FC<PostCardProps> = ({ post, variant = 'grid' }) => {
  const { t } = useLang();
  const { slug, frontmatter } = post;

  // ── List variant: a compact archive-style row, not a stretched card ──────
  if (variant === 'list') {
    return (
      <article className="group">
        <Link
          href={`/blog/${slug}`}
          className="flex items-center gap-4 px-4 py-4 hover:bg-surface-el/70 transition-colors"
        >
          {/* Small square thumbnail */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden border border-border">
            {frontmatter.image ? (
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                sizes="80px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <BrandPlaceholder
                title={frontmatter.title}
                label={frontmatter.keywords?.[0]}
              />
            )}
          </div>

          {/* Text block */}
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted mb-1 flex items-center gap-1.5">
              <FaCalendarAlt /> {frontmatter.date}
              {frontmatter.readingTime && (
                <span className="flex items-center gap-1">
                  · <FaClock /> {frontmatter.readingTime} {t.blog.readingTime}
                </span>
              )}
              {frontmatter.keywords?.[0] && (
                <span className="text-accent">· #{frontmatter.keywords[0]}</span>
              )}
            </p>
            <h2 className="font-display text-base sm:text-lg font-semibold text-fore group-hover:text-accent transition-colors truncate">
              {frontmatter.title}
            </h2>
            <p className="text-sm text-muted line-clamp-1">{frontmatter.excerpt}</p>
          </div>

          {/* Affordance */}
          <FaArrowRight
            size={12}
            className="shrink-0 text-muted group-hover:text-accent transition-transform group-hover:translate-x-1"
          />
        </Link>
      </article>
    );
  }

  // ── Grid variant: the full card ──────────────────────────────────────────
  return (
    <article className="bg-surface-el rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-2xl group flex flex-col h-full hover:-translate-y-1">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative overflow-hidden h-48">
          {frontmatter.image ? (
            <>
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-el/80 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
              <BrandPlaceholder
                title={frontmatter.title}
                label={frontmatter.keywords?.[0]}
              />
            </div>
          )}
        </div>
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        <p className="text-xs text-muted mb-2 flex items-center gap-1.5">
          <FaCalendarAlt /> {frontmatter.date}
          {frontmatter.readingTime && (
            <span className="flex items-center gap-1">
              · <FaClock /> {frontmatter.readingTime} {t.blog.readingTime}
            </span>
          )}
        </p>

        <Link href={`/blog/${slug}`}>
          <h2 className="font-display text-xl font-semibold text-fore hover:text-accent transition mb-2 line-clamp-2">
            {frontmatter.title}
          </h2>
        </Link>

        <p className="text-sm text-muted mb-4 flex-1 line-clamp-3">
          {frontmatter.excerpt}
        </p>

        {frontmatter.keywords && frontmatter.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {frontmatter.keywords.slice(0, 3).map((kw) => (
              <span
                key={kw}
                className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
              >
                #{kw}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/blog/${slug}`}
          className="text-sm font-semibold text-accent hover:text-accent-hover inline-flex items-center gap-1 mt-auto group/link"
        >
          Read more
          <FaArrowRight
            size={10}
            className="transition-transform group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
