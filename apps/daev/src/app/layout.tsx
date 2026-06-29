import './global.css';
import type { Metadata } from 'next';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '../context/ThemeContext';
import { LangProvider } from '../context/LangContext';
import { UIProvider } from '../context/UIContext';
import UnifiedNav from '../components/UnifiedNav/UnifiedNav';
import ConsoleOverlay from '../components/ConsoleOverlay/ConsoleOverlay';
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton';
import { siteConfig } from '../config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role.en}`,
    template: `%s | ${siteConfig.alias}`,
  },
  description: siteConfig.bio.en,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: `${siteConfig.alias} Portfolio`,
  category: 'technology',
  alternates: {
    canonical: siteConfig.siteUrl,
    languages: {
      'en-US': siteConfig.siteUrl,
      'es-CO': siteConfig.siteUrl,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_CO', 'es_ES', 'es_MX'],
    url: siteConfig.siteUrl,
    siteName: `${siteConfig.alias} | ${siteConfig.name}`,
    title: `${siteConfig.name} | ${siteConfig.role.en}`,
    description: siteConfig.bio.en,
    // og:image is provided by the file-based opengraph-image.tsx (branded DÆV card).
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.role.en}`,
    description: siteConfig.bio.en,
    creator: '@domirandar',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: '',
  },
  other: {
    'geo.region': 'CO',
    'geo.placename': siteConfig.location,
    'geo.position': '4.6097;-74.0817',
    ICBM: '4.6097, -74.0817',
  },
};

const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteConfig.siteUrl}#person`,
  name: siteConfig.name,
  alternateName: siteConfig.alias,
  url: siteConfig.siteUrl,
  email: `mailto:${siteConfig.email}`,
  telephone: siteConfig.phone,
  image: `${siteConfig.siteUrl}/brand/avatar.svg`,
  logo: `${siteConfig.siteUrl}/brand/avatar.svg`,
  jobTitle: siteConfig.role.en,
  description: siteConfig.bio.en,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CO',
    addressRegion: siteConfig.location,
  },
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.twitter,
    siteConfig.links.instagram,
  ],
  knowsAbout: [
    ...siteConfig.skills.frontend,
    ...siteConfig.skills.backend,
    ...siteConfig.skills.tools,
  ],
  worksFor: siteConfig.experience.map((exp) => ({
    '@type': 'Organization',
    name: exp.company,
  })),
};

const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.siteUrl}#website`,
  url: siteConfig.siteUrl,
  name: `${siteConfig.alias} | ${siteConfig.name}`,
  description: siteConfig.bio.en,
  inLanguage: ['en-US', 'es-CO'],
  publisher: { '@id': `${siteConfig.siteUrl}#person` },
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${siteConfig.siteUrl}#faq`,
  mainEntity: siteConfig.faq.map((item) => ({
    '@type': 'Question',
    name: item.q.en,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a.en,
    },
  })),
};

const jsonLdProfessionalService = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteConfig.siteUrl}#service`,
  name: `${siteConfig.name} — Full Stack Development`,
  description:
    'Professional Full Stack web development services: React, Next.js, Node.js, NestJS, TypeScript, PostgreSQL. Available for freelance and full-time opportunities.',
  provider: { '@id': `${siteConfig.siteUrl}#person` },
  url: siteConfig.siteUrl,
  areaServed: ['CO', 'US', 'MX', 'ES', 'AR', 'CL', 'Worldwide'],
  serviceType: [
    'Web Development',
    'Full Stack Development',
    'Frontend Development',
    'Backend Development',
    'API Development',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web & Software Development Services',
    itemListElement: siteConfig.services.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title.en,
        description: s.description.en,
      },
    })),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0f1724" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#f0f4ff" media="(prefers-color-scheme: light)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProfessionalService) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <GoogleTagManager gtmId="GTM-K5PFW7FW" />
      <GoogleAnalytics gaId="G-7LTKWZT49T" />
      <body className="bg-bg text-fore font-sans transition-colors duration-300 antialiased">
        <SessionProvider>
          <ThemeProvider>
            <LangProvider>
              <UIProvider>
                <UnifiedNav />
                {children}
                <WhatsAppButton />
                <ConsoleOverlay />
              </UIProvider>
            </LangProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
