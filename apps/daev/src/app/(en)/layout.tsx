import type { Metadata } from 'next';
import RootShell from '@/components/RootShell/RootShell';
import { rootMetadata } from '@/lib/seo';

export const metadata: Metadata = rootMetadata('en');

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell lang="en">{children}</RootShell>;
}
