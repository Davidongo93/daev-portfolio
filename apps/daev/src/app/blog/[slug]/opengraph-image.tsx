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

export default async function PostOgImage({ params }: { params: { slug: string } }) {
  let title: string = siteConfig.alias;
  let date = '';
  try {
    const file = fs.readFileSync(path.join(getPostsDir(), `${params.slug}.md`), 'utf-8');
    const { data } = matter(file);
    title = (data.title as string) || title;
    date = (data.date as string) || '';
  } catch {
    // fall back to defaults
  }

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
          <div style={{ fontSize: 26, color: '#94a3b8', display: 'flex' }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 26, color: '#00e5ff', fontFamily: 'monospace', display: 'flex' }}>
            {date}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
