// Single source of truth for reading-time / word-count estimation.
//
// Counting raw markdown inflates the numbers badly for media-heavy posts: every
// image (`![caption](https://…long-url…)`) adds the caption words plus a long
// URL split into many "words". This strips media, links, code and markdown
// punctuation before counting, then derives minutes at ~200 wpm. Using the same
// helper in the post page and the blog card guarantees they always match.

const WORDS_PER_MINUTE = 200;

function cleanMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images: drop caption + url
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links: keep visible text only
    .replace(/<[^>]+>/g, ' ') // raw html tags
    .replace(/https?:\/\/\S+/g, ' ') // bare urls
    .replace(/[#>*_~`|-]/g, ' ') // markdown punctuation
    .replace(/\s+/g, ' ')
    .trim();
}

export function getReadingStats(markdown: string): { words: number; minutes: number } {
  const text = cleanMarkdown(markdown);
  const words = text ? text.split(' ').filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return { words, minutes };
}

export function estimateReadingTime(markdown: string): number {
  return getReadingStats(markdown).minutes;
}
