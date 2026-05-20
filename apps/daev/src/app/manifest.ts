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
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/profileDave.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
