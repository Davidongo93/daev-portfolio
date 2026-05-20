'use client';
import { FaWhatsapp } from 'react-icons/fa';
import { siteConfig } from '../../config/site';
import { useLang } from '../../context/LangContext';

export default function WhatsAppButton() {
  const { t, lang } = useLang();
  const message = encodeURIComponent(siteConfig.whatsappText[lang]);
  const href = `${siteConfig.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.hero.ctaWhatsapp}
      title={t.hero.ctaWhatsapp}
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 group-hover:animate-ping" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 bg-[#25D366]">
        <FaWhatsapp className="text-white text-2xl" />
      </span>
    </a>
  );
}
