'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

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
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="bg-surface-el rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group flex flex-col h-full">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.frontmatter.image || '/citydraw.png'}
            alt={post.frontmatter.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-el/80 to-transparent" />
        </div>
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        <p className="text-xs text-muted mb-2 flex items-center gap-1.5">
          <FaCalendarAlt /> {post.frontmatter.date}
        </p>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="font-display text-xl font-semibold text-fore hover:text-accent transition mb-2 line-clamp-2">
            {post.frontmatter.title}
          </h2>
        </Link>

        <p className="text-sm text-muted line-clamp-3 mb-4 flex-1">
          {post.frontmatter.excerpt}
        </p>

        {post.frontmatter.keywords && post.frontmatter.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.frontmatter.keywords.slice(0, 3).map((kw) => (
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
          href={`/blog/${post.slug}`}
          className="text-sm font-semibold text-accent hover:text-accent-hover inline-flex items-center gap-1 mt-auto group/link"
        >
          Read more
          <FaArrowRight size={10} className="transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
