import type { Metadata } from 'next';
import Footer from '@/components/Footer/Footer';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  // A plain string title here would drop the root `%s | DÆV` template for
  // every post and topic page below; restating it keeps the brand suffix.
  title: {
    default: 'Blog', // the root template adds the suffix
    template: `%s | ${siteConfig.alias}`,
  },
  description: `Crónicas, ensayos y notas de ${siteConfig.name}: desarrollo web, cacao de origen y territorio en Cundinamarca.`,
  alternates: { canonical: `${siteConfig.siteUrl}/blog` },
  openGraph: {
    title: `Blog | ${siteConfig.alias}`,
    description: `Crónicas, ensayos y notas de ${siteConfig.name}.`,
    url: `${siteConfig.siteUrl}/blog`,
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pt-16 min-h-screen bg-bg animate-fade-in">
        {children}
      </div>
      <Footer />
    </>
  );
}
