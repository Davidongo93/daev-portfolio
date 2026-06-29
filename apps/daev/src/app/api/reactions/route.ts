import { NextRequest, NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
import { db } from '../../../db';
import { reactions } from '../../../db/schema';
import { auth } from '../../../auth';
import { isReactionEmoji, type TargetType } from '../../../lib/reactions';

export const dynamic = 'force-dynamic';

function isTargetType(v: unknown): v is TargetType {
  return v === 'post' || v === 'comment';
}

async function summary(targetType: TargetType, targetId: string, meId?: string) {
  const rows = await db
    .select({ emoji: reactions.emoji, userId: reactions.userId })
    .from(reactions)
    .where(and(eq(reactions.targetType, targetType), eq(reactions.targetId, targetId)));

  const counts: Record<string, number> = {};
  const mine: string[] = [];
  for (const r of rows) {
    counts[r.emoji] = (counts[r.emoji] ?? 0) + 1;
    if (meId && r.userId === meId) mine.push(r.emoji);
  }
  return { counts, mine };
}

// GET /api/reactions?targetType=post&targetId=slug
export async function GET(req: NextRequest) {
  const targetType = req.nextUrl.searchParams.get('targetType');
  const targetId = req.nextUrl.searchParams.get('targetId');
  if (!isTargetType(targetType) || !targetId) {
    return NextResponse.json({ error: 'bad target' }, { status: 400 });
  }
  const session = await auth();
  return NextResponse.json(await summary(targetType, targetId, session?.user?.id));
}

// POST /api/reactions → toggle one emoji for the current user on a target.
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { targetType, targetId, emoji } = await req.json().catch(() => ({}));
  if (!isTargetType(targetType) || typeof targetId !== 'string' || !targetId) {
    return NextResponse.json({ error: 'bad target' }, { status: 400 });
  }
  if (!isReactionEmoji(emoji)) {
    return NextResponse.json({ error: 'bad emoji' }, { status: 400 });
  }

  const where = and(
    eq(reactions.userId, session.user.id),
    eq(reactions.targetType, targetType),
    eq(reactions.targetId, targetId),
    eq(reactions.emoji, emoji)
  );

  const [existing] = await db.select({ id: reactions.id }).from(reactions).where(where).limit(1);

  if (existing) {
    await db.delete(reactions).where(where);
  } else {
    await db
      .insert(reactions)
      .values({ userId: session.user.id, targetType, targetId, emoji })
      .onConflictDoNothing();
  }

  return NextResponse.json(await summary(targetType, targetId, session.user.id));
}
