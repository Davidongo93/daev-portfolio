import HeroSection from '../../components/HeroSection/HeroSection';
import PostGrid from '../../components/PostGrid/PostGrid';
import PostProvider from '../../components/PostProvider/PostProvider';

const BlogPage = () => {
  return (
    <>
    <HeroSection/>
    
    <PostProvider>
      {(posts) => (
        <div className='flex justify-center items-center'>
          <PostGrid posts={posts} /> {/* Renderiza los posts usando el componente PostGrid */}
          {/* Aquí puedes agregar más componentes según necesites */}
        </div>
      )}
    </PostProvider>
    </>
  );
};

export default BlogPage;
