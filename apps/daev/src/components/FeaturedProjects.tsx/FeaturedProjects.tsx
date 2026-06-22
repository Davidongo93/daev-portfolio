'use client';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import ProjectCard from '../Projects/ProjectCard';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

const FeaturedProjects: React.FC = () => {
  const { t } = useLang();

  return (
    <section id="featured-projects" className="bg-surface py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-fore mb-3 text-center">
          {t.featured.title}
        </h2>
        <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.featuredProjects.map((project) => (
            <ProjectCard key={project.repoUrl} project={project} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-accent-hover transition-all hover:scale-105 shadow-lg"
          >
            {t.featured.cta} <FaArrowRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
