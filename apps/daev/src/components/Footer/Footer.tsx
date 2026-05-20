'use client';
import { FaHeart } from 'react-icons/fa';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

export default function Footer() {
  const { t, lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border py-8 mt-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <p className="font-display font-bold text-accent text-lg">{siteConfig.alias}</p>
          <p className="text-xs text-muted mt-1">{t.footer.tagline}</p>
        </div>

        <p className="text-xs text-muted flex items-center gap-1.5">
          © {year} {siteConfig.name}. {t.footer.rights}.
        </p>

        <p className="text-xs text-muted flex items-center gap-1.5">
          {t.footer.madeWith} <FaHeart className="text-red-500" /> {lang === 'es' ? 'en' : 'in'} {siteConfig.location} {siteConfig.locationFlag}
        </p>
      </div>
    </footer>
  );
}
