'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import BrandPlaceholder from '../Brand/BrandPlaceholder';
import Reveal from '../Reveal/Reveal';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';
import { pathFor } from '@/lib/i18n';

/**
 * The home's short version of the work: a grid with one card per case and a
 * line of what changed. Cards fade in as they scroll into view, staggered per
 * row; each one opens the full case on /trabajo.
 *
 * Two cards run double width so 13 cases close full rows: the first case
 * (from `sm`, two columns) and the grouped agency card (from `lg`, three
 * columns, where it has to land at the start of a row — see the order in
 * site.ts). A wide card lays out side by side so its row keeps one height.
 */
const WIDE = {
  sm: { li: 'sm:col-span-2', link: 'sm:flex-row', media: 'sm:aspect-auto sm:w-1/2 sm:min-h-[16rem]', body: 'sm:justify-center sm:p-7' },
  lg: { li: 'lg:col-span-2', link: 'lg:flex-row', media: 'lg:aspect-auto lg:w-1/2 lg:min-h-[16rem]', body: 'lg:justify-center lg:p-7' },
};

const WorkGrid: React.FC = () => {
  const { t, lang } = useLang();
  const workPath = pathFor(lang, '/trabajo');

  return (
    <section id="work" className="bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <header className="mb-10">
            <h2 className="mb-3 font-display text-3xl font-bold text-fore md:text-4xl">{t.cases.title}</h2>
            <p className="max-w-2xl text-muted">{t.cases.subtitle}</p>
          </header>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.caseStudies.map((item, i) => {
            const title = item.product ?? item.name;
            const wide = i === 0 ? WIDE.sm : 'group' in item ? WIDE.lg : null;
            return (
              <li key={item.slug} className={wide?.li}>
                <Reveal delay={(i % 3) * 90} className="h-full">
                  <Link
                    href={`${workPath}#${item.slug}`}
                    className={`group flex h-full flex-col overflow-hidden ${wide?.link ?? ''} rounded-2xl border border-border bg-surface-el transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-2xl`}
                  >
                    <div className={`relative aspect-[16/10] w-full shrink-0 overflow-hidden ${wide?.media ?? ''}`}>
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={`${title} — ${item.sector[lang]}`}
                          fill
                          sizes={wide ? '(max-width: 640px) 100vw, 560px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px'}
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <BrandPlaceholder title={title} compact />
                      )}
                      {item.status === 'dev' && (
                        <span className="absolute left-3 top-3 rounded-full bg-bg/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-accent backdrop-blur">
                          {t.cases.inDevelopment}
                        </span>
                      )}
                    </div>
                    <div className={`flex flex-1 flex-col p-5 ${wide?.body ?? ''}`}>
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
                </Reveal>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-center">
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

export default WorkGrid;
