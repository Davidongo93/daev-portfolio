'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaRegCommentDots } from 'react-icons/fa';
import { useLang } from '../../context/LangContext';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import ReactionBar from './ReactionBar';
import { UserBadge } from './AuthButtons';

export interface CommentNode {
  id: string;
  parentId: string | null;
  body: string | null;
  deleted: boolean;
  createdAt: string;
  author: { id: string; name: string | null; image: string | null } | null;
  reactions: Record<string, number>;
  myReactions: string[];
  children: CommentNode[];
}

interface Props {
  slug: string;
}

// Build a parent→children tree from the flat list the API returns.
function buildTree(items: CommentNode[]): CommentNode[] {
  const map = new Map<string, CommentNode>();
  items.forEach((c) => map.set(c.id, { ...c, children: [] }));
  const roots: CommentNode[] = [];
  for (const c of map.values()) {
    if (c.parentId && map.has(c.parentId)) {
      map.get(c.parentId)!.children.push(c);
    } else {
      roots.push(c);
    }
  }
  return roots;
}

export default function CommentsSection({ slug }: Props) {
  const { t } = useLang();
  const { data: session } = useSession();
  const [items, setItems] = useState<CommentNode[]>([]);
  const [postReactions, setPostReactions] = useState<{
    counts: Record<string, number>;
    mine: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const meId = session?.user?.id ?? null;

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch(`/api/comments?slug=${encodeURIComponent(slug)}`).then((r) => r.json()),
      fetch(`/api/reactions?targetType=post&targetId=${encodeURIComponent(slug)}`).then((r) =>
        r.json()
      ),
    ])
      .then(([c, pr]) => {
        if (!active) return;
        setItems(c.comments ?? []);
        setPostReactions({ counts: pr.counts ?? {}, mine: pr.mine ?? [] });
      })
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // Re-fetch "mine" markers when the auth state changes.
  }, [slug, meId]);

  const tree = useMemo(() => buildTree(items), [items]);
  const total = items.filter((c) => !c.deleted).length;

  const addComment = useCallback((c: CommentNode) => {
    setItems((prev) => [...prev, c]);
  }, []);

  const markDeleted = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, deleted: true, body: null, author: null } : c))
    );
  }, []);

  return (
    <section
      id="comments"
      className="mt-16 pt-10 border-t border-border scroll-mt-24 animate-fade-in"
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="font-display font-bold text-2xl text-fore inline-flex items-center gap-2.5">
          <FaRegCommentDots className="text-accent" />
          {t.comments.title}
          {total > 0 && <span className="text-base font-normal text-muted">({total})</span>}
        </h2>
        <UserBadge />
      </div>

      {/* Post-level reactions */}
      <div className="mb-8 rounded-xl border border-border bg-surface-el/50 p-4">
        <p className="text-sm text-muted mb-2.5">{t.comments.reactToPost}</p>
        {postReactions && (
          <ReactionBar
            targetType="post"
            targetId={slug}
            initialCounts={postReactions.counts}
            initialMine={postReactions.mine}
            size="md"
          />
        )}
      </div>

      {/* New top-level comment */}
      <div className="mb-10">
        <CommentForm postSlug={slug} onPosted={addComment} />
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-4">
          {[0, 1].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-surface-el animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <p className="text-sm text-muted">{t.comments.loadError}</p>
      ) : tree.length === 0 ? (
        <p className="text-sm text-muted">{t.comments.empty}</p>
      ) : (
        <div className="space-y-1">
          {tree.map((node) => (
            <CommentItem
              key={node.id}
              node={node}
              postSlug={slug}
              meId={meId}
              depth={0}
              onReplyPosted={addComment}
              onDeleted={markDeleted}
            />
          ))}
        </div>
      )}
    </section>
  );
}
