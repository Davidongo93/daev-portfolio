import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Markdown from 'react-markdown';
import Link from 'next/link';
import HeroSection from '../../../components/HeroSection/HeroSection';

// Genera las rutas estáticas para cada post basado en el slug
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('posts'));

  return files.map((filename) => ({
    slug: filename.replace('.md', ''), // Elimina la extensión del archivo
  }));
}

// Obtiene el contenido del post basado en el slug
async function getPostData(slug: string) {
  const filePath = path.join('posts', `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContents);

  return { frontmatter, content };
}

// Componente del Post individual
const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const { frontmatter, content } = await getPostData(params.slug);
  const posts = await getPosts(); // Traer todos los posts para la navegación

  const currentIndex = posts.findIndex((post) => post.slug === params.slug);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <>
      <HeroSection />
      <div className="bg-white-01 text-gray-200 min-h-screen flex flex-col items-center">
        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 container mx-auto mt-10">
          <h1 className="text-4xl text-blue-500 font-bold mb-6 text-center">
            {frontmatter.title}
          </h1>
          <div className="prose prose-blue prose-invert max-w-none">
            <Markdown>{content}</Markdown>
          </div>

          <div className="flex justify-between mt-10">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="text-blue-500 hover:text-blue-700 px-4 py-2 bg-white bg-opacity-80 rounded shadow">
                ⬅️ Anterior
              </Link>
            ) : (
              <span></span>
            )}

            <Link href="/blog" className="text-blue-500 hover:text-blue-700 px-4 py-2 bg-white bg-opacity-80 rounded shadow">
              🏠 Posts
            </Link>

            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="text-blue-500 hover:text-blue-700 px-4 py-2 bg-white bg-opacity-80 rounded shadow">
                Siguiente ➡️
              </Link>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Función para obtener los posts (reutilizada para la navegación)
async function getPosts() {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const filePath = path.join('posts', filename);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter } = matter(fileContents);

    return {
      slug,
      frontmatter,
    };
  });

  return posts;
}

export default BlogPost;
