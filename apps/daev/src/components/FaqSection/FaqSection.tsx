'use client';
import { FaChevronDown } from 'react-icons/fa';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

const FaqSection: React.FC = () => {
  const { t, lang } = useLang();

  return (
    <section id="faq" className="bg-surface py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-fore mb-3 text-center">
          {t.faq.title}
        </h2>
        <p className="text-muted text-center max-w-xl mx-auto mb-3">{t.faq.subtitle}</p>
        <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-12" />

        <div className="space-y-3">
          {siteConfig.faq.map((item) => (
            <details
              key={item.q.en}
              className="group rounded-2xl border border-border bg-bg p-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-display font-semibold text-fore">
                {item.q[lang]}
                <FaChevronDown
                  size={14}
                  className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.a[lang]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
