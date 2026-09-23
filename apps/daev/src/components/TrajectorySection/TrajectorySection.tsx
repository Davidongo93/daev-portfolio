'use client';
import { FaFileDownload } from 'react-icons/fa';
import StatNumbers from '../StatNumbers/StatNumbers';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

/**
 * Career timeline, newest first. Work and the study that changed direction
 * share the line; study entries get a hollow marker so the two read apart.
 * Data lives in site.ts → experience (source: docs/career.md).
 */
const TrajectorySection: React.FC = () => {
  const { t, lang } = useLang();

  return (
    <section id="trajectory" className="bg-bg py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-10 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-fore md:text-4xl">
            {t.trajectory.title}
          </h2>
          <p className="mx-auto max-w-2xl text-muted">{t.trajectory.subtitle}</p>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-accent" />
        </header>

        <StatNumbers className="mb-14" />

        <ol className="relative mx-auto max-w-3xl border-l-2 border-border pl-8">
          {siteConfig.experience.map((exp) => {
            const study = exp.kind === 'study';
            return (
              <li key={exp.company + exp.period.en} className="relative pb-10 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-4 border-bg ${
                    study ? 'bg-bg ring-2 ring-accent/60' : 'bg-accent'
                  }`}
                />
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  {exp.period[lang]}
                  {study && <span className="ml-2 text-accent">· {t.trajectory.study}</span>}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-fore md:text-xl">
                  {exp.role[lang]}
                </h3>
                <p className="text-sm font-semibold text-accent">
                  {exp.website ? (
                    <a href={exp.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{exp.description[lang]}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 text-center">
          <a
            href={siteConfig.cv[lang]}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-fore transition hover:border-accent hover:text-accent"
          >
            <FaFileDownload aria-hidden="true" /> {t.trajectory.cv}
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrajectorySection;
