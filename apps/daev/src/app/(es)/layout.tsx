import type { Metadata } from 'next';
import RootShell from '@/components/RootShell/RootShell';
import { rootMetadata } from '@/lib/seo';

export const metadata: Metadata = rootMetadata('es');

export default function SpanishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell lang="es">{children}</RootShell>;
}
