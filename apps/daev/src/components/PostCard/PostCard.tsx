import Image from "next/legacy/image";

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
    image?: string;
    keywords?: string[];
    related_posts?: RelatedPost[];
  };
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out hover:bg-white/90 hover:scale-105 transform hover:-translate-y-1">
      {/* Imagen destacada */}
      <div className="relative overflow-hidden rounded-xl mb-4">
      <Image
  src={post.frontmatter.image || '/default-image.jpg'} // Usa una imagen por defecto si `post.frontmatter.image` es undefined
  alt={post.frontmatter.title}
  width={100}
  height={100}
  className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
/>
      </div>

      {/* Título y descripción */}
      <div className="relative">
        <a href={`/blog/${post.slug}`}>
          <h2 className="text-3xl font-bold text-blue-700 hover:underline transition-all duration-300 ease-in-out">
            {post.frontmatter.title}
          </h2>
        </a>
        <p className="text-sm text-gray-500 mt-2">{post.frontmatter.date}</p>
        <p className="text-gray-700 mt-4">{post.frontmatter.excerpt}</p>

        {/* Palabras clave */}
        <div className="mt-4 flex flex-wrap gap-2">
          {post.frontmatter.keywords?.map((keyword, index) => (
            <span 
              key={index}
              className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold"
            >
              #{keyword}
            </span>
          ))}
        </div>

        {/* Posts relacionados */}
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold text-gray-600 mb-2">Posts Relacionados</h3>
          <ul className="space-y-2">
            {post.frontmatter.related_posts?.map((related, index) => (
              <li key={index}>
                <a href={related.slug} className="text-blue-500 hover:underline">
                  {related.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
