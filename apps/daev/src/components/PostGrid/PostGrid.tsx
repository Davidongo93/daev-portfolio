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
    image: string;
    keywords: string[];
    related_posts: RelatedPost[];
  };
}

interface PostGridProps {
  posts: Post[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [sortOption, setSortOption] = useState<'title' | 'date'>('title');

  // Función para manejar la búsqueda
  const handleSearch = (searchTerm: string) => {
    if (searchTerm === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  // Función para manejar el ordenamiento
  const handleSortChange = (option: 'title' | 'date') => {
    setSortOption(option);
    let sortedPosts;

    if (option === 'title') {
      sortedPosts = [...filteredPosts].sort((a, b) =>
        a.frontmatter.title.localeCompare(b.frontmatter.title)
      );
    } else {
      sortedPosts = [...filteredPosts].sort((a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
      );
    }
    setFilteredPosts(sortedPosts);
  };

  return (
    <div className="">
        <h1 className="text-right text-4xl text-blue-500 font-bold backdrop-blur-lg rounded-sm shadow p-2">
          /blog
        </h1>
      <nav className="flex flex-col items-center mb-8 gap-2">
      <div className="flex items-center justify-start space-x-4 mt-4 w-auto">
          <SearchBar onSearch={handleSearch} />
          </div>
        <div className="flex items-center justify-center space-x-4 mt-4 w-auto">
          <SortDropdown sortOption={sortOption} onSortChange={handleSortChange} />
          <a href="/" className="px-4 bg-white-01 backdrop-blur-lg rounded shadow p-2">
            🏠
          </a>
        </div>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-8">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default PostGrid;
