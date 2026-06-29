import type { Metadata } from 'next';
import LegalContent from '../../../components/Legal/LegalContent';
import { siteConfig } from '../../../config/site';

export const metadata: Metadata = {
  title: 'User Data Deletion',
  description: `How to delete your data from ${siteConfig.siteUrl}.`,
  alternates: { canonical: `${siteConfig.siteUrl}/data-deletion` },
  robots: { index: true, follow: true },
};

export default function DataDeletionPage() {
  return <LegalContent type="data-deletion" />;
}
