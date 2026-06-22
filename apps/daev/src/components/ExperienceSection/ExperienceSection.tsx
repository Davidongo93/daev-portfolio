'use client';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

const ExperienceSection: React.FC = () => {
  const { t, lang } = useLang();

  return (
    <section id="experience" className="bg-surface relative py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
        {/* Title and intro */}
        <div className="space-y-5">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-fore">
            {t.experience.title}
          </h2>
          <p className="text-base text-muted leading-relaxed max-w-md">
            {t.experience.intro}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-bg text-sm font-semibold hover:bg-accent-hover transition-all hover:scale-105 shadow-lg"
          >
            {t.experience.contact} <FaArrowRight size={12} />
          </a>
        </div>

        {/* Timeline */}
        <ol className="relative">
          {siteConfig.experience.map((exp, i) => (
            <li
              key={exp.company}
              className={`relative pl-8 ${
                i < siteConfig.experience.length - 1 ? 'pb-8 border-l-2 border-border' : 'pb-2'
              }`}
            >
              <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-accent border-4 border-bg shadow-md" />
              <div className="bg-surface-el rounded-xl p-4 border border-border hover:border-accent/40 transition">
                <div className="flex items-center gap-3 mb-2">
                  {exp.logo ? (
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={32}
                      height={32}
                      className="rounded object-contain"
                    />
                  ) : (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent font-display font-bold text-sm">
                      {exp.company.charAt(0)}
                    </span>
                  )}
                  <div className="flex-1">
                    {exp.website ? (
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-fore hover:text-accent transition"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <span className="font-semibold text-fore">{exp.company}</span>
                    )}
                  </div>
                  <span className="text-xs text-muted font-mono whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-accent font-medium mb-1.5">{exp.role[lang]}</p>
                <p className="text-sm text-muted leading-relaxed">{exp.description[lang]}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ExperienceSection;
