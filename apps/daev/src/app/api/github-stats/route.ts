import { NextResponse } from 'next/server';

// Revalidate the aggregated stats once per hour.
export const revalidate = 3600;

const USER = 'Davidongo93';

interface GhRepo {
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  name: string;
  html_url: string;
}

async function gh(path: string) {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(`https://api.github.com${path}`, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub ${path} -> ${res.status}`);
  return res.json();
}

async function getGithub() {
  const [profile, repos]: [Record<string, unknown>, GhRepo[]] = await Promise.all([
    gh(`/users/${USER}`),
    gh(`/users/${USER}/repos?per_page=100&sort=pushed`),
  ]);

  const owned = repos.filter((r) => !r.fork);
  const stars = owned.reduce((s, r) => s + (r.stargazers_count || 0), 0);
  const forks = owned.reduce((s, r) => s + (r.forks_count || 0), 0);

  const counts: Record<string, number> = {};
  owned.forEach((r) => {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
  });
  const totalLangRepos = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  const topLanguages = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count, pct: Math.round((count / totalLangRepos) * 100) }));

  const topRepo = owned
    .slice()
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))[0];

  return {
    repos: (profile.public_repos as number) ?? owned.length,
    followers: (profile.followers as number) ?? 0,
    following: (profile.following as number) ?? 0,
    stars,
    forks,
    topLanguages,
    topRepo: topRepo
      ? { name: topRepo.name, stars: topRepo.stargazers_count, url: topRepo.html_url }
      : null,
  };
}

async function getWakatime() {
  const key = process.env.WAKATIME_API_KEY;
  if (!key) return null;
  try {
    const auth = Buffer.from(key).toString('base64');
    const res = await fetch(
      'https://wakatime.com/api/v1/users/current/stats/last_7_days',
      { headers: { Authorization: `Basic ${auth}` }, next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const { data } = await res.json();
    return {
      totalText: data.human_readable_total as string,
      dailyAverageText: data.human_readable_daily_average as string,
      range: data.human_readable_range as string,
      topEditor: data.editors?.[0]?.name ?? null,
      languages: (data.languages || [])
        .slice(0, 6)
        .map((l: { name: string; percent: number; text: string }) => ({
          name: l.name,
          pct: Math.round(l.percent),
          text: l.text,
        })),
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const [githubResult, wakatime] = await Promise.allSettled([getGithub(), getWakatime()]);
  return NextResponse.json({
    github: githubResult.status === 'fulfilled' ? githubResult.value : null,
    wakatime: wakatime.status === 'fulfilled' ? wakatime.value : null,
  });
}
