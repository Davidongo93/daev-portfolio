import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

// Función para obtener todos los posts
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

// Esta es la página principal del blog
const BlogPage = async () => {
  const posts = await getPosts();

  return (
    <div className="bg-white-01 text-gray-200 min-h-screen flex flex-col items-center">
      <div className="container">
        <h1 className="text-4xl text-blue-500 font-bold mt-10 mb-6 text-center">
          Blog
        </h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="bg-blue-900 p-4 rounded shadow">
              <Link href={`/blog/${post.slug}`} className="text-2xl text-blue-300 hover:underline">
                {post.frontmatter.title}
              </Link>
              <p className="text-sm text-gray-400 mt-2">
                {post.frontmatter.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogPage;
