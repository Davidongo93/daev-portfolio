'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FaReply, FaTrashAlt } from 'react-icons/fa';
import { useLang } from '../../context/LangContext';
import ReactionBar from './ReactionBar';
import CommentForm from './CommentForm';
import type { CommentNode } from './CommentsSection';

interface Props {
  node: CommentNode;
  postSlug: string;
  meId: string | null;
  depth: number;
  onReplyPosted: (reply: CommentNode) => void;
  onDeleted: (id: string) => void;
}

function timeAgo(iso: string, justNow: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return justNow;
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return new Date(iso).toLocaleDateString();
}

export default function CommentItem({
  node,
  postSlug,
  meId,
  depth,
  onReplyPosted,
  onDeleted,
}: Props) {
  const { t } = useLang();
  const [replying, setReplying] = useState(false);
  const isMine = !node.deleted && node.author?.id === meId;

  const remove = async () => {
    const res = await fetch(`/api/comments/${node.id}`, { method: 'DELETE' });
    if (res.ok) onDeleted(node.id);
  };

  // Cap visual indentation so deep threads stay readable on mobile.
  const indented = depth > 0;

  return (
    <div className={indented ? 'pl-3 sm:pl-5 border-l-2 border-border' : ''}>
      <div className="py-3">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-1.5">
          {node.deleted ? (
            <span className="w-7 h-7 rounded-full bg-surface-el grid place-items-center text-muted text-xs">
              ×
            </span>
          ) : node.author?.image ? (
            <Image
              src={node.author.image}
              alt={node.author.name ?? 'avatar'}
              width={28}
              height={28}
              className="rounded-full"
            />
          ) : (
            <span className="w-7 h-7 rounded-full bg-accent/20 text-accent grid place-items-center text-xs font-bold">
              {(node.author?.name ?? '?').charAt(0).toUpperCase()}
            </span>
          )}
          <span className="text-sm font-semibold text-fore">
            {node.deleted ? '—' : node.author?.name ?? 'Anon'}
          </span>
          <span className="text-xs text-muted">·</span>
          <span className="text-xs text-muted">{timeAgo(node.createdAt, t.comments.justNow)}</span>
        </div>

        {/* Body */}
        {node.deleted ? (
          <p className="text-sm text-muted italic">{t.comments.deleted}</p>
        ) : (
          <p className="text-sm text-fore whitespace-pre-wrap break-words">{node.body}</p>
        )}

        {/* Actions */}
        {!node.deleted && (
          <div className="flex flex-wrap items-center gap-3 mt-2.5">
            <ReactionBar
              targetType="comment"
              targetId={node.id}
              initialCounts={node.reactions}
              initialMine={node.myReactions}
            />
            <button
              onClick={() => setReplying((r) => !r)}
              className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition"
            >
              <FaReply size={11} /> {t.comments.reply}
            </button>
            {isMine && (
              <button
                onClick={remove}
                className="inline-flex items-center gap-1 text-xs text-muted hover:text-red-500 transition"
              >
                <FaTrashAlt size={11} /> {t.comments.delete}
              </button>
            )}
          </div>
        )}

        {/* Reply form */}
        {replying && (
          <div className="mt-3">
            <CommentForm
              postSlug={postSlug}
              parentId={node.id}
              placeholder={t.comments.replyPlaceholder}
              autoFocus
              onPosted={(reply) => {
                onReplyPosted(reply);
                setReplying(false);
              }}
              onCancel={() => setReplying(false)}
            />
          </div>
        )}
      </div>

      {/* Children */}
      {node.children.length > 0 && (
        <div className="space-y-0">
          {node.children.map((child) => (
            <CommentItem
              key={child.id}
              node={child}
              postSlug={postSlug}
              meId={meId}
              depth={depth + 1}
              onReplyPosted={onReplyPosted}
              onDeleted={onDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}
