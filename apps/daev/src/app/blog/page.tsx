import PostGrid from '../../components/PostGrid/PostGrid';
import PostProvider from '../../components/PostProvider/PostProvider';

const BlogPage = () => {
  return (
    <PostProvider>
      {(posts) => (
        <main className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <PostGrid posts={posts} />
        </main>
      )}
    </PostProvider>
  );
};

export default BlogPage;
