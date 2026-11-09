import Home from '@/views/Home/Home';
import JsonLd from '@/components/JsonLd/JsonLd';
import { latestHomePosts } from '@/lib/homePosts';
import { homeJsonLd } from '@/lib/seo';

export default function Index() {
  return (
    <>
      <JsonLd data={homeJsonLd('en')} />
      <Home posts={latestHomePosts()} />
    </>
  );
}
