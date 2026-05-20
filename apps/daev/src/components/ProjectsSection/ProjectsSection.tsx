'use client';
import React, { useState, useEffect } from 'react';
import { FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CardGrid from '../ProjectsGrid/ProjectsGrid';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
  fork: boolean;
  license: { name: string } | null;
  updated_at: string;
}

const ProjectsSection: React.FC = () => {
  const { t } = useLang();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  useEffect(() => {
    fetch('/api/github')
      .then((res) => res.json())
      .then((data: Repo[]) => {
        if (Array.isArray(data)) {
          const filtered = data
            .filter((r) => !r.fork && r.description)
            .sort(
              (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
            );
          setRepos(filtered);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(repos.length / projectsPerPage));
  const currentProjects = repos.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <section id="projects" className="py-16 md:py-20 bg-bg">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-fore mb-3 text-center">
          {t.projects.title}
        </h2>
        <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-12" />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-56 bg-surface-el rounded-2xl animate-pulse border border-border"
              />
            ))}
          </div>
        ) : (
          <>
            <CardGrid repos={currentProjects} />

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="p-2 rounded-lg border border-border text-muted hover:text-accent hover:border-accent transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                    className={`min-w-[2.5rem] h-10 rounded-lg font-medium text-sm transition ${
                      currentPage === page
                        ? 'bg-accent text-bg'
                        : 'border border-border text-muted hover:text-accent hover:border-accent'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="p-2 rounded-lg border border-border text-muted hover:text-accent hover:border-accent transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}

            <div className="mt-10 text-center">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-fore text-sm font-medium hover:border-accent hover:text-accent transition"
              >
                <FaGithub /> {t.projects.viewAll}
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
