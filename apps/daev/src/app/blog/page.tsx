import HeroSection from '../../components/HeroSection/HeroSection';

import PostGrid from '../../components/PostGrid/PostGrid';
import PostProvider from '../../components/PostProvider/PostProvider';

const BlogPage = () => {
  return (
    <>
    <HeroSection/>
    <PostProvider>
      {(posts) => (
        <div className="container mx-auto px-4">
          <h1 className="text-4xl text-blue-500 font-bold mt-10 mb-6 text-center">Blog</h1>
          <PostGrid posts={posts} /> {/* Renderiza los posts usando el componente PostGrid */}
          {/* Aquí puedes agregar más componentes según necesites */}
        </div>
      )}
    </PostProvider>
    </>
  );
};

export default BlogPage;
