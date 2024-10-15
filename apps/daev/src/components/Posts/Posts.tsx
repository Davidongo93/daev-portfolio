import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PostGrid from '../../components/PostGrid/PostGrid'; // Este será el componente del cliente

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
  };
}

// Función para obtener los posts desde el servidor (lectura de archivos)
const getPosts = async (): Promise<Post[]> => {
  const files = fs.readdirSync(path.join('posts'));

  const posts: Post[] = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const filePath = path.join('posts', filename);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter } = matter(fileContents);

    return {
      slug,
      frontmatter: {
        title: frontmatter.title || 'Untitled',
        date: frontmatter.date || 'No date',
        excerpt: frontmatter.excerpt || 'No excerpt available',
      },
    };
  });

  return posts;
};

// Componente de página (servidor)
const Posts = async () => {
  const posts = await getPosts(); // Obtener los posts en el lado del servidor

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl text-blue-500 font-bold mt-10 mb-6 text-center">Blog</h1>
      <PostGrid posts={posts} /> {/* Pasar los posts al componente del cliente */}
    </div>
  );
};

export default Posts;
