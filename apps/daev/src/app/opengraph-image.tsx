import { ImageResponse } from 'next/og';
import { siteConfig } from '../config/site';

export const alt = `${siteConfig.name} — ${siteConfig.role.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          background:
            'radial-gradient(120% 120% at 85% 5%, #0d2030 0%, #080d14 55%)',
          color: '#e2e8f0',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* giant watermark */}
        <div
          style={{
            position: 'absolute',
            right: 40,
            top: -40,
            fontSize: 460,
            fontWeight: 700,
            color: '#00e5ff',
            opacity: 0.08,
            letterSpacing: -20,
          }}
        >
          Æ
        </div>

        <div
          style={{
            fontSize: 150,
            fontWeight: 700,
            letterSpacing: -4,
            display: 'flex',
            background: 'linear-gradient(135deg, #00e5ff, #818cf8)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          DÆV
        </div>
        <div style={{ fontSize: 46, fontWeight: 600, marginTop: 8, display: 'flex' }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 32, color: '#00e5ff', marginTop: 12, display: 'flex' }}>
          Full Stack Developer · React · Next.js · Node.js
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 32,
            padding: '10px 20px',
            borderRadius: 999,
            border: '1px solid rgba(34,197,94,0.4)',
            background: 'rgba(34,197,94,0.12)',
            color: '#22c55e',
            fontSize: 22,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 999, background: '#22c55e' }} />
          Available for work
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 70,
            right: 80,
            fontSize: 26,
            color: '#64748b',
            fontFamily: 'monospace',
            display: 'flex',
          }}
        >
          daev.space
        </div>
      </div>
    ),
    { ...size }
  );
}
