'use client';
import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useLang } from '../../context/LangContext';
import Turnstile, { type TurnstileHandle } from './Turnstile';
import { SignInButtons } from './AuthButtons';
import type { CommentNode } from './CommentsSection';

interface Props {
  postSlug: string;
  parentId?: string;
  placeholder?: string;
  autoFocus?: boolean;
  onPosted: (comment: CommentNode) => void;
  onCancel?: () => void;
}

export default function CommentForm({
  postSlug,
  parentId,
  placeholder,
  autoFocus,
  onPosted,
  onCancel,
}: Props) {
  const { status } = useSession();
  const { t } = useLang();
  const [body, setBody] = useState('');
  const [token, setToken] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const turnstileRef = useRef<TurnstileHandle>(null);

  if (status !== 'authenticated') {
    return (
      <div className="rounded-xl border border-border bg-surface-el/60 p-4">
        <p className="text-sm text-muted mb-2">{t.comments.signInPrompt}</p>
        <SignInButtons compact />
      </div>
    );
  }

  const submit = async () => {
    const text = body.trim();
    if (!text || submitting) return;
    if (!token) {
      setError(t.comments.verifying);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug: postSlug, body: text, parentId, turnstileToken: token }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error === 'captcha failed' ? t.comments.captchaError : t.comments.loadError);
        turnstileRef.current?.reset();
        setToken('');
        return;
      }
      const data = (await res.json()) as { comment: CommentNode };
      onPosted({ ...data.comment, children: [] });
      setBody('');
      setToken('');
      turnstileRef.current?.reset();
      onCancel?.();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={placeholder ?? t.comments.placeholder}
        autoFocus={autoFocus}
        rows={parentId ? 2 : 3}
        className="w-full px-4 py-3 rounded-lg bg-surface-el border border-border text-fore placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/40 transition resize-y"
      />
      <Turnstile ref={turnstileRef} onVerify={setToken} onExpire={() => setToken('')} />
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div className="flex items-center gap-2">
        <button
          onClick={submit}
          disabled={submitting || !body.trim()}
          className="px-4 py-2 rounded-lg bg-accent text-bg text-sm font-semibold hover:bg-accent-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? t.comments.posting : t.comments.submit}
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-border text-muted text-sm hover:text-accent hover:border-accent transition"
          >
            {t.comments.cancel}
          </button>
        )}
      </div>
    </div>
  );
}
