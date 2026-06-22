'use client';
import { FaGithub, FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import IconBar from '../IconBar/IconBar';
import BrandMark from '../Brand/BrandMark';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

const coreStack = ['React', 'Next.js', 'Astro', 'Node.js', 'TypeScript', 'NestJS'];

const AboutSection: React.FC = () => {
  const { t, lang } = useLang();

  const stats = [
    { value: `${siteConfig.stats.years}+`, label: t.stats.years },
    { value: `${siteConfig.stats.projects}+`, label: t.stats.projects },
    { value: `${siteConfig.stats.clients}+`, label: t.stats.clients },
  ];

  return (
    <section id="about" className="bg-surface relative py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
        {/* Brand identity card (replaces personal photo) */}
        <div className="w-full md:w-2/5 flex flex-col items-center">
          <div className="relative w-full max-w-sm">
            {/* floating availability badge */}
            {siteConfig.available && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 border border-green/30 text-green text-xs font-medium backdrop-blur-sm whitespace-nowrap">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green" />
                </span>
                {t.about.available}
              </span>
            )}

            <div className="rounded-3xl border border-border bg-surface-el p-8 shadow-2xl">
              <div className="flex justify-center">
                <BrandMark size={132} />
              </div>

              <p className="mt-5 text-center font-display text-2xl font-bold text-fore tracking-wide">
                {siteConfig.alias}
              </p>
              <p className="text-center text-[10px] uppercase tracking-[0.25em] text-muted">
                {t.about.brand}
              </p>
              <p className="mt-1 text-center text-sm text-accent font-medium">
                {siteConfig.role[lang]}
              </p>
              <p className="mt-1 text-center text-xs text-muted">
                {siteConfig.location} {siteConfig.locationFlag}
              </p>

              {/* stat chips */}
              <div className="mt-6 grid grid-cols-3 gap-2">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl bg-bg border border-border py-2.5 text-center"
                  >
                    <p className="font-display text-lg font-bold text-accent leading-none">
                      {s.value}
                    </p>
                    <p className="mt-1 text-[10px] leading-tight text-muted">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* core stack badges */}
              <div className="mt-5 flex flex-wrap justify-center gap-1.5">
                {coreStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <IconBar className="mt-8" />
        </div>

        {/* Intro content */}
        <div className="w-full md:w-3/5 flex flex-col items-start justify-center space-y-5">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent" />
            {t.about.title}
          </span>

          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-fore leading-tight">
            {siteConfig.name.split(' ').slice(0, 2).join(' ')}
            <span className="block text-accent mt-1">{siteConfig.role[lang]}</span>
          </h2>

          <p className="text-base text-muted leading-relaxed max-w-xl">
            {siteConfig.bio[lang]}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-accent-hover transition-all hover:scale-105 shadow-lg hover:shadow-accent/30"
            >
              {t.hero.cta} <FaArrowRight size={12} />
            </a>
            <a
              href={`${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappText[lang])}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebd57] transition-all hover:scale-105 shadow-lg"
            >
              <FaWhatsapp /> WhatsApp
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-fore text-sm font-medium hover:border-accent hover:text-accent transition-all"
            >
              <FaGithub /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
