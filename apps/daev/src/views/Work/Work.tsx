'use client';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import CaseStudies from '../../components/CaseStudies/CaseStudies';
import BackendProjects from '../../components/BackendProjects/BackendProjects';
import Footer from '../../components/Footer/Footer';
import { useLang } from '../../context/LangContext';
import { pathFor } from '@/lib/i18n';

/** /trabajo (and /en/work): every client case in full, then the backend work. */
const Work: React.FC = () => {
  const { t, lang } = useLang();

  return (
    <>
      <div className="min-h-screen bg-bg pt-16 animate-fade-in">
        <section id="work" className="bg-surface py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <header className="mb-14 text-center">
              <h1 className="mb-3 font-display text-4xl font-bold text-fore md:text-5xl">
                {t.cases.title}
              </h1>
              <p className="mx-auto max-w-2xl text-muted">{t.workPage.subtitle}</p>
              <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-accent" />
            </header>
            <CaseStudies />
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
          <BackendProjects />

          <div className="mt-20 text-center">
            <Link
              href={`${pathFor(lang, '/')}#contact`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg shadow-lg transition-all hover:scale-105 hover:bg-accent-hover"
            >
              {t.featured.cta} <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Work;
