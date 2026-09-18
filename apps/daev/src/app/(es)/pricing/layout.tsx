import type { Metadata } from 'next';
import Footer from '@/components/Footer/Footer';
import { pricingJsonLd, pricingMetadata } from '@/lib/seo';

export const metadata: Metadata = pricingMetadata('es');

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd('es')) }}
      />
      <div className="pt-16 min-h-screen bg-bg animate-fade-in">{children}</div>
      <Footer />
    </>
  );
}
