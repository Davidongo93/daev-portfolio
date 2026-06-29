'use client';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { REACTION_EMOJIS, type TargetType } from '../../lib/reactions';

interface Props {
  targetType: TargetType;
  targetId: string;
  initialCounts: Record<string, number>;
  initialMine: string[];
  size?: 'sm' | 'md';
}

export default function ReactionBar({
  targetType,
  targetId,
  initialCounts,
  initialMine,
  size = 'sm',
}: Props) {
  const { status } = useSession();
  const [counts, setCounts] = useState<Record<string, number>>(initialCounts);
  const [mine, setMine] = useState<string[]>(initialMine);
  const [busy, setBusy] = useState(false);

  const toggle = async (emoji: string) => {
    if (status !== 'authenticated') {
      signIn('google');
      return;
    }
    if (busy) return;
    setBusy(true);

    // Optimistic update, reconciled with the server's authoritative summary.
    const had = mine.includes(emoji);
    setMine((m) => (had ? m.filter((e) => e !== emoji) : [...m, emoji]));
    setCounts((c) => ({ ...c, [emoji]: Math.max(0, (c[emoji] ?? 0) + (had ? -1 : 1)) }));

    try {
      const res = await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ targetType, targetId, emoji }),
      });
      if (res.ok) {
        const data = (await res.json()) as { counts: Record<string, number>; mine: string[] };
        setCounts(data.counts);
        setMine(data.mine);
      }
    } finally {
      setBusy(false);
    }
  };

  const pad = size === 'md' ? 'px-2.5 py-1 text-sm' : 'px-2 py-0.5 text-xs';

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {REACTION_EMOJIS.map((emoji) => {
        const active = mine.includes(emoji);
        const n = counts[emoji] ?? 0;
        return (
          <button
            key={emoji}
            onClick={() => toggle(emoji)}
            className={`inline-flex items-center gap-1 rounded-full border transition-all ${pad} ${
              active
                ? 'bg-accent/15 border-accent/40 text-accent'
                : 'bg-surface-el border-border text-muted hover:border-accent/40'
            }`}
          >
            <span className="leading-none">{emoji}</span>
            {n > 0 && <span className="font-medium tabular-nums">{n}</span>}
          </button>
        );
      })}
    </div>
  );
}
