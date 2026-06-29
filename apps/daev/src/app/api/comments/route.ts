import { NextRequest, NextResponse } from 'next/server';
import { and, asc, eq, inArray } from 'drizzle-orm';
import { db } from '../../../db';
import { comments, reactions, users } from '../../../db/schema';
import { auth } from '../../../auth';
import { verifyTurnstile } from '../../../lib/turnstile';

export const dynamic = 'force-dynamic';

const MAX_LEN = 5000;

// GET /api/comments?slug=... → flat list (client builds the thread tree),
// each row carrying its author and aggregated reactions.
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'missing slug' }, { status: 400 });

  const session = await auth();
  const meId = session?.user?.id;

  const rows = await db
    .select({
      id: comments.id,
      parentId: comments.parentId,
      body: comments.body,
      createdAt: comments.createdAt,
      deletedAt: comments.deletedAt,
      authorId: users.id,
      authorName: users.name,
      authorImage: users.image,
    })
    .from(comments)
    .innerJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.postSlug, slug))
    .orderBy(asc(comments.createdAt));

  const ids = rows.map((r) => r.id);
  const reactionRows = ids.length
    ? await db
        .select()
        .from(reactions)
        .where(and(eq(reactions.targetType, 'comment'), inArray(reactions.targetId, ids)))
    : [];

  // counts[commentId][emoji] = n · mine[commentId] = [emoji,...]
  const counts: Record<string, Record<string, number>> = {};
  const mine: Record<string, string[]> = {};
  for (const r of reactionRows) {
    (counts[r.targetId] ??= {})[r.emoji] = (counts[r.targetId]?.[r.emoji] ?? 0) + 1;
    if (meId && r.userId === meId) (mine[r.targetId] ??= []).push(r.emoji);
  }

  const data = rows.map((r) => {
    const deleted = !!r.deletedAt;
    return {
      id: r.id,
      parentId: r.parentId,
      body: deleted ? null : r.body,
      deleted,
      createdAt: r.createdAt,
      author: deleted
        ? null
        : { id: r.authorId, name: r.authorName, image: r.authorImage },
      reactions: counts[r.id] ?? {},
      myReactions: mine[r.id] ?? [],
    };
  });

  return NextResponse.json({ comments: data, me: meId ?? null });
}

// POST /api/comments → create a comment (requires login + Turnstile).
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // Block banned accounts without deleting their history.
  const [me] = await db
    .select({ banned: users.isBanned })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);
  if (me?.banned) return NextResponse.json({ error: 'banned' }, { status: 403 });

  const { slug, body, parentId, turnstileToken } = await req.json().catch(() => ({}));

  if (typeof slug !== 'string' || !slug) {
    return NextResponse.json({ error: 'missing slug' }, { status: 400 });
  }
  const text = typeof body === 'string' ? body.trim() : '';
  if (!text) return NextResponse.json({ error: 'empty comment' }, { status: 400 });
  if (text.length > MAX_LEN) {
    return NextResponse.json({ error: 'comment too long' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ok = await verifyTurnstile(turnstileToken, ip);
  if (!ok) return NextResponse.json({ error: 'captcha failed' }, { status: 400 });

  // If it's a reply, the parent must exist and live on the same post.
  if (parentId) {
    const [parent] = await db
      .select({ id: comments.id, slug: comments.postSlug })
      .from(comments)
      .where(eq(comments.id, parentId))
      .limit(1);
    if (!parent || parent.slug !== slug) {
      return NextResponse.json({ error: 'invalid parent' }, { status: 400 });
    }
  }

  const [created] = await db
    .insert(comments)
    .values({ postSlug: slug, userId: session.user.id, parentId: parentId ?? null, body: text })
    .returning();

  return NextResponse.json({
    comment: {
      id: created.id,
      parentId: created.parentId,
      body: created.body,
      deleted: false,
      createdAt: created.createdAt,
      author: {
        id: session.user.id,
        name: session.user.name ?? null,
        image: session.user.image ?? null,
      },
      reactions: {},
      myReactions: [],
    },
  });
}
