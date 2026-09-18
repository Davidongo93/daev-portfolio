import type { Metadata } from 'next';
import LegalContent from '@/components/Legal/LegalContent';
import { legalMetadata } from '@/lib/seo';

export const metadata: Metadata = legalMetadata('en', 'privacy', '/privacy');

export default function PrivacyPage() {
  return <LegalContent type="privacy" />;
}
