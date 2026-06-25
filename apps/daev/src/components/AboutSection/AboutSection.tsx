'use client';
import Image from 'next/image';
import { FaGithub, FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import IconBar from '../IconBar/IconBar';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

const AboutSection: React.FC = () => {
  const { t, lang } = useLang();

  const stats = [
    { value: `${siteConfig.stats.years}+`, label: t.stats.years },
    { value: `${siteConfig.stats.projects}+`, label: t.stats.projects },
    { value: `${siteConfig.stats.clients}+`, label: t.stats.clients },
  ];

  return (
    <section id="about" className="bg-surface relative py-20 md:py-24 overflow-hidden">
      {/* faint section grid for depth */}
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-[0.4]" />

      <div className="relative max-w-6xl mx-auto px-4 flex flex-col md:flex-row-reverse items-center justify-between gap-12 md:gap-16">
        {/* ── Photo card (right) ── */}
        <div className="w-full max-w-sm md:w-[44%] flex flex-col items-center">
          <div className="relative w-full">
            <div className="relative">
              {/* animated glow */}
              <div
                aria-hidden
                className="about-glow absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,var(--accent),transparent_70%)] opacity-50 blur-2xl"
              />

              {/* orbital rings — atom / physics motif */}
              <div
                aria-hidden
                className="about-orbit pointer-events-none absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15"
              >
                <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_2px_var(--accent)]" />
              </div>
              <div
                aria-hidden
                className="about-orbit-rev pointer-events-none absolute left-1/2 top-1/2 h-[134%] w-[134%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-2/10"
              >
                <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2 shadow-[0_0_10px_2px_var(--accent-2)]" />
              </div>

              {/* availability badge */}
              {siteConfig.available && (
                <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-green/30 bg-surface/80 px-3 py-1 text-xs font-medium text-green backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
                  </span>
                  {t.about.available}
                </span>
              )}

              {/* photo card (static) */}
              <div className="relative z-10 overflow-hidden rounded-3xl border border-border bg-surface-el shadow-2xl">
                <div className="relative aspect-square w-full">
                  <Image
                    src={siteConfig.photo}
                    alt={`${siteConfig.name} — ${siteConfig.role[lang]}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-cover object-[60%_center]"
                  />

                  {/* bottom gradient for legibility / depth */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-el/70 via-transparent to-transparent" />

                  {/* HUD corner brackets */}
                  <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-accent/60 rounded-tl" />
                  <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-accent/60 rounded-tr" />
                  <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-accent/60 rounded-bl" />
                  <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-accent/60 rounded-br" />
                </div>
              </div>
            </div>
          </div>

          <IconBar className="mt-10" />
        </div>

        {/* ── Intro content (left) ── */}
        <div className="w-full md:w-[56%] flex flex-col items-start justify-center space-y-5">
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

          {/* stat strip — quick credibility */}
          <div className="grid w-full max-w-md grid-cols-3 gap-3 pt-1">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-surface-el px-3 py-3 text-center transition-colors hover:border-accent/40"
              >
                <p className="font-display text-2xl font-bold leading-none text-accent">
                  {s.value}
                </p>
                <p className="mt-1.5 text-[11px] leading-tight text-muted">{s.label}</p>
              </div>
            ))}
          </div>

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
