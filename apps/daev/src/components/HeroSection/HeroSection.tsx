'use client';
import { FaArrowRight } from 'react-icons/fa';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';
import RotatingText from '../RotatingText/RotatingText';

const HeroSection: React.FC = () => {
  const { t, lang } = useLang();

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-[100svh] overflow-hidden px-4 pt-24 pb-16"
    >
      {/* Background layers */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-bg to-bg" />
        <div className="absolute inset-0 hero-grid opacity-70" />
        <div
          className="hero-glow absolute left-1/2 top-[32%] h-[440px] w-[680px] max-w-[90vw] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--accent), transparent 65%)' }}
        />
      </div>

      <div className="w-full max-w-4xl text-center space-y-6 animate-fade-in">
        {/* Availability badge */}
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

        {/* Dynamic, outcome-focused headline */}
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-fore leading-[1.08] tracking-tight">
          {t.hero.buildVerb}{' '}
          <span className="block sm:inline">
            <RotatingText words={t.hero.types} />
          </span>
        </h1>

        <p className="text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
          {siteConfig.shortBio[lang]}
        </p>

        {/* Proof row — every number here is backed by a case below. */}
        <dl className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-2">
          {[
            { value: `${siteConfig.caseStudies.length}`, label: t.hero.proofShipped },
            { value: '1,62 s', label: t.hero.proofLcp },
            { value: `${siteConfig.stats.years}+`, label: t.hero.proofYears },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <dd className="font-display text-2xl font-bold text-accent md:text-3xl">
                {item.value}
              </dd>
              <dt className="mt-0.5 text-xs text-muted">{item.label}</dt>
            </div>
          ))}
        </dl>

        {/* CTAs — full width on mobile */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-3">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-accent-hover transition-all hover:scale-105 shadow-lg hover:shadow-accent/30"
          >
            {t.hero.cta} <FaArrowRight size={12} />
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-fore font-semibold text-sm hover:border-accent hover:text-accent transition-all"
          >
            {t.hero.seeProjects}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
