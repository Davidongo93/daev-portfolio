'use client';
import React from 'react';
import { FaCode, FaServer, FaTools } from 'react-icons/fa';
import TechPill from '../TechPill/TechPill';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

const SkillsSection: React.FC = () => {
  const { t } = useLang();

  const categories = [
    { key: 'frontend' as const, label: t.skills.frontend, icon: FaCode, items: siteConfig.skills.frontend },
    { key: 'backend' as const, label: t.skills.backend, icon: FaServer, items: siteConfig.skills.backend },
    { key: 'tools' as const, label: t.skills.tools, icon: FaTools, items: siteConfig.skills.tools },
  ];

  return (
    <section id="skills" className="bg-bg py-20 md:py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-fore mb-3 text-center">
          {t.skills.title}
        </h2>
        <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.key}
                className="bg-surface-el rounded-2xl p-6 border border-border hover:border-accent/40 transition-all hover:-translate-y-1 hover:shadow-xl group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-fore">{cat.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => (
                    <TechPill key={skill} tech={skill} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
