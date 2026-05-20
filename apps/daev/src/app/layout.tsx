import './global.css';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
export const metadata = {
  metadataBase: new URL('https://daev.vercel.app'),
  title: 'Dave Miranda | Full Stack Developer',
  description: 'Portfolio of David Orlando Miranda — Full Stack Developer specializing in React, Next.js, Node.js and TypeScript. Available for freelance and full-time opportunities.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Colombia', 'Dave Miranda'],
  openGraph: {
    title: 'Dave Miranda | Full Stack Developer',
    description: 'Full Stack Developer — React, Next.js, Node.js, TypeScript',
    images: ['/profileDave.png'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <GoogleTagManager gtmId="GTM-K5PFW7FW" />
       <GoogleAnalytics gaId="G-7LTKWZT49T" />
      <body>{children}</body>
    </html>
  );
}
