'use client';
import { useMemo, useState } from 'react';
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
  };
}

interface PostGridProps {
  posts: Post[];
}

type ViewMode = 'grid' | 'list';

const chipClass = (active: boolean) =>
  `text-xs font-medium px-3 py-1.5 rounded-full border transition ${
    active
      ? 'bg-accent text-bg border-accent'
      : 'bg-surface-el text-muted border-border hover:text-accent hover:border-accent'
  }`;

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const { t } = useLang();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortOption>('date-desc');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>('grid');

  const tags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.frontmatter.keywords?.forEach((k) => set.add(k)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
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

    return [...filtered].sort((a, b) => {
      if (sort === 'title') {
        return a.frontmatter.title.localeCompare(b.frontmatter.title);
      }
      const diff =
        new Date(a.frontmatter.date).getTime() -
        new Date(b.frontmatter.date).getTime();
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

            {/* Tag filters */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => setActiveTag(null)}
                  className={chipClass(activeTag === null)}
                >
                  {t.blog.allTopics}
                </button>
                {tags.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={chipClass(activeTag === tag)}
                  >
                    #{tag}
                  </button>
                ))}
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
              <div className="flex flex-col gap-4 max-w-3xl mx-auto">
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
