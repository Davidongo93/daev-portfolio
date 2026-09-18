import { byDateDesc, getAllPosts } from './posts';
import type { HomePost } from '@/components/BlogSection/BlogSection';

/** How many posts the home page shows. One row on desktop. */
const HOME_POST_COUNT = 3;

/**
 * The newest posts, flattened into the plain shape the client-side home can
 * receive as props. `readingTime` is folded into the frontmatter because that
 * is where `PostCard` reads it from.
 */
export function latestHomePosts(count = HOME_POST_COUNT): HomePost[] {
  return getAllPosts()
    .sort(byDateDesc)
    .slice(0, count)
    .map((post) => ({
      slug: post.slug,
      frontmatter: {
        title: post.frontmatter.title,
        date: post.frontmatter.date ?? '',
        excerpt: post.frontmatter.excerpt ?? post.frontmatter.description ?? '',
        image: post.frontmatter.image,
        keywords: post.frontmatter.keywords,
        description: post.frontmatter.description,
        readingTime: post.readingTime,
      },
    }));
}
