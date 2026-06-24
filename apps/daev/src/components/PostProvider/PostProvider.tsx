import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ReactNode } from 'react';

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
    image?: string; // Agregado campo opcional para la imagen
    keywords?: string[]; // Agregado campo opcional para las palabras clave
    related_posts?: RelatedPost[]; // Agregado campo opcional para posts relacionados
    readingTime: number; // Minutos estimados de lectura, calculado desde el contenido
  };
}

// Estimación de tiempo de lectura: ~200 palabras por minuto, mínimo 1 min.
const estimateReadingTime = (content: string): number => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

interface PostProviderProps {
  children: (posts: Post[]) => ReactNode;
}

const localPath = path.join(process.cwd(), 'posts');
const postsDirectory = fs.existsSync(localPath)
  ? localPath
  : path.join(process.cwd(), 'apps/daev/posts');

const getPosts = (): Post[] => {
  try {
    const files = fs
      .readdirSync(postsDirectory)
      .filter((f) => f.endsWith('.md') && !f.startsWith('_'));

    const posts: Post[] = files.map((filename) => {
      const slug = filename.replace('.md', '');
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter, content } = matter(fileContents);

      return {
        slug,
        frontmatter: {
          title: frontmatter.title || 'Untitled',
          date: frontmatter.date || 'No date',
          excerpt: frontmatter.excerpt || 'No excerpt available',
          image: frontmatter.image || '', // Manejar la imagen si está disponible
          keywords: frontmatter.keywords || [], // Manejar las palabras clave si están disponibles
          related_posts: frontmatter.related_posts || [], // Manejar los posts relacionados si están disponibles
          readingTime: estimateReadingTime(content), // Calculado desde el cuerpo del post
        },
      };
    });

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error); // Manejar errores al leer los archivos
    return [];
  }
};

// Componente que proporciona los posts
const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const posts = getPosts(); // Obtener los posts desde el servidor

  return <>{children(posts)}</>; // Renderiza los hijos pasando los posts
};

export default PostProvider;
