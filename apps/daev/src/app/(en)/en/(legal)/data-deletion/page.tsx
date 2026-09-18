import type { Metadata } from 'next';
import LegalContent from '@/components/Legal/LegalContent';
import { legalMetadata } from '@/lib/seo';

export const metadata: Metadata = legalMetadata('en', 'dataDeletion', '/data-deletion');

export default function DataDeletionPage() {
  return <LegalContent type="data-deletion" />;
}
