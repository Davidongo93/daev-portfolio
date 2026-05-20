'use client';
import { FaArrowDown, FaGithub, FaLinkedin } from 'react-icons/fa';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

const HeroSection: React.FC = () => {
  const { t, lang } = useLang();

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center pt-20 pb-12 px-4 md:px-8 bg-gradient-to-b from-surface via-bg to-bg"
    >
      <div className="max-w-5xl w-full text-center space-y-6 animate-fade-in">
        {/* Status badge */}
        {siteConfig.available && (
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 border border-green/30 text-green text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green" />
              </span>
              {t.about.available}
            </span>
          </div>
        )}

        <p className="text-sm md:text-base text-muted font-mono">
          {t.hero.greeting} {siteConfig.locationFlag}
        </p>

        <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-fore leading-[1.1] tracking-tight">
          {siteConfig.name.split(' ').slice(0, 2).join(' ')}
          <span className="block text-accent mt-2">{siteConfig.role[lang]}</span>
        </h1>

        <p className="text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
          {siteConfig.bio[lang]}
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-accent-hover transition-all hover:scale-105 shadow-lg hover:shadow-accent/30"
          >
            {t.hero.cta}
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-fore font-semibold text-sm hover:border-accent hover:text-accent transition-all"
          >
            {t.featured.title}
          </a>
        </div>

        <div className="flex justify-center gap-5 pt-2 text-muted">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-accent transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-accent transition-colors"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        <div className="pt-8 flex justify-center">
          <a
            href="#about"
            aria-label="Scroll down"
            className="text-muted hover:text-accent transition-colors animate-bounce"
          >
            <FaArrowDown size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
