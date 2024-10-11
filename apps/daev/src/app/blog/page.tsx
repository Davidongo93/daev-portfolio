import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import HeroSection from '../../components/HeroSection/HeroSection';

// Función para obtener todos los posts en el lado del servidor
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

// Página principal del blog
const BlogPage = async () => {
  const posts = await getPosts(); // Obtener los posts desde el servidor

  return (
    <>
      <HeroSection />
      <div className="bg-white-01 text-gray-200 min-h-screen flex flex-col items-center">
        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 container mx-auto mt-10">
          <h1 className="text-4xl text-blue-500 font-bold mt-10 mb-6 text-center">
            Blog
          </h1>
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.slug} className="bg-white bg-opacity-90 p-4 rounded shadow">
                <Link href={`/blog/${post.slug}`} className="text-2xl text-blue-700 hover:underline">
                  {post.frontmatter.title}
                </Link>
                <p className="text-sm text-gray-500 mt-2">
                  {post.frontmatter.date}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-8">
            <Link href="/" className="text-blue-500 hover:text-blue-700 px-4 py-2 bg-white bg-opacity-80 rounded shadow">
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
