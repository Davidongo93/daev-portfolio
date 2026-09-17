// The one place that reads the posts directory.
//
// Four modules used to open `posts/` themselves — the article page, the blog
// index, the RSS feed and the sitemap — each re-deriving the directory path and
// the "skip files starting with _" rule. Two of them drifted and shipped wrong
// data (guest posts credited to the owner, lastmod taken from the file mtime).
// Everything that needs posts now goes through here.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { PostMetaFrontmatter } from './postMeta';
import { estimateReadingTime } from './readingTime';

export interface PostFrontmatter extends PostMetaFrontmatter {
  title: string;
  excerpt?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  /** Slugs from the controlled vocabulary in config/topics.ts. */
  topics?: string[];
  /** Set to false for a purely visual post: alt text stays, captions hide. */
  captions?: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  /**
   * Minutes to read. Computed here because parsing a post already reads the
   * whole file — deriving it costs nothing and keeps the blog index, the topic
   * pages and the article header showing the same number.
   */
  readingTime: number;
}

export interface PostWithContent extends Post {
  content: string;
}

/**
 * Next runs the app from the app directory in production and from the
 * workspace root in some Nx targets, so both locations are probed.
 */
function resolvePostsDirectory(): string {
  const local = path.join(process.cwd(), 'posts');
  return fs.existsSync(local) ? local : path.join(process.cwd(), 'apps/daev/posts');
}

export const postsDirectory = resolvePostsDirectory();

/** Drafts are prefixed with `_` and are never published or listed. */
function isPublished(filename: string): boolean {
  return filename.endsWith('.md') && !filename.startsWith('_');
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter(isPublished)
    .map((filename) => filename.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: string): PostWithContent {
  // The route param arrives URL-encoded (e.g. spaces -> %20). Decode it so the
  // filesystem path matches the real file name on disk.
  const decoded = decodeURIComponent(slug);
  const raw = fs.readFileSync(path.join(postsDirectory, `${decoded}.md`), 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug: decoded,
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: estimateReadingTime(content),
  };
}

/**
 * Like getPostBySlug but returns null instead of throwing when the slug does
 * not exist. Routes use this to answer 404 rather than 500 — /blog/tema, for
 * one, reaches the [slug] route as a slug with no file behind it.
 */
export function findPostBySlug(slug: string): PostWithContent | null {
  const decoded = decodeURIComponent(slug);
  if (!getPostSlugs().includes(decoded)) return null;
  return getPostBySlug(decoded);
}

/** Every published post, newest first. */
export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(postsDirectory, `${slug}.md`), 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug,
        frontmatter: data as PostFrontmatter,
        readingTime: estimateReadingTime(content),
      };
    })
    .sort(byDateDesc);
}

export function byDateDesc(a: Post, b: Post): number {
  const toTime = (value?: string) => {
    const parsed = value ? new Date(value) : null;
    return parsed && !Number.isNaN(parsed.getTime()) ? parsed.getTime() : 0;
  };
  return toTime(b.frontmatter.date) - toTime(a.frontmatter.date);
}
