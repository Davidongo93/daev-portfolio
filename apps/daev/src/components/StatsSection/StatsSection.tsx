'use client';
import React from 'react';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

const StatsSection: React.FC = () => {
  const { t } = useLang();

  const stats = [
    { value: `${siteConfig.stats.years}+`, label: t.stats.years },
    { value: `${siteConfig.stats.projects}+`, label: t.stats.projects },
    { value: `${siteConfig.stats.clients}+`, label: t.stats.clients },
  ];

  return (
    <section id="stats" className="bg-bg py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-fore mb-3 text-center">
          {t.stats.title}
        </h2>
        <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-12" />

        {/* GitHub stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface-el rounded-2xl p-4 border border-border flex justify-center">
            <img
              src="https://github-readme-stats.vercel.app/api/wakatime?username=davidongo93"
              alt="Wakatime Stats"
              className="w-full max-w-sm"
              loading="lazy"
            />
          </div>
          <div className="bg-surface-el rounded-2xl p-4 border border-border flex justify-center">
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=Davidongo93&langs_count=8"
              alt="Top Languages"
              className="w-full max-w-sm"
              loading="lazy"
            />
          </div>
          <div className="bg-surface-el rounded-2xl p-4 border border-border flex justify-center">
            <img
              src="https://github-readme-stats.vercel.app/api?username=Davidongo93&show_icons=true"
              alt="GitHub Stats"
              className="w-full max-w-sm"
              loading="lazy"
            />
          </div>
        </div>

        {/* Personal stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface-el rounded-2xl p-6 border border-border text-center hover:border-accent/40 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="font-display text-4xl md:text-5xl font-bold text-accent">{stat.value}</p>
              <p className="text-sm text-muted mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
