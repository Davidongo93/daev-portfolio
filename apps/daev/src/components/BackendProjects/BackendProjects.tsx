'use client';
import Image from 'next/image';
import { FaGithub, FaLock } from 'react-icons/fa';
import TechPill from '../TechPill/TechPill';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

/**
 * Backend work on /trabajo. A backend has no screen, so each card shows the
 * code that carries its logic (captured with scripts/shots/code-card.mjs).
 */
const BackendProjects: React.FC = () => {
  const { t, lang } = useLang();

  return (
    <section id="backend" className="scroll-mt-24">
      <header className="mb-12 text-center">
        <h2 className="mb-3 font-display text-3xl font-bold text-fore md:text-4xl">
          {t.backend.title}
        </h2>
        <p className="mx-auto max-w-2xl text-muted">{t.backend.subtitle}</p>
        <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-accent" />
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {siteConfig.backendProjects.map((p) => (
          <article
            key={p.name}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-el transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-2xl"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg">
              <Image
                src={p.thumbnail}
                alt={`${p.name} — ${t.backend.code}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <h3 className="font-display font-semibold text-fore">{p.name}</h3>
                <span className="font-mono text-xs text-muted">{p.year}</span>
              </div>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">{p.description[lang]}</p>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {p.technologies.map((tech) => (
                  <TechPill key={tech} tech={tech} />
                ))}
              </div>

              {p.repoUrl ? (
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-md border border-border py-2 text-xs text-muted transition hover:border-accent hover:text-accent"
                >
                  <FaGithub /> {t.backend.code}
                </a>
              ) : (
                <p className="inline-flex items-center justify-center gap-1.5 rounded-md border border-dashed border-border py-2 text-xs text-muted">
                  <FaLock /> {t.backend.private}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BackendProjects;
