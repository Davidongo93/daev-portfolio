// Allowed reaction emojis. Kept on the server so the API rejects anything
// outside this set, and shared with the UI so buttons stay in sync.
export const REACTION_EMOJIS = ['👍', '❤️', '😂', '🎉', '🤔'] as const;
export type ReactionEmoji = (typeof REACTION_EMOJIS)[number];

export type TargetType = 'post' | 'comment';

export function isReactionEmoji(value: unknown): value is ReactionEmoji {
  return typeof value === 'string' && (REACTION_EMOJIS as readonly string[]).includes(value);
}
