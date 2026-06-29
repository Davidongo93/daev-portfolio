'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaGoogle, FaFacebook, FaSignOutAlt } from 'react-icons/fa';
import { useLang } from '../../context/LangContext';

// Shown when nobody is signed in: the two OAuth entry points.
export function SignInButtons({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  return (
    <div className={`flex flex-wrap gap-3 ${compact ? '' : 'mt-3'}`}>
      <button
        onClick={() => signIn('google')}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-el border border-border text-fore text-sm font-medium hover:border-accent hover:text-accent transition-all"
      >
        <FaGoogle className="text-[#ea4335]" /> {t.comments.signInGoogle}
      </button>
      <button
        onClick={() => signIn('facebook')}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-el border border-border text-fore text-sm font-medium hover:border-accent hover:text-accent transition-all"
      >
        <FaFacebook className="text-[#1877f2]" /> {t.comments.signInFacebook}
      </button>
    </div>
  );
}

// Compact avatar + sign-out shown once the user is authenticated.
export function UserBadge() {
  const { data: session } = useSession();
  const { t } = useLang();
  if (!session?.user) return null;
  return (
    <div className="flex items-center gap-2.5">
      {session.user.image ? (
        <Image
          src={session.user.image}
          alt={session.user.name ?? 'avatar'}
          width={28}
          height={28}
          className="rounded-full"
        />
      ) : (
        <span className="w-7 h-7 rounded-full bg-accent/20 text-accent grid place-items-center text-xs font-bold">
          {(session.user.name ?? '?').charAt(0).toUpperCase()}
        </span>
      )}
      <span className="text-sm text-fore font-medium">{session.user.name}</span>
      <button
        onClick={() => signOut()}
        title={t.comments.signOut}
        className="ml-1 text-muted hover:text-accent transition"
      >
        <FaSignOutAlt size={15} />
      </button>
    </div>
  );
}
