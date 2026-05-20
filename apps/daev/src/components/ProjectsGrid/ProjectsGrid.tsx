'use client';
import React from 'react';
import Link from 'next/link';
import { FaStar, FaCodeBranch, FaCalendarAlt } from 'react-icons/fa';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
  license: { name: string } | null;
  updated_at: string;
}

interface CardGridProps {
  repos: Repo[];
}

const CardGrid: React.FC<CardGridProps> = ({ repos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo) => (
        <Link
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <article className="h-full p-5 rounded-2xl border border-border bg-surface-el hover:border-accent/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
            <header className="mb-3">
              <h3 className="font-display text-lg font-semibold text-fore group-hover:text-accent transition line-clamp-1">
                {repo.name}
              </h3>
              {repo.language && (
                <span className="inline-block mt-1 text-xs text-accent font-mono">
                  {repo.language}
                </span>
              )}
            </header>

            <p className="text-sm text-muted line-clamp-3 mb-4 flex-1">
              {repo.description || 'No description available.'}
            </p>

            <footer className="flex items-center justify-between text-xs text-muted pt-3 border-t border-border">
              <div className="flex items-center gap-3">
                {repo.stargazers_count > 0 && (
                  <span className="inline-flex items-center gap-1">
                    <FaStar /> {repo.stargazers_count}
                  </span>
                )}
                {repo.forks_count > 0 && (
                  <span className="inline-flex items-center gap-1">
                    <FaCodeBranch /> {repo.forks_count}
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-1">
                <FaCalendarAlt />
                {new Date(repo.updated_at).toLocaleDateString()}
              </span>
            </footer>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default CardGrid;
