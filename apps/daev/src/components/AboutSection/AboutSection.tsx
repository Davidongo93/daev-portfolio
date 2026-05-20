'use client';
import Image from 'next/image';
import { FaGithub, FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import IconBar from '../IconBar/IconBar';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

const AboutSection: React.FC = () => {
  const { t, lang } = useLang();

  return (
    <section
      id="about"
      className="bg-surface/95 backdrop-blur-sm relative"
      style={{ minHeight: 'calc(100vh - 4rem)' }}
    >
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row-reverse items-center justify-between gap-10 h-full">
        {/* Photo + IconBar */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <div className="relative w-56 sm:w-64 md:w-72 lg:w-80 aspect-square overflow-hidden rounded-2xl shadow-2xl ring-2 ring-accent/20">
            <Image
              src="/daveDad.png"
              fill
              sizes="(max-width: 768px) 224px, 320px"
              className="object-cover transition-all duration-500 saturate-0 hover:saturate-100"
              alt={`${siteConfig.name} — ${siteConfig.role[lang]}`}
              priority
            />
          </div>
          <IconBar className="mt-6" />
        </div>

        {/* Hero content */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center space-y-5 animate-slide-up">
          {siteConfig.available && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 border border-green/30 text-green text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green" />
              </span>
              {t.about.available}
            </span>
          )}

          <p className="text-sm text-muted font-mono">
            {t.hero.greeting} {siteConfig.locationFlag}
          </p>

          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-fore leading-tight">
            {siteConfig.name.split(' ').slice(0, 2).join(' ')}
            <span className="block text-accent mt-1">{siteConfig.role[lang]}</span>
          </h1>

          <p className="text-base text-muted leading-relaxed max-w-lg">
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
