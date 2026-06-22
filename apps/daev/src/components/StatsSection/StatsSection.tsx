'use client';
import React, { useEffect, useState } from 'react';
import {
  FaBriefcase,
  FaRocket,
  FaHandshake,
  FaBook,
  FaStar,
  FaUsers,
  FaClock,
  FaCode,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

interface LangBar {
  name: string;
  pct: number;
}

interface Stats {
  github: {
    repos: number;
    followers: number;
    stars: number;
    forks: number;
    topLanguages: { name: string; count: number; pct: number }[];
    topRepo: { name: string; stars: number; url: string } | null;
  } | null;
  wakatime: {
    totalText: string;
    dailyAverageText: string;
    range: string;
    topEditor: string | null;
    languages: { name: string; pct: number; text: string }[];
  } | null;
}

const wakaWidget =
  'https://github-readme-stats.vercel.app/api/wakatime?username=davidongo93&layout=compact&hide_border=true&hide_title=true&langs_count=6&bg_color=00000000&title_color=00e5ff&text_color=94a3b8';

function Bars({ items }: { items: LangBar[] }) {
  return (
    <div className="space-y-3">
      {items.map((l) => (
        <div key={l.name}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-fore font-medium">{l.name}</span>
            <span className="text-muted font-mono">{l.pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-bg overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
              style={{ width: `${Math.max(l.pct, 3)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const StatsSection: React.FC = () => {
  const { t } = useLang();
  const [data, setData] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github-stats')
      .then((r) => r.json())
      .then((d: Stats) => setData(d))
      .catch(() => setData({ github: null, wakatime: null }))
      .finally(() => setLoading(false));
  }, []);

  const g = data?.github;
  const wk = data?.wakatime;

  const metrics: { icon: IconType; value: string | number | undefined; label: string; live: boolean }[] = [
    { icon: FaBriefcase, value: `${siteConfig.stats.years}+`, label: t.stats.years, live: false },
    { icon: FaRocket, value: `${siteConfig.stats.projects}+`, label: t.stats.projects, live: false },
    { icon: FaHandshake, value: `${siteConfig.stats.clients}+`, label: t.stats.clients, live: false },
    { icon: FaBook, value: g?.repos, label: t.stats.repos, live: true },
    { icon: FaStar, value: g?.stars, label: t.stats.stars, live: true },
    { icon: FaUsers, value: g?.followers, label: t.stats.followers, live: true },
  ];

  return (
    <section id="stats" className="bg-bg py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-fore mb-3 text-center">
          {t.stats.title}
        </h2>
        <p className="text-muted text-center max-w-xl mx-auto mb-3">{t.stats.subtitle}</p>
        <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-12" />

        {/* Metric cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="bg-surface-el rounded-2xl p-5 border border-border text-center transition hover:border-accent/40 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent mb-3">
                  <Icon size={16} />
                </span>
                {m.live && loading ? (
                  <div className="h-8 w-12 mx-auto rounded bg-bg animate-pulse" />
                ) : (
                  <p className="font-display text-2xl md:text-3xl font-bold text-accent leading-none">
                    {m.live ? m.value ?? '—' : m.value}
                  </p>
                )}
                <p className="mt-2 text-xs text-muted leading-tight">{m.label}</p>
              </div>
            );
          })}
        </div>

        {/* Lower grid: languages + coding activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top languages (GitHub) */}
          <div className="bg-surface-el rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-5">
              <FaCode className="text-accent" />
              <h3 className="font-display font-semibold text-fore">{t.stats.languages}</h3>
              <span className="ml-auto text-[11px] text-muted font-mono">{t.stats.byRepos}</span>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-5 rounded bg-bg animate-pulse" />
                ))}
              </div>
            ) : g?.topLanguages?.length ? (
              <Bars items={g.topLanguages} />
            ) : (
              <p className="text-sm text-muted">GitHub data unavailable right now.</p>
            )}

            {g?.topRepo && (
              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-sm">
                <span className="text-muted">{t.stats.topRepo}</span>
                <a
                  href={g.topRepo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-accent hover:text-accent-hover transition"
                >
                  {g.topRepo.name}
                  <span className="inline-flex items-center gap-1 text-muted">
                    <FaStar size={11} /> {g.topRepo.stars}
                  </span>
                </a>
              </div>
            )}
          </div>

          {/* Coding activity (WakaTime) */}
          <div className="bg-surface-el rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-5">
              <FaClock className="text-accent" />
              <h3 className="font-display font-semibold text-fore">{t.stats.activity}</h3>
              <span className="ml-auto text-[11px] text-muted font-mono">{t.stats.viaWakatime}</span>
            </div>

            {wk ? (
              <div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="rounded-xl bg-bg border border-border p-4 text-center">
                    <p className="font-display text-lg font-bold text-accent leading-tight">
                      {wk.totalText}
                    </p>
                    <p className="mt-1 text-[11px] text-muted">{t.stats.last7days}</p>
                  </div>
                  <div className="rounded-xl bg-bg border border-border p-4 text-center">
                    <p className="font-display text-lg font-bold text-accent leading-tight">
                      {wk.dailyAverageText}
                    </p>
                    <p className="mt-1 text-[11px] text-muted">{t.stats.dailyAverage}</p>
                  </div>
                </div>
                {wk.languages?.length > 0 && <Bars items={wk.languages} />}
                {wk.topEditor && (
                  <p className="mt-5 pt-4 border-t border-border text-sm text-muted">
                    {t.stats.topEditor}:{' '}
                    <span className="text-fore font-medium">{wk.topEditor}</span>
                  </p>
                )}
              </div>
            ) : (
              // Fallback: themed WakaTime widget (works without an API key)
              <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={wakaWidget}
                  alt="WakaTime coding activity"
                  loading="lazy"
                  className="w-full max-w-sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
