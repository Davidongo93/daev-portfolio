'use client';
import React from 'react';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

/**
 * Proof bar directly under the hero: the client names, before any claim about
 * what I can do. Names only — logos would need each client's brand assets and
 * their permission to use them.
 */
const ClientStrip: React.FC = () => {
  const { lang } = useLang();

  return (
    <section
      aria-label={lang === 'es' ? 'Clientes' : 'Clients'}
      className="border-y border-border bg-surface/60 py-6"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4">
        {siteConfig.caseStudies.map((c) => (
          <span
            key={c.slug}
            className="font-display text-sm font-semibold tracking-wide text-muted transition-colors hover:text-fore md:text-base"
          >
            {c.name}
          </span>
        ))}
      </div>
    </section>
  );
};

export default ClientStrip;
