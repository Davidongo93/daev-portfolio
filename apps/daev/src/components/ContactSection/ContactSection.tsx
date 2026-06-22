'use client';
import { useState } from 'react';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import IconBar from '../IconBar/IconBar';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

const ContactSection: React.FC = () => {
  const { t, lang } = useLang();
  const [projectType, setProjectType] = useState('general');
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');

  const buildMessage = () => {
    const selected = siteConfig.services.find((s) => s.key === projectType);
    const base = selected
      ? selected.whatsapp[lang]
      : lang === 'es'
      ? '¡Hola Dave! Me gustaría conversar sobre un proyecto.'
      : 'Hi Dave! I’d like to chat about a project.';
    const namePart = name
      ? lang === 'es'
        ? `\n\nMi nombre es ${name}.`
        : `\n\nMy name is ${name}.`
      : '';
    const detailsPart = details ? `\n\n${details}` : '';
    return `${base}${namePart}${detailsPart}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${siteConfig.whatsapp}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="bg-bg py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-fore mb-3 text-center">
          {t.contact.title}
        </h2>
        <p className="text-muted text-center max-w-xl mx-auto mb-3">{t.contact.subtitle}</p>
        <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* WhatsApp-redirect form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-surface-el rounded-2xl p-6 md:p-8 border border-border space-y-5"
          >
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-fore mb-2">
                {t.contact.projectType}
              </label>
              <select
                id="projectType"
                name="projectType"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-fore focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
              >
                {siteConfig.services.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.title[lang]}
                  </option>
                ))}
                <option value="general">{t.contact.general}</option>
              </select>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-fore mb-2">
                {t.contact.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-fore placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                placeholder={t.contact.name}
              />
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-medium text-fore mb-2">
                {t.contact.details}
              </label>
              <textarea
                id="details"
                name="details"
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-bg border border-border text-fore placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition resize-none"
                placeholder={t.contact.message}
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#25D366] text-white font-semibold hover:bg-[#1ebd57] transition-all hover:scale-[1.02] shadow-lg"
            >
              <FaWhatsapp size={18} /> {t.contact.sendWhatsapp}
            </button>
            <p className="text-xs text-muted text-center">{t.contact.whatsappNote}</p>
          </form>

          {/* Direct contact */}
          <aside className="lg:col-span-2 bg-surface-el rounded-2xl p-6 md:p-8 border border-border space-y-6">
            <h3 className="font-display text-xl font-semibold text-fore">{t.contact.or}</h3>

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
