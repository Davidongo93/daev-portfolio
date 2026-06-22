import React from 'react';

interface BrandMarkProps {
  /** Pixel size of the square mark. */
  size?: number;
  className?: string;
  /** Accessible label / tooltip. */
  title?: string;
  /** Rounded-tile background with gradient (default) or transparent glyph only. */
  variant?: 'tile' | 'glyph';
}

/**
 * DÆV brand monogram — a self-contained, theme-aware SVG used as avatar,
 * watermark and favicon source. The Æ ligature is the core of the identity.
 */
const BrandMark: React.FC<BrandMarkProps> = ({
  size = 96,
  className = '',
  title = 'DÆV',
  variant = 'tile',
}) => {
  // Deterministic gradient id so multiple marks can coexist without clashing.
  const gid = `daev-mark-${variant}-${size}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>

      {variant === 'tile' && (
        <>
          <rect
            x="2"
            y="2"
            width="92"
            height="92"
            rx="24"
            fill="var(--surface-el)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {/* corner accents to read as a code bracket / monogram frame */}
          <path
            d="M20 14 H14 V20 M76 14 H82 V20 M20 82 H14 V76 M76 82 H82 V76"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </>
      )}

      <text
        x="48"
        y="63"
        textAnchor="middle"
        fontFamily="'Space Grotesk', 'Archivo', ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        fontSize="44"
        letterSpacing="-1"
        fill={`url(#${gid})`}
      >
        Æ
      </text>
    </svg>
  );
};

export default BrandMark;
