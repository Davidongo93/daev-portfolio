'use client';
import React from 'react';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import TechPill from '../TechPill/TechPill';
import BrandPlaceholder from '../Brand/BrandPlaceholder';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

/**
 * Side projects and technical challenges. Deliberately lower in the page and
 * smaller than the case studies: these prove craft, not business outcomes.
 */
const LabProjects: React.FC = () => {
  const { t, lang } = useLang();

  return (
    <section id="lab" className="bg-bg py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-12 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-fore md:text-4xl">
            {t.lab.title}
          </h2>
          <p className="mx-auto max-w-2xl text-muted">{t.lab.subtitle}</p>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-accent" />
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.labProjects.map((p) => (
            <article
              key={p.repoUrl}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-el transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-2xl"
            >
              <div className="relative h-40 w-full overflow-hidden">
                {p.thumbnail ? (
                  <Image
                    src={p.thumbnail}
                    alt={`${p.name} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <BrandPlaceholder title={p.name} label={p.type[lang]} compact />
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 font-display font-semibold text-fore">{p.name}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                  {p.description[lang]}
                </p>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {p.technologies.slice(0, 4).map((tech) => (
                    <TechPill key={tech} tech={tech} />
                  ))}
                </div>

                <div className="mt-auto flex gap-2">
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border py-2 text-xs text-muted transition hover:border-accent hover:text-accent"
                    >
                      <FaGithub /> {t.lab.code}
                    </a>
                  )}
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-accent py-2 text-xs font-semibold text-bg transition hover:bg-accent-hover"
                    >
                      <FaExternalLinkAlt /> {t.lab.demo}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabProjects;
