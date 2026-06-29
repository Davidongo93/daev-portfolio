import { NextRequest, NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
import { db } from '../../../../db';
import { comments } from '../../../../db/schema';
import { auth } from '../../../../auth';

export const dynamic = 'force-dynamic';

// DELETE /api/comments/:id → soft-delete. Only the author can remove their own
// comment; soft-delete keeps the row so threaded replies stay anchored.
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const [target] = await db
    .select({ id: comments.id, userId: comments.userId })
    .from(comments)
    .where(eq(comments.id, params.id))
    .limit(1);

  if (!target) return NextResponse.json({ error: 'not found' }, { status: 404 });
  if (target.userId !== session.user.id) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  await db
    .update(comments)
    .set({ deletedAt: new Date(), body: '', updatedAt: new Date() })
    .where(and(eq(comments.id, params.id), eq(comments.userId, session.user.id)));

  return NextResponse.json({ ok: true });
}
