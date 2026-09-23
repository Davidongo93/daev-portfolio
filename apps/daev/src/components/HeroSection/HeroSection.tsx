'use client';
import { FaArrowRight, FaFileDownload } from 'react-icons/fa';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';
import RotatingText from '../RotatingText/RotatingText';
import StatNumbers from '../StatNumbers/StatNumbers';

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

        {/* Hidden on very short screens so the CTAs stay above the fold; the
            same figures open the journey section. */}
        <StatNumbers
          variant="inline"
          className="mx-auto max-w-3xl pt-2 [@media(max-height:640px)]:hidden"
        />

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

        {/* Recruiter path: downloads the CV and lands on the contact section. */}
        <p className="text-sm text-muted">
          {t.hero.recruiter}{' '}
          <a
            href={siteConfig.cv[lang]}
            download
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="inline-flex items-center gap-1.5 font-semibold text-accent underline-offset-4 hover:underline"
          >
            {t.hero.recruiterCta} <FaFileDownload size={12} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
