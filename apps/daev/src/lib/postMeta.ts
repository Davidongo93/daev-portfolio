// Single source of truth for a post's authorship and dates.
//
// Three places need to answer the same two questions — who wrote this post and
// when was it last touched: the article page (visible byline + JSON-LD), the
// RSS feed (<dc:creator>, <pubDate>) and the sitemap (<lastmod>). Before this
// helper each of them guessed on its own, and two of them guessed wrong: every
// post was attributed to the site owner even when the text was a guest piece,
// and the sitemap read the file's mtime — which git resets to checkout time on
// every deploy, so all posts claimed to have been modified today, forever.

import { siteConfig } from '../config/site';

/** The frontmatter fields this module reads. Everything else is ignored. */
export interface PostMetaFrontmatter {
  date?: string;
  /** Date of the last substantive revision. Absent means "never revised". */
  updated?: string;
  /** Set only when the text is NOT the site owner's. */
  author?: string;
  authorUrl?: string;
  /** ISO language code of the body. Posts are Spanish unless stated. */
  lang?: string;
}

export interface PostAuthor {
  name: string;
  url?: string;
  /** False for guest pieces, which must not claim the owner's Person entity. */
  isSiteOwner: boolean;
}

export interface PostDates {
  published: string;
  /** Falls back to the publication date — never to "now". */
  modified: string;
  /** True only when `updated` is set and actually differs from `date`. */
  wasRevised: boolean;
}

export const DEFAULT_POST_LANG = 'es';

export function resolveAuthor(frontmatter: PostMetaFrontmatter): PostAuthor {
  const declared = frontmatter.author?.trim();

  if (!declared || declared === siteConfig.name) {
    return { name: siteConfig.name, url: siteConfig.siteUrl, isSiteOwner: true };
  }

  return {
    name: declared,
    url: frontmatter.authorUrl?.trim() || undefined,
    isSiteOwner: false,
  };
}

export function resolveDates(frontmatter: PostMetaFrontmatter): PostDates {
  const published = frontmatter.date ?? '';
  const updated = frontmatter.updated?.trim();
  const wasRevised = Boolean(updated) && updated !== published;

  return {
    published,
    modified: wasRevised ? (updated as string) : published,
    wasRevised,
  };
}

export function resolveLang(frontmatter: PostMetaFrontmatter): string {
  return frontmatter.lang?.trim() || DEFAULT_POST_LANG;
}

/**
 * schema.org author node. The owner's posts reference the site-wide Person
 * entity by @id so every article reinforces the same entity; a guest author is
 * a plain Person, so nothing is falsely attributed to the owner.
 */
export function authorJsonLd(author: PostAuthor) {
  if (author.isSiteOwner) {
    return {
      '@type': 'Person',
      '@id': `${siteConfig.siteUrl}#person`,
      name: author.name,
      url: siteConfig.siteUrl,
    };
  }

  return {
    '@type': 'Person',
    name: author.name,
    ...(author.url ? { url: author.url } : {}),
  };
}

/**
 * Parses a frontmatter date into a Date for feeds and sitemaps. Returns null
 * for missing or malformed values so callers can decide the fallback instead of
 * silently getting the epoch or today's date.
 */
export function toDate(value: string | undefined): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}
