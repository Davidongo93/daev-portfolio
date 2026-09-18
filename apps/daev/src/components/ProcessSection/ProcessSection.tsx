'use client';
import React from 'react';
import { FaComments, FaFileSignature, FaEye, FaRocket } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { useLang } from '../../context/LangContext';

const icons: IconType[] = [FaComments, FaFileSignature, FaEye, FaRocket];

/**
 * Replaces the employment timeline. A client does not care where I worked;
 * they care what happens after they write to me.
 */
const ProcessSection: React.FC = () => {
  const { t } = useLang();

  return (
    <section id="process" className="bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-12 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-fore md:text-4xl">
            {t.process.title}
          </h2>
          <p className="mx-auto max-w-2xl text-muted">{t.process.subtitle}</p>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-accent" />
        </header>

        <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, i) => {
            const Icon = icons[i] ?? FaComments;
            return (
              <li
                key={step.title}
                className="relative rounded-2xl border border-border bg-surface-el p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
              >
                <span className="absolute right-5 top-4 font-display text-4xl font-bold text-accent/15">
                  {i + 1}
                </span>
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon size={18} />
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold text-fore">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
