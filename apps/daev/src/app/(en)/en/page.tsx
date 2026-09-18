import Home from '@/views/Home/Home';
import { latestHomePosts } from '@/lib/homePosts';

export default function Index() {
  return <Home posts={latestHomePosts()} />;
}
