import type { Metadata } from 'next';
import Footer from '../../components/Footer/Footer';
import { siteConfig } from '../../config/site';

export const metadata: Metadata = {
  title: 'Pricing',
  description: `Pricing for landing pages, e-commerce, LMS platforms and custom software by ${siteConfig.name} (${siteConfig.alias}).`,
  alternates: { canonical: `${siteConfig.siteUrl}/pricing` },
  openGraph: {
    title: `Pricing | ${siteConfig.alias}`,
    description: `Clear, transparent pricing for web projects by ${siteConfig.name}.`,
    url: `${siteConfig.siteUrl}/pricing`,
    type: 'website',
  },
};

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: `${siteConfig.alias} — Web Development Pricing`,
  url: `${siteConfig.siteUrl}/pricing`,
  provider: {
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.siteUrl,
  },
  itemListElement: siteConfig.pricing.plans.map((plan) => ({
    '@type': 'Offer',
    name: plan.name.en,
    description: plan.tagline.en,
    price: plan.priceCop,
    priceCurrency: siteConfig.pricing.currency,
  })),
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <div className="pt-16 min-h-screen bg-bg animate-fade-in">{children}</div>
      <Footer />
    </>
  );
}
