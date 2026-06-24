'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import BrandPlaceholder from '../Brand/BrandPlaceholder';

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    image?: string;
    keywords?: string[];
    description?: string;
  };
}

interface PostCardProps {
  post: Post;
  variant?: 'grid' | 'list';
}

const PostCard: React.FC<PostCardProps> = ({ post, variant = 'grid' }) => {
  const isList = variant === 'list';
  const { slug, frontmatter } = post;

  return (
    <article
      className={`bg-surface-el rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-2xl group flex ${
        isList ? 'flex-col sm:flex-row' : 'flex-col h-full hover:-translate-y-1'
      }`}
    >
      <Link
        href={`/blog/${slug}`}
        className={`block ${isList ? 'sm:w-60 sm:shrink-0' : ''}`}
      >
        <div
          className={`relative overflow-hidden ${
            isList ? 'h-44 sm:h-full sm:min-h-[12rem]' : 'h-48'
          }`}
        >
          {frontmatter.image ? (
            <>
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                sizes={
                  isList
                    ? '(max-width: 640px) 100vw, 240px'
                    : '(max-width: 768px) 100vw, 33vw'
                }
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {!isList && (
                <div className="absolute inset-0 bg-gradient-to-t from-surface-el/80 to-transparent" />
              )}
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
        </p>

        <Link href={`/blog/${slug}`}>
          <h2 className="font-display text-xl font-semibold text-fore hover:text-accent transition mb-2 line-clamp-2">
            {frontmatter.title}
          </h2>
        </Link>

        <p
          className={`text-sm text-muted mb-4 flex-1 ${
            isList ? 'line-clamp-2' : 'line-clamp-3'
          }`}
        >
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
