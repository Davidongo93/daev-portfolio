import type { Metadata } from 'next';
import Work from '@/views/Work/Work';
import { workMetadata } from '@/lib/seo';

export const metadata: Metadata = workMetadata('es');

export default function WorkPage() {
  return <Work />;
}
