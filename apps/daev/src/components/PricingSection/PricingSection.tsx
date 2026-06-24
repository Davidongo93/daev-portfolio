'use client';
import {
  FaRocket,
  FaShoppingCart,
  FaGraduationCap,
  FaCheck,
  FaWhatsapp,
  FaGlobe,
  FaServer,
  FaEnvelope,
  FaPlug,
  FaRobot,
  FaChartLine,
  FaCalendarCheck,
  FaLifeRing,
  FaHeadset,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

const planIcon: Record<string, IconType> = {
  rocket: FaRocket,
  cart: FaShoppingCart,
  lms: FaGraduationCap,
};

const itemIcon: Record<string, IconType> = {
  domain: FaGlobe,
  hosting: FaServer,
  email: FaEnvelope,
  api: FaPlug,
  chatbot: FaRobot,
  seo: FaChartLine,
  scheduling: FaCalendarCheck,
  'support-basic': FaLifeRing,
  'support-premium': FaHeadset,
};

const formatCop = (value: number) =>
  `${new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).format(value)} COP`;

const formatUsd = (value: number) =>
  `${new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).format(value)} USD`;

const formatUsdCents = (value: number) =>
  `${new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)} USD`;

interface PricingSectionProps {
  trm?: number;
  trmDate?: string;
  trmLive?: boolean;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  trm: trmProp,
  trmDate,
  trmLive = true,
}) => {
  const { t, lang } = useLang();
  const { pricing } = siteConfig;
  const trm = trmProp ?? pricing.trmUsdToCop;
  const date = trmDate ?? pricing.trmDate;
  const wa = (text: string) =>
    `${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;

  const formatDate = (iso: string) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString(
      lang === 'es' ? 'es-CO' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );

  const renderAddon = (
    addon: (typeof pricing.addons)[number] | (typeof pricing.support)[number]
  ) => {
    const Icon = itemIcon[addon.icon] ?? FaEnvelope;
    return (
      <div
        key={addon.key}
        className="flex items-start gap-4 rounded-xl border border-border bg-surface-el p-5"
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Icon size={18} />
        </span>
        <div>
          <h3 className="font-semibold text-fore">{addon.name[lang]}</h3>
          <p className="mt-1">
            {addon.priceUsd != null ? (
              <>
                <span className="font-display text-lg font-bold text-fore">
                  {formatUsd(addon.priceUsd)}
                </span>
                {addon.per && (
                  <span className="text-sm text-muted">{addon.per[lang]}</span>
                )}
                <span className="ml-2 text-xs text-muted">
                  {t.pricing.approx} {formatCop(addon.priceUsd * trm)}
                </span>
              </>
            ) : addon.priceCop != null ? (
              <>
                <span className="font-display text-lg font-bold text-fore">
                  {formatCop(addon.priceCop)}
                </span>
                {addon.per && (
                  <span className="text-sm text-muted">{addon.per[lang]}</span>
                )}
              </>
            ) : (
              <span className="font-display text-lg font-bold text-accent">
                {addon.priceLabel ? addon.priceLabel[lang] : t.pricing.variable}
              </span>
            )}
          </p>
          <p className="mt-1 text-xs text-muted">{addon.description[lang]}</p>
        </div>
      </div>
    );
  };

  return (
    <section id="pricing" className="bg-bg py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="font-display font-bold text-3xl md:text-5xl text-fore mb-4">
            {t.pricing.title}
          </h1>
          <p className="text-muted max-w-2xl mx-auto">{t.pricing.subtitle}</p>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mt-6" />
        </header>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pricing.plans.map((plan) => {
            const Icon = planIcon[plan.icon] ?? FaRocket;
            return (
              <article
                key={plan.key}
                className={`relative flex flex-col rounded-2xl border p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 ${
                  plan.featured
                    ? 'border-accent bg-surface-el shadow-2xl md:scale-[1.03]'
                    : 'border-border bg-surface-el hover:border-accent/50 hover:shadow-xl'
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1 text-xs font-semibold text-bg shadow-lg">
                    {t.pricing.popular}
                  </span>
                )}

                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon size={22} />
                </span>

                <h2 className="font-display text-xl font-semibold text-fore">
                  {plan.name[lang]}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {plan.tagline[lang]}
                </p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="font-display text-3xl md:text-4xl font-bold text-fore">
                    {formatCop(plan.priceCop)}
                  </span>
                  <span className="mb-1 text-xs text-muted">
                    {plan.priceSuffix[lang]}
                  </span>
                </div>

                <ul className="mt-6 mb-8 space-y-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-fore/90"
                    >
                      <FaCheck className="mt-0.5 shrink-0 text-green" size={14} />
                      <span>{feature[lang]}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={wa(plan.whatsapp[lang])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                    plan.featured
                      ? 'bg-accent text-bg hover:bg-accent-hover'
                      : 'border border-[#25D366]/40 bg-[#25D366]/10 text-[#1ebd57] hover:bg-[#25D366] hover:text-white'
                  }`}
                  aria-label={`${t.pricing.cta} — ${plan.name[lang]}`}
                >
                  <FaWhatsapp /> {t.pricing.cta}
                </a>

                {plan.fineprint && (
                  <div className="mt-3 space-y-1">
                    {[...plan.fineprint].map((note, i) => (
                      <p
                        key={i}
                        className="text-[11px] leading-snug text-muted"
                      >
                        * {note[lang]}
                      </p>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Infrastructure: domain & hosting */}
        <div className="mt-16 md:mt-20">
          <h2 className="font-display text-2xl font-semibold text-fore text-center">
            {t.pricing.infraTitle}
          </h2>
          <p className="mt-3 text-sm text-muted text-center max-w-2xl mx-auto">
            {t.pricing.infraSubtitle}
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {pricing.infrastructure.map((item) => {
              const Icon = itemIcon[item.icon] ?? FaGlobe;
              return (
                <div
                  key={item.key}
                  className="flex items-start gap-4 rounded-xl border border-border bg-surface-el p-5"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-fore">{item.name[lang]}</h3>
                    <p className="mt-1">
                      {item.priceUsd != null ? (
                        <>
                          <span className="font-display text-lg font-bold text-fore">
                            {formatUsd(item.priceUsd)}
                          </span>
                          {item.per && (
                            <span className="text-sm text-muted">{item.per[lang]}</span>
                          )}
                          <span className="ml-2 text-xs text-muted">
                            {t.pricing.approx} {formatCop(item.priceUsd * trm)}
                          </span>
                        </>
                      ) : item.priceCop != null ? (
                        <>
                          <span className="font-display text-lg font-bold text-fore">
                            {formatCop(item.priceCop)}
                          </span>
                          {item.per && (
                            <span className="text-sm text-muted">{item.per[lang]}</span>
                          )}
                        </>
                      ) : (
                        <span className="font-display text-lg font-bold text-accent">
                          {t.pricing.variable}
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-xs text-muted">{item.note[lang]}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-xs text-muted">
            {t.pricing.trmNote}{' '}
            {new Intl.NumberFormat('es-CO', { maximumFractionDigits: 2 }).format(
              trm
            )}{' '}
            · {trmLive ? t.pricing.trmAsOf : t.pricing.trmLastValid}{' '}
            {formatDate(date)}
          </p>

          {/* Ejemplo ilustrativo de precios de dominio */}
          <div className="mt-8 max-w-xl mx-auto rounded-lg border border-dashed border-border bg-surface-el/40 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              {t.pricing.domainExampleTitle}
            </p>
            <p className="mt-0.5 text-[11px] text-muted">
              {t.pricing.domainExampleNote}
            </p>

            <div className="mt-3 space-y-2">
              {pricing.domainExample.items.map((d) => (
                <div
                  key={d.domain}
                  className="rounded-md border border-border bg-surface px-3 py-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm">
                      <span className="font-mono font-semibold text-fore">
                        {d.domain}
                      </span>
                      <span className="ml-2 text-[11px] text-muted">
                        {d.label[lang]}
                      </span>
                    </p>
                    <span className="shrink-0 rounded-full bg-green/10 px-2 py-0.5 text-[10px] font-semibold text-green">
                      {formatUsdCents(d.offUsd)} OFF
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted">
                    {d.term[lang]} ·{' '}
                    <span className="font-semibold text-fore">
                      {formatUsdCents(d.priceUsd)}
                    </span>{' '}
                    {t.pricing.approx} {formatCop(d.priceUsd * trm)} ·{' '}
                    {t.pricing.renewsAt} {formatUsdCents(d.renewsUsd)}{' '}
                    {t.pricing.approx} {formatCop(d.renewsUsd * trm)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <div className="mt-16 md:mt-20">
          <h2 className="font-display text-2xl font-semibold text-fore text-center">
            {t.pricing.addonsTitle}
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {pricing.addons.map(renderAddon)}
          </div>
        </div>

        {/* Support plans */}
        <div className="mt-16 md:mt-20">
          <h2 className="font-display text-2xl font-semibold text-fore text-center">
            {t.pricing.supportTitle}
          </h2>
          <p className="mt-3 text-sm text-muted text-center max-w-2xl mx-auto">
            {t.pricing.supportSubtitle}
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {pricing.support.map(renderAddon)}
          </div>
        </div>

        {/* Custom / quote */}
        <div className="mt-16 md:mt-20 rounded-2xl border border-border bg-surface-el p-8 md:p-10 text-center">
          <h2 className="font-display text-2xl font-semibold text-fore">
            {t.pricing.customTitle}
          </h2>
          <p className="mt-3 text-muted max-w-2xl mx-auto">
            {t.pricing.customText}
          </p>
          <a
            href={wa(pricing.quoteWhatsapp[lang])}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg transition-all hover:bg-accent-hover"
          >
            <FaWhatsapp /> {t.pricing.customCta}
          </a>
        </div>

        <p className="mt-12 text-center text-xs text-muted">
          {t.pricing.disclaimer}
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
