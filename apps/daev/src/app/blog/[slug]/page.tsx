import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Markdown from 'react-markdown';
import Link from 'next/link';
import HeroSection from '../../../components/HeroSection/HeroSection';

// Definición de tipos simplificada
type Post = {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    [key: string]: any;
  };
};

// Esta es la clave: Usamos el tipo que Next.js espera directamente
export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'posts');
  return fs.readdirSync(postsDir).map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}

async function getPostData(slug: string) {
  const fullPath = path.join(process.cwd(), 'posts', `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data: frontmatter, content } = matter(fileContents);
  return { frontmatter, content };
}

async function getAllPosts(): Promise<Post[]> {
  const postsDir = path.join(process.cwd(), 'posts');
  return fs
    .readdirSync(postsDir)
    .map((filename) => {
      const slug = filename.replace('.md', '');
      const fullPath = path.join(postsDir, filename);
      const { data: frontmatter } = matter(fs.readFileSync(fullPath, 'utf8'));

      if (
        typeof frontmatter.title === 'string' &&
        typeof frontmatter.date === 'string'
      ) {
        return { slug, frontmatter };
      }

      return null; // Filter out invalid posts
    })
    .filter((post): post is Post => post !== null); // Type guard to ensure only valid posts
}

// Componente principal - ¡No necesitamos definir las props manualmente!
export default async function Page({ params }: { params: { slug: string } }) {
  const { frontmatter, content } = await getPostData(params.slug);
  const allPosts = await getAllPosts();

  const currentIndex = allPosts.findIndex((post) => post.slug === params.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <>
      <HeroSection />
      <div className="container mx-auto px-4 min-h-screen flex flex-col items-center">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full mt-10">
          <h1 className="text-3xl font-semibold text-gray-800 text-center mb-4">
            {frontmatter.title}
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            {new Date(frontmatter.date).toLocaleDateString()}
          </p>
          <div className="prose prose-gray max-w-none">
            <Markdown>{content}</Markdown>
          </div>

          <div className="flex justify-between mt-10">
            {prevPost && (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="text-blue-600 hover:text-blue-800 px-4 py-2 bg-gray-100 rounded"
              >
                ⬅️ Anterior
              </Link>
            )}

            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-800 px-4 py-2 bg-gray-100 rounded"
            >
              🏠 Volver
            </Link>

            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="text-blue-600 hover:text-blue-800 px-4 py-2 bg-gray-100 rounded"
              >
                Siguiente ➡️
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
