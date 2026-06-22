'use client';
import {
  FaRocket,
  FaLaptopCode,
  FaShoppingCart,
  FaGraduationCap,
  FaCogs,
  FaCloud,
  FaWhatsapp,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

const iconMap: Record<string, IconType> = {
  rocket: FaRocket,
  web: FaLaptopCode,
  cart: FaShoppingCart,
  lms: FaGraduationCap,
  software: FaCogs,
  saas: FaCloud,
};

const ServicesSection: React.FC = () => {
  const { t, lang } = useLang();

  return (
    <section id="services" className="bg-bg py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-fore mb-3 text-center">
          {t.services.title}
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-3">{t.services.subtitle}</p>
        <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((service) => {
            const Icon = iconMap[service.icon] ?? FaRocket;
            const waUrl = `${siteConfig.whatsapp}?text=${encodeURIComponent(
              service.whatsapp[lang]
            )}`;

            return (
              <article
                key={service.key}
                className="group flex flex-col rounded-2xl border border-border bg-surface-el p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-2xl"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent/20">
                  <Icon size={22} />
                </span>

                <h3 className="font-display text-lg font-semibold text-fore">
                  {service.title[lang]}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {service.description[lang]}
                </p>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2.5 text-sm font-semibold text-[#1ebd57] transition-all hover:bg-[#25D366] hover:text-white"
                  aria-label={`${t.services.cta} — ${service.title[lang]}`}
                >
                  <FaWhatsapp /> {t.services.cta}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
