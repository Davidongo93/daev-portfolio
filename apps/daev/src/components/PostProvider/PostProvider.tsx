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
  };
}

interface PostProviderProps {
  children: (posts: Post[]) => ReactNode;
}

// Función para obtener los posts desde el servidor
const getPosts = (): Post[] => {
  try {
    const files = fs.readdirSync(path.join('posts')); // Leer archivos del directorio 'posts'

    const posts: Post[] = files.map((filename) => {
      const slug = filename.replace('.md', ''); // Eliminar extensión '.md' para obtener el slug
      const filePath = path.join('posts', filename); // Ruta completa del archivo
      const fileContents = fs.readFileSync(filePath, 'utf-8'); // Leer el contenido del archivo Markdown
      const { data: frontmatter } = matter(fileContents); // Extraer los metadatos de frontmatter

      return {
        slug,
        frontmatter: {
          title: frontmatter.title || 'Untitled',
          date: frontmatter.date || 'No date',
          excerpt: frontmatter.excerpt || 'No excerpt available',
          image: frontmatter.image || '', // Manejar la imagen si está disponible
          keywords: frontmatter.keywords || [], // Manejar las palabras clave si están disponibles
          related_posts: frontmatter.related_posts || [], // Manejar los posts relacionados si están disponibles
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
