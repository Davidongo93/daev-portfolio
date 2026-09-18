'use client';
import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import PostCard from '../PostCard/PostCard';
import { useLang } from '../../context/LangContext';

export interface HomePost {
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

/**
 * Latest posts on the home page. The posts are read on the server and handed
 * down as props, because `posts.ts` touches the filesystem and the home view is
 * a client component.
 */
const BlogSection: React.FC<{ posts: HomePost[] }> = ({ posts }) => {
  const { t } = useLang();

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="bg-bg py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-12 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-fore md:text-4xl">
            {t.blogHome.title}
          </h2>
          <p className="mx-auto max-w-2xl text-muted">{t.blogHome.subtitle}</p>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-accent" />
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} variant="grid" />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-fore transition-all hover:border-accent hover:text-accent"
          >
            {t.blogHome.readAll} <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
