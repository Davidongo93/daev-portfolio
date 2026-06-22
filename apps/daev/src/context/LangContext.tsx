'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'en' | 'es';

export const translations = {
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      blog: 'Blog',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      cli: 'Terminal',
    },
    hero: {
      greeting: "Hi, I'm David Orlando",
      cta: 'Hire Me',
      ctaContact: 'Contact Me',
      ctaWhatsapp: 'Chat on WhatsApp',
      buildVerb: 'I build',
      types: ['custom websites', 'landing pages', 'e-commerce stores', 'custom software', 'SaaS apps', 'LMS platforms'],
      seeProjects: 'See my work',
    },
    about: {
      title: 'About Me',
      available: 'Available for work',
      unavailable: 'Not available',
      brand: 'Personal brand',
    },
    experience: {
      title: 'Experience',
      company: 'Company',
      role: 'Role',
      period: 'Period',
      contact: 'Get in touch',
      intro:
        'I am a highly motivated and detail-oriented developer who thrives in both independent and collaborative settings.',
    },
    skills: {
      title: 'Skills',
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Tools & DevOps',
    },
    stats: {
      title: 'My Stats',
      subtitle: 'Live numbers pulled from the GitHub and WakaTime APIs',
      years: 'Years of Experience',
      projects: 'Projects Completed',
      clients: 'Satisfied Clients',
      repos: 'Public Repos',
      stars: 'Total Stars',
      followers: 'Followers',
      forks: 'Forks',
      languages: 'Top Languages',
      byRepos: 'by repositories',
      activity: 'Coding Activity',
      last7days: 'Last 7 days',
      dailyAverage: 'Daily average',
      topEditor: 'Top editor',
      viaWakatime: 'via WakaTime',
      topRepo: 'Top repository',
    },
    featured: {
      title: 'Featured Projects',
      viewRepo: 'Repo',
      liveDemo: 'Demo',
      collab: 'Collaboration with',
      cta: 'Let’s discuss your project',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Quick answers about my work, stack and availability',
    },
    services: {
      title: 'What I Can Build For You',
      subtitle: 'From a quick landing page to a full SaaS platform — pick what you need and let’s talk.',
      cta: 'Discuss on WhatsApp',
    },
    projects: {
      title: 'All Projects on GitHub',
      viewAll: 'View all on GitHub',
      loading: 'Loading repositories...',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Have a project in mind? Let’s build something great together.',
      name: 'Your name',
      email: 'Your email',
      message: 'Your message',
      send: 'Send Message',
      or: 'Or reach me directly',
      projectType: 'What do you need?',
      general: 'General inquiry',
      details: 'Tell me about your project (optional)',
      sendWhatsapp: 'Send via WhatsApp',
      whatsappNote: 'Opens WhatsApp with your message ready to send.',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Thoughts, tutorials and reflections',
      search: 'Search articles...',
      sortDate: 'Sort by date',
      sortTitle: 'Sort by title',
      noResults: 'No articles found',
      comingSoon: 'New articles are on the way — check back soon.',
      related: 'Related Posts',
      back: 'Back to blog',
      previous: 'Previous',
      next: 'Next',
      readingTime: 'min read',
    },
    footer: {
      rights: 'All rights reserved',
      madeWith: 'Built with',
      tagline: 'I build web products that help people and companies grow.',
    },
    console: {
      help: 'Type help for available commands',
      gui: 'gui — load graphic interface',
      tapHint: 'tap to type',
    },
    theme: {
      dark: 'Dark mode',
      light: 'Light mode',
    },
    lang: {
      switch: 'ES',
      current: 'EN',
    },
    notFound: {
      title: 'Page not found',
      back: 'Go home',
      message: 'Oops! The page you are looking for does not exist.',
    },
  },
  es: {
    nav: {
      about: 'Sobre mí',
      services: 'Servicios',
      blog: 'Blog',
      skills: 'Habilidades',
      projects: 'Proyectos',
      contact: 'Contacto',
      cli: 'Terminal',
    },
    hero: {
      greeting: 'Hola, soy David Orlando',
      cta: 'Contrátame',
      ctaContact: 'Contáctame',
      ctaWhatsapp: 'Chatea por WhatsApp',
      buildVerb: 'Construyo',
      types: ['sitios web a medida', 'landing pages', 'e-commerce', 'software a medida', 'apps SaaS', 'plataformas LMS'],
      seeProjects: 'Ver mi trabajo',
    },
    about: {
      title: 'Sobre mí',
      available: 'Disponible para trabajar',
      unavailable: 'No disponible',
      brand: 'Marca personal',
    },
    experience: {
      title: 'Experiencia',
      company: 'Empresa',
      role: 'Rol',
      period: 'Período',
      contact: 'Contáctame',
      intro:
        'Soy un desarrollador altamente motivado y orientado al detalle que se destaca tanto en entornos independientes como colaborativos.',
    },
    skills: {
      title: 'Habilidades',
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Herramientas & DevOps',
    },
    stats: {
      title: 'Mis Estadísticas',
      subtitle: 'Números en vivo desde las APIs de GitHub y WakaTime',
      years: 'Años de Experiencia',
      projects: 'Proyectos Completados',
      clients: 'Clientes Satisfechos',
      repos: 'Repositorios',
      stars: 'Estrellas',
      followers: 'Seguidores',
      forks: 'Forks',
      languages: 'Lenguajes Principales',
      byRepos: 'por repositorios',
      activity: 'Actividad de Código',
      last7days: 'Últimos 7 días',
      dailyAverage: 'Promedio diario',
      topEditor: 'Editor principal',
      viaWakatime: 'vía WakaTime',
      topRepo: 'Repositorio destacado',
    },
    featured: {
      title: 'Proyectos Destacados',
      viewRepo: 'Repo',
      liveDemo: 'Demo',
      collab: 'Colaboración con',
      cta: 'Hablemos de tu proyecto',
    },
    faq: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Respuestas rápidas sobre mi trabajo, stack y disponibilidad',
    },
    services: {
      title: 'Lo Que Puedo Construir Para Ti',
      subtitle: 'Desde una landing page hasta una plataforma SaaS completa — elige lo que necesitas y hablemos.',
      cta: 'Hablemos por WhatsApp',
    },
    projects: {
      title: 'Todos los Proyectos en GitHub',
      viewAll: 'Ver todos en GitHub',
      loading: 'Cargando repositorios...',
    },
    contact: {
      title: 'Contacto',
      subtitle: '¿Tienes un proyecto en mente? Construyamos algo grandioso juntos.',
      name: 'Tu nombre',
      email: 'Tu correo',
      message: 'Tu mensaje',
      send: 'Enviar mensaje',
      or: 'O contáctame directamente',
      projectType: '¿Qué necesitas?',
      general: 'Consulta general',
      details: 'Cuéntame sobre tu proyecto (opcional)',
      sendWhatsapp: 'Enviar por WhatsApp',
      whatsappNote: 'Abre WhatsApp con tu mensaje listo para enviar.',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Pensamientos, tutoriales y reflexiones',
      search: 'Buscar artículos...',
      sortDate: 'Ordenar por fecha',
      sortTitle: 'Ordenar por título',
      noResults: 'No se encontraron artículos',
      comingSoon: 'Pronto publicaré nuevos artículos. ¡Vuelve pronto!',
      related: 'Posts Relacionados',
      back: 'Volver al blog',
      previous: 'Anterior',
      next: 'Siguiente',
      readingTime: 'min de lectura',
    },
    footer: {
      rights: 'Todos los derechos reservados',
      madeWith: 'Hecho con',
      tagline: 'Construyo productos web que ayudan a personas y empresas a crecer.',
    },
    console: {
      help: 'Escribe help para ver los comandos disponibles',
      gui: 'gui — cargar interfaz gráfica',
      tapHint: 'toca para escribir',
    },
    theme: {
      dark: 'Modo oscuro',
      light: 'Modo claro',
    },
    lang: {
      switch: 'EN',
      current: 'ES',
    },
    notFound: {
      title: 'Página no encontrada',
      back: 'Ir al inicio',
      message: '¡Ups! La página que buscas no existe.',
    },
  },
} as const;

export type Translations = typeof translations.en;

const tMap: Record<Lang, Translations> = translations as unknown as Record<Lang, Translations>;

const noop = () => undefined;

const LangContext = createContext<{
  lang: Lang;
  t: Translations;
  toggle: () => void;
  setLang: (l: Lang) => void;
}>({
  lang: 'en',
  t: translations.en as unknown as Translations,
  toggle: noop,
  setLang: noop,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && localStorage.getItem('lang')) as Lang | null;
    if (stored && (stored === 'en' || stored === 'es')) {
      setLangState(stored);
      document.documentElement.lang = stored;
    } else {
      const browserLang = navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
      setLangState(browserLang);
      document.documentElement.lang = browserLang;
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
    document.documentElement.lang = l;
  };

  const toggle = () => setLang(lang === 'en' ? 'es' : 'en');

  return (
    <LangContext.Provider value={{ lang, t: tMap[lang], toggle, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
