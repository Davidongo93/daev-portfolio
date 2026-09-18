import '@/app/global.css';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/context/ThemeContext';
import { LangProvider } from '@/context/LangContext';
import { UIProvider } from '@/context/UIContext';
import UnifiedNav from '@/components/UnifiedNav/UnifiedNav';
import ConsoleOverlay from '@/components/ConsoleOverlay/ConsoleOverlay';
import WhatsAppButton from '@/components/WhatsAppButton/WhatsAppButton';
import { rootJsonLd } from '@/lib/seo';
import { localeTag, type Lang } from '@/lib/i18n';

/**
 * The document shell shared by both root layouts. Spanish renders it at the
 * root and English inside the /en segment; the only difference between them is
 * the locale, which fixes <html lang>, the JSON-LD strings and the UI copy.
 */
export default function RootShell({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <html lang={localeTag[lang]} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0f1724" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#f0f4ff" media="(prefers-color-scheme: light)" />
        {rootJsonLd(lang).map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <GoogleTagManager gtmId="GTM-K5PFW7FW" />
      <GoogleAnalytics gaId="G-7LTKWZT49T" />
      <body className="bg-bg text-fore font-sans transition-colors duration-300 antialiased">
        <SessionProvider>
          <ThemeProvider>
            <LangProvider lang={lang}>
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
