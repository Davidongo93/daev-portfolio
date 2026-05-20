'use client';
import { useState, useEffect } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaUser,
  FaTools,
  FaProjectDiagram,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaBlogger,
  FaTerminal,
  FaSun,
  FaMoon,
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useLang } from '../../context/LangContext';
import { siteConfig } from '../../config/site';

interface HeaderProps {
  onStateChange: (newValue: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onStateChange }) => {
  const [scrolling, setScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme, toggle: toggleTheme } = useTheme();
  const { t, toggle: toggleLang } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: '#about', label: t.nav.about, id: 'about' },
    { href: '/blog', label: t.nav.blog, id: 'blog' },
    { href: '#skills', label: t.nav.skills, id: 'skills' },
    { href: '#projects', label: t.nav.projects, id: 'projects' },
    { href: '#contact', label: t.nav.contact, id: 'contact' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolling
          ? 'bg-surface/95 backdrop-blur-md shadow-lg border-b border-border'
          : 'bg-surface/70 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <a
          href="/"
          className="font-display font-bold text-xl text-accent tracking-widest hover:opacity-80 transition"
          aria-label={`${siteConfig.alias} home`}
        >
          {siteConfig.alias}
        </a>

        {/* Nav desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`text-sm font-medium transition hover:text-accent ${
                activeSection === link.id ? 'text-accent' : 'text-muted'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="text-xs font-mono font-bold text-muted hover:text-accent transition px-2 py-1 border border-border rounded hover:border-accent"
          >
            {t.lang.switch}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.theme.light : t.theme.dark}
            title={theme === 'dark' ? t.theme.light : t.theme.dark}
            className="text-muted hover:text-accent transition p-1.5 rounded hover:bg-surface-el"
          >
            {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>

          {/* Terminal */}
          <button
            onClick={() => onStateChange(true)}
            aria-label={t.nav.cli}
            title={t.nav.cli}
            className="text-muted hover:text-accent transition p-1.5 rounded hover:bg-surface-el"
          >
            <FaTerminal size={16} />
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden text-fore hover:text-accent transition p-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border flex flex-col px-6 py-4 gap-4 shadow-xl animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={closeMenu}
              className={`text-base font-medium transition hover:text-accent ${
                activeSection === link.id ? 'text-accent' : 'text-fore'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-3 border-t border-border">
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
};

export default Header;
