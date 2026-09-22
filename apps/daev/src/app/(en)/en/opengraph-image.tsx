import { ogAlt, ogSize, renderOgCard } from '@/lib/ogCard';

// English card for `/en` and everything under it.
export const alt = ogAlt('en');
export const size = ogSize;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return renderOgCard('en');
}
