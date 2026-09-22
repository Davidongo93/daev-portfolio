import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';
import type { Lang } from '@/lib/i18n';

export const ogSize = { width: 1200, height: 630 };

export function ogAlt(lang: Lang) {
  return `${siteConfig.name} — ${siteConfig.ogCard.offers[lang].join(' · ')}`;
}

const PHOTO_W = 440;

/** Face-centred crop of the profile photo, sized for the card's left panel. */
const photoUrl = siteConfig.photo.replace(
  '/upload/',
  `/upload/c_fill,g_face,w_${PHOTO_W},h_${ogSize.height},f_jpg,q_85/`
);

/**
 * The photo is inlined as a data URI so a Cloudinary hiccup degrades to a card
 * without photo instead of failing the build.
 */
async function loadPhoto(): Promise<string | null> {
  try {
    const res = await fetch(photoUrl);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    return `data:image/jpeg;base64,${buf.toString('base64')}`;
  } catch {
    return null;
  }
}

/**
 * Inter from Google Fonts. Without a user agent the CSS API serves TTF, which
 * is what Satori reads. On failure the card falls back to the bundled font.
 */
async function loadFont(weight: 400 | 700) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`)
    ).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const data = await (await fetch(src)).arrayBuffer();
    return { name: 'Inter', data, weight, style: 'normal' as const };
  } catch {
    return null;
  }
}

/** Business-card style Open Graph image: photo on the left, offer on the right. */
export async function renderOgCard(lang: Lang) {
  const [photo, ...fonts] = await Promise.all([loadPhoto(), loadFont(400), loadFont(700)]);
  const card = siteConfig.ogCard;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'radial-gradient(120% 120% at 90% 0%, #0d2030 0%, #080d14 60%)',
          color: '#e2e8f0',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {photo && (
          <div style={{ display: 'flex', position: 'relative', width: PHOTO_W, height: '100%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={photo} width={PHOTO_W} height={ogSize.height} style={{ objectFit: 'cover' }} />
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 120,
                height: '100%',
                background: 'linear-gradient(90deg, rgba(8,13,20,0) 0%, #080d14 100%)',
              }}
            />
          </div>
        )}

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '52px 96px 48px 40px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <div
              style={{
                display: 'flex',
                fontSize: 56,
                fontWeight: 700,
                letterSpacing: -2,
                background: 'linear-gradient(135deg, #00e5ff, #818cf8)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              DÆV
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 18px',
                borderRadius: 999,
                border: '1px solid rgba(34,197,94,0.4)',
                background: 'rgba(34,197,94,0.12)',
                color: '#22c55e',
                fontSize: 20,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 999, background: '#22c55e' }} />
              {card.cta[lang]}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 54, fontWeight: 700, letterSpacing: -1.5 }}>
              {siteConfig.name}
            </div>
            <div style={{ display: 'flex', fontSize: 25, color: '#94a3b8', marginTop: 8 }}>
              {card.tagline[lang]}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 30 }}>
              {card.offers[lang].map((offer) => (
                <div
                  key={offer}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    width: 306,
                    padding: '16px 18px',
                    borderRadius: 14,
                    border: '1px solid rgba(0,229,255,0.25)',
                    background: 'rgba(0,229,255,0.06)',
                    fontSize: 21,
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      fill="none"
                      stroke="#00e5ff"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {offer}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              paddingTop: 18,
              borderTop: '1px solid rgba(148,163,184,0.2)',
              fontSize: 24,
              color: '#64748b',
            }}
          >
            <div style={{ display: 'flex', color: '#00e5ff', fontWeight: 700 }}>daev.space</div>
            <div style={{ display: 'flex' }}>
              {siteConfig.role[lang]} · {siteConfig.location}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: fonts.filter((f): f is NonNullable<typeof f> => f !== null) }
  );
}
