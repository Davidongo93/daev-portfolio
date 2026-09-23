'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import BrandPlaceholder from '../Brand/BrandPlaceholder';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';
import { pathFor } from '@/lib/i18n';

/**
 * The home's short version of the work: one card per case with a line of what
 * changed. Each card opens the full case on /trabajo. Native scroll-snap, so it
 * swipes on touch and scrolls with the keyboard without any carousel library.
 */
const WorkCarousel: React.FC = () => {
  const { t, lang } = useLang();
  const track = useRef<HTMLUListElement>(null);
  const workPath = pathFor(lang, '/trabajo');

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  const arrow =
    'flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition hover:border-accent hover:text-accent';

  return (
    <section id="work" className="bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-3 font-display text-3xl font-bold text-fore md:text-4xl">
              {t.cases.title}
            </h2>
            <p className="max-w-2xl text-muted">{t.cases.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => scrollBy(-1)} aria-label={t.carousel.prev} className={arrow}>
              <FaChevronLeft />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label={t.carousel.next} className={arrow}>
              <FaChevronRight />
            </button>
          </div>
        </header>

        <ul
          ref={track}
          className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:thin]"
        >
          {siteConfig.caseStudies.map((item) => {
            const title = item.product ?? item.name;
            return (
              <li key={item.slug} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]">
                <Link
                  href={`${workPath}#${item.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-el transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-2xl"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={`${title} — ${item.sector[lang]}`}
                        fill
                        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 360px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <BrandPlaceholder title={title} compact />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                      {item.sector[lang].split(' · ')[0]} · {item.year}
                    </p>
                    <h3 className="mb-2 font-display text-lg font-semibold text-fore">{title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted">{item.summary[lang]}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      {t.carousel.seeCase}
                      <FaArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 text-center">
          <Link
            href={workPath}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-fore transition hover:border-accent hover:text-accent"
          >
            {t.carousel.seeAll} <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkCarousel;
