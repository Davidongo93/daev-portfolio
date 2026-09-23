import { siteConfig } from '@/config/site';

export type Lang = 'en' | 'es';

/** Spanish is the default locale and lives at the root; English lives under /en. */
export const DEFAULT_LANG: Lang = 'es';
export const LANGS: Lang[] = ['es', 'en'];

export const localeTag: Record<Lang, string> = { es: 'es-CO', en: 'en-US' };
export const ogLocale: Record<Lang, string> = { es: 'es_CO', en: 'en_US' };

/**
 * Routes with no English counterpart. The blog is written in Spanish and we do
 * not publish machine translations of it, so an English visitor asking for the
 * other version of /blog is sent to the English home instead of a 404.
 */
const ES_ONLY_ROUTES = ['/blog'];

const isEsOnly = (pathname: string) =>
  ES_ONLY_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

/**
 * Routes whose slug is translated. Keys are the Spanish path (the canonical
 * one), values the English slug that lives under /en.
 */
const EN_SLUGS: Record<string, string> = { '/trabajo': '/work' };
const ES_SLUGS: Record<string, string> = Object.fromEntries(
  Object.entries(EN_SLUGS).map(([es, en]) => [en, es])
);

/**
 * Locale-aware path, always called with the Spanish path:
 * pathFor('en', '/pricing') === '/en/pricing', pathFor('en', '/trabajo') === '/en/work'.
 */
export function pathFor(lang: Lang, path = '/'): string {
  const clean = path === '/' ? '' : path;
  return lang === 'en' ? `/en${EN_SLUGS[clean] ?? clean}` : clean || '/';
}

/** Absolute URL of `path` in `lang`, for canonicals, hreflang and JSON-LD. */
export function urlFor(lang: Lang, path = '/'): string {
  const p = pathFor(lang, path);
  return p === '/' ? siteConfig.siteUrl : `${siteConfig.siteUrl}${p}`;
}

/**
 * hreflang set for a page that exists in both locales. x-default points at
 * Spanish because that is what the root serves.
 */
export function alternatesFor(path = '/', lang: Lang = DEFAULT_LANG) {
  return {
    canonical: urlFor(lang, path),
    languages: {
      'es-CO': urlFor('es', path),
      'en-US': urlFor('en', path),
      'x-default': urlFor('es', path),
    },
  };
}

/** Where the language toggle should go from `pathname`, currently in `lang`. */
export function counterpartPath(pathname: string, lang: Lang): string {
  if (lang === 'en') {
    const rest = pathname.replace(/^\/en(?=\/|$)/, '');
    return ES_SLUGS[rest] ?? (rest || '/');
  }
  return isEsOnly(pathname) ? '/en' : pathFor('en', pathname);
}
