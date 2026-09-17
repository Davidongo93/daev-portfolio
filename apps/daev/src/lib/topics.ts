// Reads the controlled vocabulary in config/topics.ts against the published
// posts: which topics a post belongs to, which posts a topic holds, and which
// topics have earned an indexable page of their own.

import { blogTopics, blogTopicsBySlug, MIN_POSTS_PER_TOPIC, type BlogTopic } from '../config/topics';
import { getAllPosts, type Post } from './posts';

export interface TopicWithPosts {
  topic: BlogTopic;
  posts: Post[];
}

/** Topics declared by a post, in vocabulary order. Unknown slugs are dropped. */
export function topicsForPost(post: Post): BlogTopic[] {
  const declared = new Set(post.frontmatter.topics ?? []);
  return blogTopics.filter((topic) => declared.has(topic.slug));
}

export function getPostsForTopic(slug: string, posts = getAllPosts()): Post[] {
  return posts.filter((post) => post.frontmatter.topics?.includes(slug));
}

/** Every topic that holds at least one post, whether or not it has a page. */
export function getTopicsWithPosts(posts = getAllPosts()): TopicWithPosts[] {
  return blogTopics
    .map((topic) => ({ topic, posts: getPostsForTopic(topic.slug, posts) }))
    .filter((entry) => entry.posts.length > 0);
}

/**
 * Topics that get their own URL. A topic below the threshold still labels its
 * posts but does not become a page, so the blog never ships a topic page that
 * lists a single post.
 */
export function getIndexableTopics(posts = getAllPosts()): TopicWithPosts[] {
  return getTopicsWithPosts(posts).filter(
    (entry) => entry.posts.length >= MIN_POSTS_PER_TOPIC
  );
}

export function isIndexableTopic(slug: string, posts = getAllPosts()): boolean {
  return getPostsForTopic(slug, posts).length >= MIN_POSTS_PER_TOPIC;
}

export function getTopic(slug: string): BlogTopic | undefined {
  return blogTopicsBySlug.get(slug);
}

/**
 * Posts related to this one, most related first: the more topics two posts
 * share, the closer they are, and ties break towards the newer post. This is
 * what finally links the clusters together — before it, nine posts sat on the
 * site with almost no internal links between them.
 */
export function getRelatedPosts(post: Post, limit = 3, posts = getAllPosts()): Post[] {
  const own = new Set(post.frontmatter.topics ?? []);
  if (own.size === 0) return [];

  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      shared: (candidate.frontmatter.topics ?? []).filter((slug) => own.has(slug)).length,
    }))
    .filter((entry) => entry.shared > 0)
    // getAllPosts() is already newest-first, so a stable sort on the shared
    // count alone keeps recency as the tie-breaker.
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}
