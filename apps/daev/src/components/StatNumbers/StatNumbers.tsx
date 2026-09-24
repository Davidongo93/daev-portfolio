'use client';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

/**
 * The four career figures agreed in docs/career.md. One component so the hero,
 * the journey and the about section can never drift apart.
 */
const StatNumbers: React.FC<{
  variant?: 'inline' | 'cards';
  /** Keep the cards in two columns at every width (narrow containers). */
  twoColumns?: boolean;
  className?: string;
}> = ({ variant = 'cards', twoColumns = false, className = '' }) => {
  const { t } = useLang();
  const { itYears, years, projects, sitesPerMonth } = siteConfig.stats;

  const items = [
    { value: `${itYears}+`, label: t.numbers.itYears },
    { value: `${years}+`, label: t.numbers.fullStack },
    { value: `${projects}+`, label: t.numbers.projects },
    { value: `${sitesPerMonth}`, label: t.numbers.pace },
  ];

  if (variant === 'inline') {
    return (
      <dl className={`grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 ${className}`}>
        {items.map((item) => (
          <div key={item.label} className="flex flex-col-reverse items-center justify-end text-center">
            <dt className="mt-1 max-w-[11rem] text-xs leading-snug text-muted">{item.label}</dt>
            <dd className="font-display text-2xl font-bold text-accent sm:text-3xl md:text-4xl">{item.value}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl className={`grid grid-cols-2 gap-3 ${twoColumns ? '' : 'lg:grid-cols-4'} ${className}`}>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col-reverse rounded-2xl border border-border bg-surface-el p-4 transition-colors hover:border-accent/40"
        >
          <dt className="mt-1.5 text-xs leading-snug text-muted">{item.label}</dt>
          <dd className="font-display text-3xl font-bold leading-none text-accent">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
};

export default StatNumbers;
