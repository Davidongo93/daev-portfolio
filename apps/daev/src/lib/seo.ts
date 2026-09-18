import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { alternatesFor, localeTag, ogLocale, urlFor, type Lang } from '@/lib/i18n';

/**
 * Root metadata for a locale. Both locales describe the same site, so the
 * entity ids in the JSON-LD stay anchored to the canonical (Spanish) URLs
 * while every page-level URL, canonical and og:locale follows the locale.
 */
export function rootMetadata(lang: Lang): Metadata {
  const title = `${siteConfig.name} | ${siteConfig.role[lang]}`;
  const description = siteConfig.bio[lang];

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: title,
      template: `%s | ${siteConfig.alias}`,
    },
    description,
    keywords: [...siteConfig.seo.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    applicationName: `${siteConfig.alias} Portfolio`,
    category: 'technology',
    alternates: alternatesFor('/', lang),
    openGraph: {
      type: 'website',
      locale: ogLocale[lang],
      alternateLocale: [ogLocale[lang === 'en' ? 'es' : 'en']],
      url: urlFor(lang, '/'),
      siteName: `${siteConfig.alias} | ${siteConfig.name}`,
      title,
      description,
      // og:image is provided by the file-based opengraph-image.tsx (branded DÆV card).
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
}

/** The four root JSON-LD graphs, with every human-readable field in `lang`. */
export function rootJsonLd(lang: Lang): object[] {
  const home = urlFor(lang, '/');

  const person = {
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
    jobTitle: siteConfig.role[lang],
    description: siteConfig.bio[lang],
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

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.siteUrl}#website`,
    url: home,
    name: `${siteConfig.alias} | ${siteConfig.name}`,
    description: siteConfig.bio[lang],
    inLanguage: localeTag[lang],
    publisher: { '@id': `${siteConfig.siteUrl}#person` },
  };

  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.siteUrl}#service`,
    name: `${siteConfig.name} — Full Stack Development`,
    description:
      lang === 'es'
        ? 'Servicios profesionales de desarrollo web Full Stack: React, Next.js, Node.js, NestJS, TypeScript, PostgreSQL. Disponible para proyectos freelance y posiciones de tiempo completo.'
        : 'Professional Full Stack web development services: React, Next.js, Node.js, NestJS, TypeScript, PostgreSQL. Available for freelance and full-time opportunities.',
    provider: { '@id': `${siteConfig.siteUrl}#person` },
    url: home,
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
          name: s.title[lang],
          description: s.description[lang],
        },
      })),
    },
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteConfig.siteUrl}#faq`,
    inLanguage: localeTag[lang],
    mainEntity: siteConfig.faq.map((item) => ({
      '@type': 'Question',
      name: item.q[lang],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a[lang],
      },
    })),
  };

  /**
   * The work itself, as a list search engines and answer engines can quote.
   * The home page now leads with case studies, so the graph should say so:
   * each entry names the client, what was built and who built it. Cases whose
   * domain is not resolving are still listed — without a `url`, so nothing
   * points at a dead host.
   */
  const work = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteConfig.siteUrl}#work`,
    name: lang === 'es' ? 'Trabajo publicado' : 'Published work',
    inLanguage: localeTag[lang],
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: siteConfig.caseStudies.length,
    itemListElement: siteConfig.caseStudies.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        '@id': `${siteConfig.siteUrl}#case-${item.slug}`,
        name: item.name,
        description: item.work[lang],
        about: item.sector[lang],
        creator: { '@id': `${siteConfig.siteUrl}#person` },
        keywords: [...item.technologies].join(', '),
        ...(item.liveUrl ? { url: item.liveUrl } : {}),
        ...(item.thumbnail ? { image: `${siteConfig.siteUrl}${item.thumbnail}` } : {}),
      },
    })),
  };

  return [person, website, professionalService, work, faq];
}

const copy = {
  pricing: {
    es: {
      title: 'Precios',
      description: `Precios de landing pages, e-commerce, plataformas LMS y software a medida por ${siteConfig.name} (${siteConfig.alias}).`,
      ogDescription: `Precios claros y transparentes para proyectos web por ${siteConfig.name}.`,
    },
    en: {
      title: 'Pricing',
      description: `Pricing for landing pages, e-commerce, LMS platforms and custom software by ${siteConfig.name} (${siteConfig.alias}).`,
      ogDescription: `Clear, transparent pricing for web projects by ${siteConfig.name}.`,
    },
  },
  privacy: {
    es: {
      title: 'Política de Privacidad',
      description: `Cómo ${siteConfig.name} trata los datos personales en ${siteConfig.siteUrl}.`,
    },
    en: {
      title: 'Privacy Policy',
      description: `How ${siteConfig.name} handles personal data on ${siteConfig.siteUrl}.`,
    },
  },
  dataDeletion: {
    es: {
      title: 'Eliminación de Datos',
      description: `Cómo eliminar tus datos de ${siteConfig.siteUrl}.`,
    },
    en: {
      title: 'User Data Deletion',
      description: `How to delete your data from ${siteConfig.siteUrl}.`,
    },
  },
} as const;

export function pricingMetadata(lang: Lang): Metadata {
  const c = copy.pricing[lang];
  return {
    title: c.title,
    description: c.description,
    alternates: alternatesFor('/pricing', lang),
    openGraph: {
      title: `${c.title} | ${siteConfig.alias}`,
      description: c.ogDescription,
      url: urlFor(lang, '/pricing'),
      locale: ogLocale[lang],
      type: 'website',
    },
  };
}

export function pricingJsonLd(lang: Lang): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `${siteConfig.alias} — Web Development Pricing`,
    url: urlFor(lang, '/pricing'),
    inLanguage: localeTag[lang],
    provider: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    itemListElement: siteConfig.pricing.plans.map((plan) => ({
      '@type': 'Offer',
      name: plan.name[lang],
      description: plan.tagline[lang],
      price: plan.priceCop,
      priceCurrency: siteConfig.pricing.currency,
    })),
  };
}

export function legalMetadata(
  lang: Lang,
  page: 'privacy' | 'dataDeletion',
  path: string
): Metadata {
  const c = copy[page][lang];
  return {
    title: c.title,
    description: c.description,
    alternates: alternatesFor(path, lang),
    robots: { index: true, follow: true },
  };
}
