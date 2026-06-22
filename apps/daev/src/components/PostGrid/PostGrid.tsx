'use client';
import { useState } from 'react';
import PostCard from '../PostCard/PostCard';
import SearchBar from '../SearchBar/SearchBar';
import SortDropdown from '../SortDropDown/SortDropDown';
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

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const { t } = useLang();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [sortOption, setSortOption] = useState<'title' | 'date'>('date');

  const handleSearch = (searchTerm: string) => {
    if (searchTerm === '') {
      setFilteredPosts(posts);
      return;
    }
    const term = searchTerm.toLowerCase();
    setFilteredPosts(
      posts.filter(
        (p) =>
          p.frontmatter.title.toLowerCase().includes(term) ||
          p.frontmatter.excerpt.toLowerCase().includes(term) ||
          p.frontmatter.keywords?.some((kw) => kw.toLowerCase().includes(term))
      )
    );
  };

  const handleSortChange = (option: 'title' | 'date') => {
    setSortOption(option);
    setFilteredPosts((prev) =>
      [...prev].sort((a, b) =>
        option === 'title'
          ? a.frontmatter.title.localeCompare(b.frontmatter.title)
          : new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
      )
    );
  };

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
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-10">
            <SearchBar onSearch={handleSearch} placeholder={t.blog.search} />
            <SortDropdown
              sortOption={sortOption}
              onSortChange={handleSortChange}
              labels={{ title: t.blog.sortTitle, date: t.blog.sortDate }}
            />
          </div>

          {/* Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted py-16">{t.blog.noResults}</p>
          )}
        </>
      )}
    </div>
  );
};

export default PostGrid;
