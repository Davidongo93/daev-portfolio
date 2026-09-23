import type { Metadata } from 'next';
import Work from '@/views/Work/Work';
import { workMetadata } from '@/lib/seo';

export const metadata: Metadata = workMetadata('en');

export default function WorkPage() {
  return <Work />;
}
