import { ReactNode } from 'react';
import { estimateReadingTime } from '../../lib/readingTime';
import { resolveAuthor, resolveDates } from '../../lib/postMeta';
import { getAllPosts } from '../../lib/posts';

interface RelatedPost {
  title: string;
  slug: string;
}

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    /** Last substantive revision; equals `date` when never revised. */
    modified: string;
    /** Real author — guest posts are not credited to the site owner. */
    author: string;
    description: string;
    excerpt: string;
    image?: string; // Agregado campo opcional para la imagen
    keywords?: string[]; // Agregado campo opcional para las palabras clave
    related_posts?: RelatedPost[]; // Agregado campo opcional para posts relacionados
    readingTime: number; // Minutos estimados de lectura, calculado desde el contenido
  };
}

interface PostProviderProps {
  children: (posts: Post[]) => ReactNode;
}

const getPosts = (): Post[] =>
  getAllPosts().map(({ slug, frontmatter, readingTime }) => ({
    slug,
    frontmatter: {
      title: frontmatter.title || 'Untitled',
      date: frontmatter.date || 'No date',
      modified: resolveDates(frontmatter).modified,
      author: resolveAuthor(frontmatter).name,
      description: frontmatter.description || frontmatter.excerpt || '',
      excerpt: frontmatter.excerpt || 'No excerpt available',
      image: frontmatter.image || '',
      keywords: frontmatter.keywords || [],
      topics: frontmatter.topics || [],
      readingTime,
    },
  }));

// Componente que proporciona los posts
const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const posts = getPosts(); // Obtener los posts desde el servidor

  return <>{children(posts)}</>; // Renderiza los hijos pasando los posts
};

export default PostProvider;
