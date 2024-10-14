'use client';
import { useState } from 'react';
import PostCard from '../PostCard/PostCard';
import SearchBar from '../SearchBar/SearchBar';
import SortDropdown from '../SortDropDown/SortDropDown';

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

// Componente que renderiza los posts en un grid
const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [sortOption, setSortOption] = useState<'title' | 'date'>('title');

  // Función para manejar la búsqueda
  const handleSearch = (searchTerm: string) => {
    if (searchTerm === '') {
      setFilteredPosts(posts); // Si no hay búsqueda, mostrar todos los posts
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
    <div className=" w-screen mx-auto px-4">
      <div className="flex justify-start items-center mb-4">
        <SearchBar onSearch={handleSearch} />
        <SortDropdown sortOption={sortOption} onSortChange={handleSortChange} /> {/* Añadir el dropdown de ordenamiento */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostGrid;
