import type { Metadata } from 'next';
import LegalContent from '../../../components/Legal/LegalContent';
import { siteConfig } from '../../../config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${siteConfig.name} handles personal data on ${siteConfig.siteUrl}.`,
  alternates: { canonical: `${siteConfig.siteUrl}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <LegalContent type="privacy" />;
}
