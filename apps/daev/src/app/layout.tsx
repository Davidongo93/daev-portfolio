import './global.css';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import { AppProvider } from '../context/AppContext';

export const metadata = {
  title: 'Dave Miranda',
  description: 'Full Stack Developer',
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
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
