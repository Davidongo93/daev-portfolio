'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import TechPill from '../TechPill/TechPill';
import BrandPlaceholder from '../Brand/BrandPlaceholder';
import { useLang } from '../../context/LangContext';
import type { Lang } from '../../context/LangContext';

interface Project {
  name: string;
  description: { en: string; es: string };
  repoUrl: string | null;
  liveUrl: string;
  technologies: readonly string[];
  date?: string;
  type: { en: string; es: string };
  collaboration: string | null;
  thumbnail: string | null;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { t, lang } = useLang();
  const [imgError, setImgError] = useState(false);

  const isExternal = !!project.thumbnail && project.thumbnail.startsWith('http');
  const showImage = !!project.thumbnail && !imgError;

  return (
    <article className="bg-surface-el rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group flex flex-col">
      {/* Thumbnail */}
      <div className="relative w-full h-44 overflow-hidden">
        {showImage ? (
          <>
            {isExternal ? (
              // Live screenshot (external service): graceful fallback on error.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.thumbnail as string}
                alt={`${project.name} preview`}
                loading="lazy"
                onError={() => setImgError(true)}
                className="absolute inset-0 h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <Image
                src={project.thumbnail as string}
                alt={`${project.name} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-el via-surface-el/30 to-transparent opacity-80" />
          </>
        ) : (
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
            <BrandPlaceholder title={project.name} compact />
          </div>
        )}
        <span className="absolute top-3 right-3 text-xs font-mono px-2 py-1 rounded-full bg-bg/80 backdrop-blur-sm border border-border text-muted z-10">
          {project.type[lang as Lang]}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display font-semibold text-fore mb-2 line-clamp-1">
          {project.name}
        </h3>
        <p className="text-sm text-muted mb-4 line-clamp-2 flex-1">
          {project.description[lang as Lang]}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <TechPill key={tech} tech={tech} />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs py-2 rounded-md border border-border text-muted hover:text-accent hover:border-accent transition"
              aria-label={`View ${project.name} repository`}
            >
              <FaGithub /> {t.featured.viewRepo}
            </a>
          )}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              project.repoUrl ? 'flex-1' : 'w-full'
            } inline-flex items-center justify-center gap-1.5 text-xs py-2 rounded-md bg-accent text-bg font-semibold hover:bg-accent-hover transition`}
            aria-label={`View ${project.name} live demo`}
          >
            <FaExternalLinkAlt /> {t.featured.liveDemo}
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
