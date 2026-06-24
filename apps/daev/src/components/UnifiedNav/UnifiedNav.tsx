'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaTerminal,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useLang } from '../../context/LangContext';
import { useUI } from '../../context/UIContext';
import { siteConfig } from '../../config/site';

type NavLink = {
  href: string;
  label: string;
  sectionId: string;
  external?: boolean;
};

export default function UnifiedNav() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, t, toggle: toggleLang } = useLang();
  const { cliMode, showCli } = useUI();
  const pathname = usePathname() ?? '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrolling(window.scrollY > 12);
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') return;
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  if (cliMode) return null;

  const navLinks: NavLink[] = [
    { href: '/#about', label: t.nav.about, sectionId: 'about' },
    { href: '/#services', label: t.nav.services, sectionId: 'services' },
    { href: '/#skills', label: t.nav.skills, sectionId: 'skills' },
    { href: '/#featured-projects', label: t.nav.projects, sectionId: 'featured-projects' },
    { href: '/#contact', label: t.nav.contact, sectionId: 'contact' },
    { href: '/blog', label: '/blog', sectionId: 'blog' },
  ];

  const isOnBlog = pathname.startsWith('/blog');
  const isOnPricing = pathname.startsWith('/pricing');

  const isActive = (link: NavLink) => {
    if (link.sectionId === 'blog') return isOnBlog;
    if (link.sectionId === 'pricing') return isOnPricing;
    if (isOnBlog || isOnPricing) return false;
    return activeSection === link.sectionId;
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleTerminalClick = () => {
    showCli();
    closeMenu();
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolling
          ? 'bg-surface/95 backdrop-blur-md shadow-md border-b border-border'
          : 'bg-surface/70 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-bold text-xl text-accent tracking-widest hover:opacity-80 transition-opacity"
          aria-label={`${siteConfig.alias} home`}
        >
          {siteConfig.alias}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.sectionId}
                href={link.href}
                className={`relative text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 ${
                  active
                    ? 'text-accent'
                    : 'text-muted hover:text-accent'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            aria-label={`Switch to ${lang === 'en' ? 'Spanish' : 'English'}`}
            title={`Switch to ${lang === 'en' ? 'Spanish' : 'English'}`}
            className="text-xs font-mono font-bold text-muted hover:text-accent transition-all px-2 py-1 border border-border rounded hover:border-accent"
          >
            {t.lang.switch}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.theme.light : t.theme.dark}
            title={theme === 'dark' ? t.theme.light : t.theme.dark}
            className="text-muted hover:text-accent transition-all p-1.5 rounded hover:bg-surface-el"
          >
            {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>

          {/* Terminal button */}
          <button
            onClick={handleTerminalClick}
            aria-label={t.nav.cli}
            title={t.nav.cli}
            className="text-muted hover:text-accent transition-all p-1.5 rounded hover:bg-surface-el"
          >
            <FaTerminal size={16} />
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden text-fore hover:text-accent transition-colors p-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Sequential scroll progress bar (home, blog, pricing, posts) */}
      <div
        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border flex flex-col px-4 py-4 gap-1 shadow-xl animate-slide-down max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.sectionId}
                href={link.href}
                onClick={closeMenu}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-all ${
                  active
                    ? 'text-accent bg-accent/10'
                    : 'text-muted hover:text-accent hover:bg-surface-el'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex items-center gap-4 pt-3 mt-2 border-t border-border">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
