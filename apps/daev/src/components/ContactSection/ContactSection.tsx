'use client';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import IconBar from '../IconBar/IconBar';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

const ContactSection: React.FC = () => {
  const { t, lang } = useLang();

  return (
    <section id="contact" className="bg-bg py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-fore mb-3 text-center">
          {t.contact.title}
        </h2>
        <p className="text-muted text-center max-w-xl mx-auto mb-3">
          {t.contact.subtitle}
        </p>
        <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form
            action={`mailto:${siteConfig.email}`}
            method="POST"
            encType="text/plain"
            className="lg:col-span-3 bg-surface-el rounded-2xl p-6 md:p-8 border border-border space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-fore mb-2">
                {t.contact.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-fore placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                placeholder={t.contact.name}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-fore mb-2">
                {t.contact.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-fore placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-fore mb-2">
                {t.contact.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-fore placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition resize-none"
                placeholder={t.contact.message}
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-accent text-bg font-semibold hover:bg-accent-hover transition-all hover:scale-[1.02] shadow-lg"
            >
              {t.contact.send} <FaPaperPlane size={14} />
            </button>
          </form>

          {/* Direct contact */}
          <aside className="lg:col-span-2 bg-surface-el rounded-2xl p-6 md:p-8 border border-border space-y-6">
            <h3 className="font-display text-xl font-semibold text-fore">
              {t.contact.or}
            </h3>

            <div className="space-y-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-muted hover:text-accent transition group"
              >
                <span className="inline-flex w-10 h-10 rounded-lg bg-accent/10 items-center justify-center text-accent group-hover:bg-accent/20 transition">
                  <FaEnvelope />
                </span>
                <span className="text-sm">{siteConfig.email}</span>
              </a>

              <a
                href={`${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappText[lang])}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted hover:text-[#25D366] transition group"
              >
                <span className="inline-flex w-10 h-10 rounded-lg bg-[#25D366]/10 items-center justify-center text-[#25D366] group-hover:bg-[#25D366]/20 transition">
                  <FaWhatsapp />
                </span>
                <span className="text-sm">WhatsApp</span>
              </a>

              <div className="flex items-center gap-3 text-muted">
                <span className="inline-flex w-10 h-10 rounded-lg bg-accent/10 items-center justify-center text-accent">
                  <FaMapMarkerAlt />
                </span>
                <span className="text-sm">
                  {siteConfig.location} {siteConfig.locationFlag}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <IconBar />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
