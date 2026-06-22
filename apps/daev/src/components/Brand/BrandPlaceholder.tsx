import React from 'react';

interface BrandPlaceholderProps {
  /** Used to derive a stable accent hue + gradient id, and shown as the cover title. */
  title: string;
  /** Small category / type chip shown top-left (e.g. "Tech Challenge", "Article"). */
  label?: string;
  className?: string;
  /** Hide the title text overlay (used for tight thumbnails). */
  compact?: boolean;
}

/** Stable hash → hue in the brand's cyan→teal→indigo range (175–265°). */
function brandHue(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) % 100000;
  }
  return 175 + (h % 90);
}

/**
 * On-brand cover used wherever a real image is missing (blog posts, projects).
 * Pure CSS/SVG — no network request, no layout shift — featuring the DÆV mark.
 */
const BrandPlaceholder: React.FC<BrandPlaceholderProps> = ({
  title,
  label,
  className = '',
  compact = false,
}) => {
  const hue = brandHue(title || label || 'DAEV');
  const gid = `bp-${hue}-${(title || 'x').length}`;
  const glow = `hsl(${hue} 85% 55%)`;

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 120% at 80% 0%, hsl(${hue} 60% 16% / 0.9), transparent 60%), linear-gradient(135deg, #0a1018 0%, #0d1626 55%, #0a1220 100%)`,
      }}
      aria-hidden="true"
    >
      {/* Dotted grid texture */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <pattern id={`grid-${gid}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.05)" />
          </pattern>
          <linearGradient id={`ae-${gid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={glow} />
            <stop offset="100%" stopColor={`hsl(${hue + 35} 80% 60%)`} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${gid})`} />
      </svg>

      {/* Æ watermark */}
      <svg
        className="absolute left-1/2 top-1/2 h-[78%] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 100 100"
        style={{ opacity: 0.9 }}
      >
        <text
          x="50"
          y="72"
          textAnchor="middle"
          fontFamily="'Space Grotesk','Archivo',ui-sans-serif,system-ui,sans-serif"
          fontWeight="700"
          fontSize="78"
          fill={`url(#ae-${gid})`}
          opacity="0.16"
        >
          Æ
        </text>
      </svg>

      {/* Accent glow blob */}
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
        style={{ background: glow, opacity: 0.18 }}
      />

      {/* Label chip */}
      {label && (
        <span
          className="absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm"
          style={{
            borderColor: 'rgba(255,255,255,0.16)',
            color: 'rgba(226,232,240,0.92)',
            background: 'rgba(8,13,20,0.45)',
          }}
        >
          {label}
        </span>
      )}

      {/* Wordmark + title */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
        <span
          className="font-mono text-xs font-bold tracking-[0.25em]"
          style={{ color: glow }}
        >
          DÆV
        </span>
        {!compact && (
          <p
            className="line-clamp-2 max-w-[70%] text-right text-sm font-semibold leading-snug"
            style={{ color: 'rgba(226,232,240,0.95)' }}
          >
            {title}
          </p>
        )}
      </div>
    </div>
  );
};

export default BrandPlaceholder;
