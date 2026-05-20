'use client';
import Link from 'next/link';
import { FaSun, FaMoon, FaHome } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useLang } from '../../context/LangContext';
import { siteConfig } from '../../config/site';

export default function BlogNav() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { t, toggle: toggleLang } = useLang();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-surface/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="font-display font-bold text-xl text-accent tracking-widest hover:opacity-80 transition"
        >
          {siteConfig.alias}
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-muted hover:text-accent transition font-medium inline-flex items-center gap-1">
            <FaHome /> Home
          </Link>
          <Link href="/blog" className="text-sm text-accent font-semibold">
            /{t.nav.blog.toLowerCase()}
          </Link>
          <Link href="/#projects" className="text-sm text-muted hover:text-accent transition font-medium">
            {t.nav.projects}
          </Link>
          <Link href="/#contact" className="text-sm text-muted hover:text-accent transition font-medium">
            {t.nav.contact}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="text-xs font-mono font-bold text-muted hover:text-accent transition px-2 py-1 border border-border rounded hover:border-accent"
          >
            {t.lang.switch}
          </button>
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.theme.light : t.theme.dark}
            className="text-muted hover:text-accent transition p-1.5 rounded hover:bg-surface-el"
          >
            {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>
          <Link
            href="/"
            className="md:hidden text-muted hover:text-accent transition p-1.5"
            aria-label="Home"
          >
            <FaHome size={18} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
