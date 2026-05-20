import type { Metadata } from 'next';
import Footer from '../../components/Footer/Footer';
import { siteConfig } from '../../config/site';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Articles, tutorials and reflections by ${siteConfig.name} — ${siteConfig.role.en}.`,
  alternates: { canonical: `${siteConfig.siteUrl}/blog` },
  openGraph: {
    title: `Blog | ${siteConfig.alias}`,
    description: `Articles, tutorials and reflections by ${siteConfig.name}.`,
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
