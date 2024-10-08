import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Markdown from 'react-markdown';

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

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  const { frontmatter, content } = await getPostData(params.slug);

  return (
    <div className="bg-white-01 text-gray-200 min-h-screen flex flex-col items-center">
      <div className="container mt-10">
        <h1 className="text-4xl text-blue-500 font-bold mb-6 text-center">
          {frontmatter.title}
        </h1>
        <div className="prose prose-blue prose-invert max-w-none">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
