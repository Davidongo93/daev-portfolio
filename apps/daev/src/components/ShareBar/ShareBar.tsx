'use client';
import { useState } from 'react';
import {
  FaXTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaLink,
  FaCheck,
  FaShareNodes,
} from 'react-icons/fa6';
import { useLang } from '../../context/LangContext';

interface ShareBarProps {
  /** Absolute URL of the post (carries the OG image when shared). */
  url: string;
  /** Post title, used as the share text. */
  title: string;
}

/**
 * Social share controls for a blog post. On devices that support the native
 * Web Share API the round "share" button opens the OS sheet; everywhere else
 * the per-network links and the copy-link button are used. The shared URL is
 * the canonical post URL, so each platform pulls the post photo via the page's
 * opengraph-image route.
 */
export default function ShareBar({ url, title }: ShareBarProps) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const enc = encodeURIComponent;
  const networks = [
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,
      icon: <FaXTwitter size={15} />,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
      icon: <FaLinkedinIn size={15} />,
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${enc(`${title} ${url}`)}`,
      icon: <FaWhatsapp size={15} />,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  const nativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* user cancelled */
      }
    } else {
      copyLink();
    }
  };

  const iconBtn =
    'w-9 h-9 inline-flex items-center justify-center rounded-full border border-border text-muted hover:text-accent hover:border-accent transition';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted mr-1 inline-flex items-center gap-2">
        <FaShareNodes /> {t.blog.share}
      </span>

      {networks.map((n) => (
        <a
          key={n.name}
          href={n.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.blog.share} · ${n.name}`}
          title={n.name}
          className={iconBtn}
        >
          {n.icon}
        </a>
      ))}

      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? t.blog.linkCopied : t.blog.copyLink}
        title={copied ? t.blog.linkCopied : t.blog.copyLink}
        className={iconBtn}
      >
        {copied ? <FaCheck size={15} className="text-green" /> : <FaLink size={15} />}
      </button>

      {/* Native OS share sheet — most useful on mobile. */}
      <button
        type="button"
        onClick={nativeShare}
        aria-label={t.blog.share}
        title={t.blog.share}
        className={`${iconBtn} sm:hidden`}
      >
        <FaShareNodes size={15} />
      </button>
    </div>
  );
}
