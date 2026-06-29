'use client';
import Link from 'next/link';
import {
  FaHeart,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaDiscord,
  FaTerminal,
} from 'react-icons/fa';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';
import { useUI } from '../../context/UIContext';

export default function Footer() {
  const { t, lang } = useLang();
  const { showCli } = useUI();
  const year = new Date().getFullYear();

  const sectionLinks = [
    { href: '/#about', label: t.nav.about },
    { href: '/#services', label: t.nav.services },
    { href: '/#skills', label: t.nav.skills },
    { href: '/#featured-projects', label: t.nav.projects },
    { href: '/#contact', label: t.nav.contact },
  ];

  const social = [
    { href: siteConfig.links.github, label: 'GitHub', Icon: FaGithub },
    { href: siteConfig.links.linkedin, label: 'LinkedIn', Icon: FaLinkedin },
    { href: siteConfig.links.twitter, label: 'X', Icon: FaTwitter },
    { href: siteConfig.links.instagram, label: 'Instagram', Icon: FaInstagram },
    { href: siteConfig.links.discord, label: 'Discord', Icon: FaDiscord },
  ];

  return (
    <footer className="bg-surface border-t border-border pt-12 pb-8 mt-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand + social */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display font-bold text-accent text-xl tracking-widest hover:opacity-80 transition"
            >
              {siteConfig.alias}
            </Link>
            <p className="text-xs text-muted mt-2 max-w-xs">{t.footer.tagline}</p>
            <div className="flex items-center gap-3 mt-4">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted hover:text-accent transition"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <nav aria-label={t.footer.navTitle}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-fore mb-3">
              {t.footer.navTitle}
            </h3>
            <ul className="space-y-2">
              {sectionLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted hover:text-accent transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Explore */}
          <nav aria-label={t.footer.exploreTitle}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-fore mb-3">
              {t.footer.exploreTitle}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted hover:text-accent transition"
                >
                  {t.nav.pricing}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted hover:text-accent transition"
                >
                  /blog
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={showCli}
                  className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition"
                >
                  <FaTerminal size={12} /> {t.nav.cli}
                </button>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted hover:text-accent transition"
                >
                  {lang === 'es' ? 'Privacidad' : 'Privacy'}
                </Link>
              </li>
              <li>
                <Link
                  href="/data-deletion"
                  className="text-sm text-muted hover:text-accent transition"
                >
                  {lang === 'es' ? 'Eliminar mis datos' : 'Data deletion'}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-fore mb-3">
              {t.contact.title}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-muted hover:text-accent transition break-all"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-accent transition"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <p className="text-xs text-muted">
            © {year} {siteConfig.name}. {t.footer.rights}.
          </p>
          <p className="text-xs text-muted flex items-center gap-1.5">
            {t.footer.madeWith} <FaHeart className="text-red-500" />{' '}
            {lang === 'es' ? 'en' : 'in'} {siteConfig.location} {siteConfig.locationFlag}
          </p>
        </div>
      </div>
    </footer>
  );
}
