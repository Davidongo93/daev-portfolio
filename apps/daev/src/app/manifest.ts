import type { MetadataRoute } from 'next';
import { siteConfig } from '../config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} | ${siteConfig.role.en}`,
    short_name: siteConfig.alias,
    description: siteConfig.bio.en,
    start_url: '/',
    display: 'standalone',
    background_color: '#080d14',
    theme_color: '#00e5ff',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/brand/avatar.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/brand/avatar.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
