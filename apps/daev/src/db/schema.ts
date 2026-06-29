import {
  pgTable,
  text,
  timestamp,
  integer,
  primaryKey,
  uuid,
  index,
  uniqueIndex,
  type AnyPgColumn,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';

/* ─────────────────────────────────────────────────────────────
   Auth.js tables (shape expected by @auth/drizzle-adapter)
   ───────────────────────────────────────────────────────────── */

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  // App-level flag so we can ban abusive accounts without deleting their data.
  isBanned: timestamp('is_banned', { mode: 'date' }),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [primaryKey({ columns: [account.provider, account.providerAccountId] })]
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

/* ─────────────────────────────────────────────────────────────
   Blog: comments (threaded) + reactions (polymorphic)
   ───────────────────────────────────────────────────────────── */

export const comments = pgTable(
  'comment',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    postSlug: text('post_slug').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    // Self-reference for threaded replies. NULL = top-level comment.
    parentId: uuid('parent_id').references((): AnyPgColumn => comments.id, {
      onDelete: 'cascade',
    }),
    body: text('body').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    // Soft delete so child replies keep their place in the thread.
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
  },
  (t) => [index('comment_slug_idx').on(t.postSlug), index('comment_parent_idx').on(t.parentId)]
);

export const reactions = pgTable(
  'reaction',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    // 'post' -> targetId is the post slug · 'comment' -> targetId is a comment uuid
    targetType: text('target_type').notNull(),
    targetId: text('target_id').notNull(),
    emoji: text('emoji').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // One reaction of a given emoji per user per target.
    uniqueIndex('reaction_unique_idx').on(t.userId, t.targetType, t.targetId, t.emoji),
    index('reaction_target_idx').on(t.targetType, t.targetId),
  ]
);

export type Comment = typeof comments.$inferSelect;
export type Reaction = typeof reactions.$inferSelect;
