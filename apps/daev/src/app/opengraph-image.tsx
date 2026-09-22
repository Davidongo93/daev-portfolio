import { ogAlt, ogSize, renderOgCard } from '@/lib/ogCard';

// Spanish card: serves `/` and every Spanish route (blog posts fall back to it).
// `/en` overrides it with app/(en)/en/opengraph-image.tsx.
export const alt = ogAlt('es');
export const size = ogSize;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return renderOgCard('es');
}
