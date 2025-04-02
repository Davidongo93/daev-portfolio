'use client';
import { useState } from 'react';
import PostCard from '../PostCard/PostCard';
import SearchBar from '../SearchBar/SearchBar';
import SortDropdown from '../SortDropDown/SortDropDown';
import Footer from '../Footer/Footer';

interface RelatedPost {
  title: string;
  slug: string;
}

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    image?: string;
    keywords?: string[];
    related_posts?: RelatedPost[];
  };
}

interface PostGridProps {
  posts: Post[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [sortOption, setSortOption] = useState<'title' | 'date'>('title');

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
      return;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    setFilteredPosts(
      posts.filter(
        (post) =>
          post.frontmatter.title.toLowerCase().includes(lowerSearchTerm) ||
          post.frontmatter.excerpt.toLowerCase().includes(lowerSearchTerm) ||
          post.frontmatter.keywords?.some((keyword) =>
            keyword.toLowerCase().includes(lowerSearchTerm)
          )
      )
    );
  };

  const handleSortChange = (option: 'title' | 'date') => {
    setSortOption(option);
    setFilteredPosts(
      [...filteredPosts].sort((a, b) =>
        option === 'title'
          ? a.frontmatter.title.localeCompare(b.frontmatter.title)
          : new Date(b.frontmatter.date).getTime() -
            new Date(a.frontmatter.date).getTime()
      )
    );
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-4xl font-bold text-gray-800 py-4">
        Blog
      </h1>

      <nav className="flex flex-wrap justify-center gap-4 mb-6">
        <SearchBar onSearch={handleSearch} />
        <SortDropdown sortOption={sortOption} onSortChange={handleSortChange} />
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No hay publicaciones disponibles.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PostGrid;
