'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { FaThLarge, FaList } from 'react-icons/fa';
import PostCard from '../PostCard/PostCard';
import SearchBar from '../SearchBar/SearchBar';
import SortDropdown, { SortOption } from '../SortDropDown/SortDropDown';
import BrandMark from '../Brand/BrandMark';
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

/** A topic that has its own page under /blog/tema/<slug>. */
interface TopicLink {
  slug: string;
  label: string;
  count: number;
}

interface PostGridProps {
  posts: Post[];
  topics?: TopicLink[];
}

type ViewMode = 'grid' | 'list';

const chipClass = (active: boolean) =>
  `text-xs font-medium px-3 py-1.5 rounded-full border transition ${
    active
      ? 'bg-accent text-bg border-accent'
      : 'bg-surface-el text-muted border-border hover:text-accent hover:border-accent'
  }`;

const PostGrid: React.FC<PostGridProps> = ({ posts, topics = [] }) => {
  const { t } = useLang();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortOption>('date-desc');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);
  const [view, setView] = useState<ViewMode>('grid');

  // Most keywords appear in exactly one post, so showing all of them turned
  // the filter row into six lines of chips that pushed the posts off screen.
  // Only keywords shared by more than one post filter anything worth filtering;
  // the rest stay one tap away.
  const { recurringTags, longTailTags } = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) =>
      p.frontmatter.keywords?.forEach((k) => counts.set(k, (counts.get(k) ?? 0) + 1))
    );
    const sorted = Array.from(counts.entries()).sort(([a], [b]) => a.localeCompare(b));
    return {
      recurringTags: sorted.filter(([, n]) => n > 1).map(([tag]) => tag),
      longTailTags: sorted.filter(([, n]) => n === 1).map(([tag]) => tag),
    };
  }, [posts]);

  const displayed = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = posts.filter((p) => {
      const matchesQuery =
        !term ||
        p.frontmatter.title.toLowerCase().includes(term) ||
        p.frontmatter.excerpt.toLowerCase().includes(term) ||
        p.frontmatter.keywords?.some((k) => k.toLowerCase().includes(term));
      const matchesTag = !activeTag || p.frontmatter.keywords?.includes(activeTag);
      return matchesQuery && matchesTag;
    });

    const byTitle = (a: Post, b: Post) =>
      a.frontmatter.title.localeCompare(b.frontmatter.title);

    return [...filtered].sort((a, b) => {
      if (sort === 'title') {
        return byTitle(a, b);
      }

      if (sort === 'read-asc' || sort === 'read-desc') {
        const diff =
          (a.frontmatter.readingTime ?? 0) - (b.frontmatter.readingTime ?? 0);
        // Posts con igual tiempo de lectura mantienen un orden A–Z estable.
        if (diff === 0) return byTitle(a, b);
        return sort === 'read-asc' ? diff : -diff;
      }

      const diff =
        new Date(a.frontmatter.date).getTime() -
        new Date(b.frontmatter.date).getTime();
      // Posts sharing a date keep a stable A–Z order instead of looking unsorted.
      if (diff === 0) return byTitle(a, b);
      return sort === 'date-asc' ? diff : -diff;
    });
  }, [posts, query, activeTag, sort]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-accent mb-3">
          /{t.blog.title.toLowerCase()}
        </h1>
        <p className="text-muted">{t.blog.subtitle}</p>
      </div>

      {posts.length === 0 ? (
        /* Empty blog — friendly branded "coming soon" state */
        <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
          <BrandMark size={88} />
          <p className="text-muted max-w-sm">{t.blog.comingSoon}</p>
        </div>
      ) : (
        <>
          {/* Controls */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-center">
              <SearchBar onSearch={setQuery} placeholder={t.blog.search} />
              <SortDropdown
                sortOption={sort}
                onSortChange={setSort}
                labels={{
                  newest: t.blog.sortNewest,
                  oldest: t.blog.sortOldest,
                  title: t.blog.sortTitle,
                  readLong: t.blog.sortReadLong,
                  readShort: t.blog.sortReadShort,
                }}
              />
              {/* View toggle */}
              <div className="flex items-center gap-1 self-center rounded-full border border-border bg-surface-el p-1">
                <button
                  type="button"
                  onClick={() => setView('grid')}
                  aria-label={t.blog.viewGrid}
                  aria-pressed={view === 'grid'}
                  className={`p-2 rounded-full transition ${
                    view === 'grid'
                      ? 'bg-accent text-bg'
                      : 'text-muted hover:text-accent'
                  }`}
                >
                  <FaThLarge size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setView('list')}
                  aria-label={t.blog.viewList}
                  aria-pressed={view === 'list'}
                  className={`p-2 rounded-full transition ${
                    view === 'list'
                      ? 'bg-accent text-bg'
                      : 'text-muted hover:text-accent'
                  }`}
                >
                  <FaList size={14} />
                </button>
              </div>
            </div>

            {/* Topics are navigation: each one is its own page. The tag
                chips below are filters and never leave this page. */}
            {topics.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {topics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/blog/tema/${topic.slug}`}
                    className="text-sm font-medium px-3.5 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-bg transition"
                  >
                    {topic.label} <span className="text-xs opacity-70">({topic.count})</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Tag filters */}
            {recurringTags.length + longTailTags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => setActiveTag(null)}
                  className={chipClass(activeTag === null)}
                >
                  {t.blog.allTopics}
                </button>
                {recurringTags.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={chipClass(activeTag === tag)}
                  >
                    #{tag}
                  </button>
                ))}
                {showAllTags &&
                  longTailTags.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                      className={chipClass(activeTag === tag)}
                    >
                      #{tag}
                    </button>
                  ))}
                {longTailTags.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowAllTags((open) => !open)}
                    aria-expanded={showAllTags}
                    className="text-xs font-medium px-3 py-1.5 rounded-full border border-dashed border-border text-muted hover:text-accent hover:border-accent transition"
                  >
                    {showAllTags
                      ? `− ${t.blog.fewerTags}`
                      : `+${longTailTags.length} ${t.blog.moreTags}`}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Results */}
          {displayed.length > 0 ? (
            view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayed.map((post) => (
                  <PostCard key={post.slug} post={post} variant="grid" />
                ))}
              </div>
            ) : (
              <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-surface divide-y divide-border overflow-hidden">
                {displayed.map((post) => (
                  <PostCard key={post.slug} post={post} variant="list" />
                ))}
              </div>
            )
          ) : (
            <p className="text-center text-muted py-16">{t.blog.noResults}</p>
          )}
        </>
      )}
    </div>
  );
};

export default PostGrid;
