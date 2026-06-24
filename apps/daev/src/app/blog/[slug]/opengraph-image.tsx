import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ImageResponse } from 'next/og';
import { siteConfig } from '../../../config/site';

export const alt = `${siteConfig.alias} — Blog`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function getPostsDir() {
  const localPath = path.join(process.cwd(), 'posts');
  return fs.existsSync(localPath) ? localPath : path.join(process.cwd(), 'apps/daev/posts');
}

// Turn a Cloudinary image URL into a 1200x630 OG-sized thumbnail. Non-Cloudinary
// URLs are returned unchanged.
function toThumb(url: string) {
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', '/upload/w_1200,h_630,c_fill,q_auto,f_auto/');
  }
  return url;
}

export default async function PostOgImage({ params }: { params: { slug: string } }) {
  let title: string = siteConfig.alias;
  let date = '';
  let image = '';
  try {
    const file = fs.readFileSync(path.join(getPostsDir(), `${decodeURIComponent(params.slug)}.md`), 'utf-8');
    const { data } = matter(file);
    title = (data.title as string) || title;
    date = (data.date as string) || '';
    image = (data.image as string) || '';
  } catch {
    // fall back to defaults
  }

  // Resolve the post image to an absolute URL when present, requesting a
  // 1200x630 thumbnail from Cloudinary so the OG card is correctly sized and
  // loads fast instead of pulling the full-resolution original.
  const absImage = image
    ? toThumb(image.startsWith('http') ? image : `${siteConfig.siteUrl}${image}`)
    : '';

  // Variant 1 — post has its own image: full-bleed photo with a branded overlay.
  if (absImage) {
    return new ImageResponse(
      (
        <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={absImage}
            alt=""
            width={size.width}
            height={size.height}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '80px',
              background:
                'linear-gradient(0deg, rgba(8,13,20,0.94) 0%, rgba(8,13,20,0.45) 45%, rgba(8,13,20,0) 72%)',
              color: '#e2e8f0',
              fontFamily: 'sans-serif',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ fontSize: 34, fontWeight: 700, color: '#00e5ff', display: 'flex' }}>
                DÆV
              </div>
              <div style={{ fontSize: 24, color: '#94a3b8', display: 'flex' }}>/ blog</div>
            </div>
            <div
              style={{
                fontSize: 62,
                fontWeight: 700,
                lineHeight: 1.1,
                maxWidth: 1000,
                display: 'flex',
              }}
            >
              {title}
            </div>
            {date && (
              <div
                style={{
                  fontSize: 24,
                  color: '#00e5ff',
                  fontFamily: 'monospace',
                  marginTop: 18,
                  display: 'flex',
                }}
              >
                {date}
              </div>
            )}
          </div>
        </div>
      ),
      { ...size }
    );
  }

  // Variant 2 — no image: branded DÆV card.
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'radial-gradient(120% 120% at 85% 5%, #0d2030 0%, #080d14 55%)',
          color: '#e2e8f0',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: 40,
            bottom: -120,
            fontSize: 460,
            fontWeight: 700,
            color: '#00e5ff',
            opacity: 0.07,
          }}
        >
          Æ
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: -1,
              background: 'linear-gradient(135deg, #00e5ff, #818cf8)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
            }}
          >
            DÆV
          </div>
          <div style={{ fontSize: 26, color: '#64748b', display: 'flex' }}>/ blog</div>
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 900,
            display: 'flex',
          }}
        >
          {title}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 26, color: '#94a3b8', display: 'flex' }}>{siteConfig.name}</div>
          <div style={{ fontSize: 26, color: '#00e5ff', fontFamily: 'monospace', display: 'flex' }}>
            {date}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
