'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaExternalLinkAlt, FaImages } from 'react-icons/fa';
import GalleryDialog from '../GalleryDialog/GalleryDialog';
import TechPill from '../TechPill/TechPill';
import BrandPlaceholder from '../Brand/BrandPlaceholder';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

type Case = (typeof siteConfig.caseStudies)[number];

/**
 * Alternating full-width rows instead of a card grid: a case needs room to say
 * what was broken, what got built and what changed. Lives on /trabajo; the
 * home only shows a carousel that links here, one anchor per case.
 */
const CaseRow: React.FC<{ item: Case; index: number }> = ({ item, index }) => {
  const { t, lang } = useLang();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const flipped = index % 2 === 1;
  const title = item.product ?? item.name;
  const photos: string[] = [item.thumbnail, ...item.gallery];

  return (
    <article id={item.slug} className="grid scroll-mt-24 gap-8 md:grid-cols-2 md:items-center md:gap-12">
      {/* Screenshot — opens the gallery */}
      <div className={flipped ? 'md:order-2' : ''}>
        <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-surface-el shadow-xl">
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={`${title} — ${item.sector[lang]}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <BrandPlaceholder title={title} />
          )}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={() => setGalleryOpen(true)}
              className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg border border-border bg-surface/90 px-3 py-2 text-xs font-semibold text-fore shadow-lg backdrop-blur-md transition hover:border-accent hover:text-accent"
            >
              <FaImages aria-hidden="true" /> {t.gallery.open}
              <span className="font-mono text-muted">{photos.length}</span>
            </button>
          )}
        </div>
        <GalleryDialog
          title={title}
          images={photos}
          open={galleryOpen}
          onClose={() => setGalleryOpen(false)}
        />
      </div>

      {/* Story */}
      <div className={`space-y-5 ${flipped ? 'md:order-1' : ''}`}>
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {item.sector[lang]} · {item.year}
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-fore">{title}</h3>
          <p className="text-sm text-muted">
            {item.product && <>{item.name} · </>}
            {t.cases.role}: {item.role[lang]}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
              {t.cases.problem}
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted">{item.problem[lang]}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
              {t.cases.work}
            </p>
            <p className="text-sm md:text-base leading-relaxed text-fore">{item.work[lang]}</p>
          </div>
        </div>

        {/* Measured numbers — only ever rendered when there are real ones. */}
        {item.metrics.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
              {t.cases.result}
            </p>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {item.metrics.map((m) => (
                <div
                  key={m.label.en}
                  className="rounded-xl border border-accent/20 bg-accent/5 p-3 text-center"
                >
                  <dt className="sr-only">{m.label[lang]}</dt>
                  <dd className="font-display text-xl font-bold text-accent">{m.value}</dd>
                  <p className="mt-0.5 text-[11px] font-mono text-muted line-through decoration-muted/60">
                    {m.from}
                  </p>
                  <p className="mt-1 text-[11px] leading-tight text-muted">{m.label[lang]}</p>
                </div>
              ))}
            </dl>
          </div>
        )}

        {item.highlights.length > 0 && (
          <ul className="space-y-1.5">
            {item.highlights.map((h) => (
              <li key={h.en} className="flex gap-2 text-sm text-muted">
                <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {h[lang]}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-1.5">
          {item.technologies.map((tech) => (
            <TechPill key={tech} tech={tech} />
          ))}
        </div>

        {item.liveUrl ? (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg shadow-lg transition-all hover:scale-105 hover:bg-accent-hover"
          >
            {t.cases.visit} <FaExternalLinkAlt size={11} />
          </a>
        ) : (
          <p className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-mono text-muted">
            {t.cases.inMigration}
          </p>
        )}
      </div>
    </article>
  );
};

const CaseStudies: React.FC = () => (
  <div className="space-y-20 md:space-y-28">
    {siteConfig.caseStudies.map((item, i) => (
      <CaseRow key={item.slug} item={item} index={i} />
    ))}
  </div>
);

export default CaseStudies;
