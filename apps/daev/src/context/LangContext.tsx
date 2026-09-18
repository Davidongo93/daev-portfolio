'use client';
import { createContext, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { counterpartPath, DEFAULT_LANG, type Lang } from '@/lib/i18n';

export type { Lang };

export const translations = {
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      pricing: 'Pricing',
      blog: 'Blog',
      work: 'Work',
      process: 'Process',
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
      proofShipped: 'sites live in production',
      proofLcp: 'fastest rebuild, mobile LCP',
      proofYears: 'years building for the web',
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
    cases: {
      title: 'Work that shipped',
      subtitle:
        'Real businesses, real deadlines, real numbers. Every site below is live — open them.',
      problem: 'The problem',
      work: 'What I built',
      result: 'The result',
      before: 'before',
      visit: 'Open the site',
      inMigration: 'Domain in migration',
      role: 'Role',
    },
    lab: {
      title: 'Lab',
      subtitle: 'Technical challenges and side projects — where I try things out.',
      code: 'Code',
      demo: 'Demo',
    },
    process: {
      title: 'How I work',
      subtitle: 'Four steps, no surprises, and you see something running early.',
      steps: [
        {
          title: 'We talk',
          text: 'A call to understand the business, not the feature list. I tell you what I would build and what I would not.',
        },
        {
          title: 'Scope and price',
          text: 'You get a written scope with a fixed price and a date. No hourly billing, no moving targets.',
        },
        {
          title: 'You see it early',
          text: 'A working preview goes online in the first days. You review it as it grows, not at the end.',
        },
        {
          title: 'Live and yours',
          text: 'It ships to your own domain, with the code and the accounts in your name. You are never locked in.',
        },
      ],
    },
    blogHome: {
      title: 'From the blog',
      subtitle: 'Notes on building for the web, in Spanish.',
      readAll: 'Read every post',
      read: 'Read',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Quick answers about my work, stack and availability',
    },
    services: {
      title: 'What I Can Build For You',
      subtitle: 'From a quick landing page to a full SaaS platform — pick what you need and let’s talk.',
      cta: 'Discuss on WhatsApp',
      pricingCta: 'View pricing & plans',
    },
    pricing: {
      title: 'Pricing',
      subtitle:
        'Clear, transparent prices for the most common projects. Need something different? Let’s talk.',
      popular: 'Most popular',
      cta: 'Request this',
      infraTitle: 'Domain & hosting',
      infraSubtitle:
        'Hosting and domain are quoted in US dollars and may vary depending on the provider. Amounts in Colombian pesos (COP) are approximate, based on the current exchange rate (TRM).',
      variable: 'Variable',
      addonsTitle: 'Optional add-ons',
      supportTitle: 'Support plans',
      supportSubtitle:
        'Monthly maintenance and support once your project is live.',
      customTitle: 'Need something else?',
      customText:
        'Custom websites, custom software, SaaS products and anything not listed here are quoted individually. Tell me what you have in mind and I’ll prepare a tailored quote.',
      customCta: 'Request a quote',
      trmNote: 'Reference exchange rate: USD $1 ≈ COP',
      trmAsOf: 'as of',
      trmLastValid: 'last valid reading from',
      approx: '≈',
      renewsAt: 'Renews at',
      domainExampleTitle: 'Illustrative domain pricing example',
      domainExampleNote:
        'Reference values from a registrar; the final price depends on the domain and provider.',
      disclaimer: 'Prices may change without prior notice.',
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
      sortTitle: 'Title (A–Z)',
      sortNewest: 'Newest first',
      sortOldest: 'Oldest first',
      sortReadLong: 'Longest read',
      sortReadShort: 'Shortest read',
      viewGrid: 'Card view',
      viewList: 'List view',
      allTopics: 'All',
      moreTags: 'more tags',
      fewerTags: 'fewer tags',
      noResults: 'No articles found',
      comingSoon: 'New articles are on the way — check back soon.',
      related: 'Related Posts',
      back: 'Back to blog',
      previous: 'Previous',
      next: 'Next',
      readingTime: 'min read',
      share: 'Share',
      copyLink: 'Copy link',
      linkCopied: 'Link copied!',
    },
    comments: {
      title: 'Comments',
      empty: 'No comments yet. Be the first to share your thoughts!',
      placeholder: 'Write a comment...',
      replyPlaceholder: 'Write a reply...',
      submit: 'Post comment',
      reply: 'Reply',
      cancel: 'Cancel',
      delete: 'Delete',
      deleted: '[comment deleted]',
      signInPrompt: 'Sign in to join the conversation',
      signInGoogle: 'Continue with Google',
      signInFacebook: 'Continue with Facebook',
      signOut: 'Sign out',
      posting: 'Posting...',
      loadError: 'Could not load comments.',
      captchaError: 'Captcha verification failed. Please try again.',
      verifying: 'Verifying you are human...',
      reactToPost: 'How was this post?',
      justNow: 'just now',
    },
    footer: {
      rights: 'All rights reserved',
      madeWith: 'Built with',
      tagline: 'I build web products that help people and companies grow.',
      navTitle: 'Navigation',
      exploreTitle: 'Explore',
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
      pricing: 'Precios',
      blog: 'Blog',
      work: 'Trabajo',
      process: 'Proceso',
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
      proofShipped: 'sitios en producción',
      proofLcp: 'LCP móvil en la mejor reconstrucción',
      proofYears: 'años construyendo para la web',
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
    cases: {
      title: 'Trabajo que salió a producción',
      subtitle:
        'Negocios reales, plazos reales, números reales. Todos los sitios de abajo están en línea — ábrelos.',
      problem: 'El problema',
      work: 'Lo que construí',
      result: 'El resultado',
      before: 'antes',
      visit: 'Abrir el sitio',
      inMigration: 'Dominio en migración',
      role: 'Rol',
    },
    lab: {
      title: 'Lab',
      subtitle: 'Retos técnicos y proyectos propios — donde pruebo cosas.',
      code: 'Código',
      demo: 'Demo',
    },
    process: {
      title: 'Cómo trabajo',
      subtitle: 'Cuatro pasos, sin sorpresas, y ves algo funcionando desde temprano.',
      steps: [
        {
          title: 'Hablamos',
          text: 'Una llamada para entender el negocio, no la lista de funciones. Te digo qué construiría y qué no.',
        },
        {
          title: 'Alcance y precio',
          text: 'Recibes un alcance por escrito con precio cerrado y fecha. Sin cobro por hora ni objetivos móviles.',
        },
        {
          title: 'Lo ves temprano',
          text: 'Una vista previa funcionando sale en línea los primeros días. La revisas mientras crece, no al final.',
        },
        {
          title: 'En vivo y tuyo',
          text: 'Sale a tu propio dominio, con el código y las cuentas a tu nombre. Nunca quedas amarrado.',
        },
      ],
    },
    blogHome: {
      title: 'Del blog',
      subtitle: 'Notas sobre construir para la web.',
      readAll: 'Leer todas las entradas',
      read: 'Leer',
    },
    faq: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Respuestas rápidas sobre mi trabajo, stack y disponibilidad',
    },
    services: {
      title: 'Lo Que Puedo Construir Para Ti',
      subtitle: 'Desde una landing page hasta una plataforma SaaS completa — elige lo que necesitas y hablemos.',
      cta: 'Hablemos por WhatsApp',
      pricingCta: 'Ver precios y planes',
    },
    pricing: {
      title: 'Precios',
      subtitle:
        'Precios claros y transparentes para los proyectos más comunes. ¿Necesitas algo diferente? Hablemos.',
      popular: 'Más popular',
      cta: 'Solicitar este',
      infraTitle: 'Dominio y hosting',
      infraSubtitle:
        'El hosting y el dominio se cotizan en dólares estadounidenses y pueden variar según el proveedor. Los montos en pesos colombianos (COP) son aproximados, según la tasa de cambio actual (TRM).',
      variable: 'Variable',
      addonsTitle: 'Complementos opcionales',
      supportTitle: 'Planes de soporte',
      supportSubtitle:
        'Mantenimiento y soporte mensual una vez tu proyecto está en línea.',
      customTitle: '¿Necesitas algo más?',
      customText:
        'Los sitios web a medida, el software a medida, los productos SaaS y cualquier otro producto no listado se cotizan de forma individual. Cuéntame qué tienes en mente y prepararé una cotización a tu medida.',
      customCta: 'Solicitar cotización',
      trmNote: 'Tasa de cambio de referencia: USD $1 ≈ COP',
      trmAsOf: 'al',
      trmLastValid: 'última lectura válida del',
      approx: '≈',
      renewsAt: 'Renueva en',
      domainExampleTitle: 'Ejemplo ilustrativo de precios de dominio',
      domainExampleNote:
        'Valores de referencia de un registrador; el precio final depende del dominio y el proveedor.',
      disclaimer: 'Los precios pueden variar sin previo aviso.',
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
      sortTitle: 'Título (A–Z)',
      sortNewest: 'Más recientes',
      sortOldest: 'Más antiguos',
      sortReadLong: 'Mayor tiempo de lectura',
      sortReadShort: 'Menor tiempo de lectura',
      viewGrid: 'Vista de tarjetas',
      viewList: 'Vista de lista',
      allTopics: 'Todos',
      moreTags: 'etiquetas más',
      fewerTags: 'menos etiquetas',
      noResults: 'No se encontraron artículos',
      comingSoon: 'Pronto publicaré nuevos artículos. ¡Vuelve pronto!',
      related: 'Posts Relacionados',
      back: 'Volver al blog',
      previous: 'Anterior',
      next: 'Siguiente',
      readingTime: 'min de lectura',
      share: 'Compartir',
      copyLink: 'Copiar enlace',
      linkCopied: '¡Enlace copiado!',
    },
    comments: {
      title: 'Comentarios',
      empty: 'Aún no hay comentarios. ¡Sé el primero en opinar!',
      placeholder: 'Escribe un comentario...',
      replyPlaceholder: 'Escribe una respuesta...',
      submit: 'Publicar comentario',
      reply: 'Responder',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      deleted: '[comentario eliminado]',
      signInPrompt: 'Inicia sesión para unirte a la conversación',
      signInGoogle: 'Continuar con Google',
      signInFacebook: 'Continuar con Facebook',
      signOut: 'Cerrar sesión',
      posting: 'Publicando...',
      loadError: 'No se pudieron cargar los comentarios.',
      captchaError: 'Falló la verificación del captcha. Inténtalo de nuevo.',
      verifying: 'Verificando que eres humano...',
      reactToPost: '¿Qué te pareció este post?',
      justNow: 'recién',
    },
    footer: {
      rights: 'Todos los derechos reservados',
      madeWith: 'Hecho con',
      tagline: 'Construyo productos web que ayudan a personas y empresas a crecer.',
      navTitle: 'Navegación',
      exploreTitle: 'Explorar',
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
  lang: DEFAULT_LANG,
  t: translations[DEFAULT_LANG] as unknown as Translations,
  toggle: noop,
  setLang: noop,
});

/**
 * The language is decided by the route, not by the browser: Spanish renders at
 * the root and English under /en, so each locale has its own indexable URL.
 * Switching language is a navigation, not local state.
 */
export function LangProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setLang = (next: Lang) => {
    if (next !== lang) router.push(counterpartPath(pathname, lang));
  };

  const toggle = () => setLang(lang === 'en' ? 'es' : 'en');

  return (
    <LangContext.Provider value={{ lang, t: tMap[lang], toggle, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
