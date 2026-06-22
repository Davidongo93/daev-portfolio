export const siteConfig = {
  // ── Identidad ──────────────────────────────────────────────────
  name: 'David Orlando Miranda',
  alias: 'DÆV',
  role: {
    en: 'Full Stack Developer',
    es: 'Desarrollador Full Stack',
  },
  shortBio: {
    en: 'Full Stack Developer specializing in React, Next.js, Node.js and TypeScript.',
    es: 'Desarrollador Full Stack especializado en React, Next.js, Node.js y TypeScript.',
  },
  bio: {
    en: 'I build fast, scalable web products, from the first idea to production. I care about clean code, great user experience, and shipping software that delivers real results for people and businesses.',
    es: 'Construyo productos web rápidos y escalables, desde la primera idea hasta producción. Me importa el código limpio, una gran experiencia de usuario y entregar software que genere resultados reales para personas y empresas.',
  },
  location: 'Colombia',
  locationFlag: '🇨🇴',
  available: true,
  siteUrl: 'https://daev.space',

  // ── Contacto ────────────────────────────────────────────────────
  email: 'domirandar@gmail.com',
  phone: '+573015740156',
  whatsapp: 'https://wa.me/+573015740156',
  whatsappText: {
    en: 'Hi Dave! I saw your portfolio and would like to chat about a project.',
    es: '¡Hola Dave! Vi tu portafolio y me gustaría hablar sobre un proyecto.',
  },

  // ── Redes sociales ──────────────────────────────────────────────
  links: {
    github: 'https://github.com/Davidongo93',
    linkedin: 'https://www.linkedin.com/in/domirandar/',
    twitter: 'https://x.com/domirandar',
    instagram: 'https://www.instagram.com/davegoes2rock/',
    discord: 'https://discordapp.com/users/1072550664762298468',
  },

  // ── SEO / GEO / SEM ─────────────────────────────────────────────
  seo: {
    keywords: [
      'Full Stack Developer',
      'React Developer',
      'Next.js Developer',
      'TypeScript Developer',
      'Node.js Developer',
      'NestJS Developer',
      'Freelance Developer Colombia',
      'Full Stack Developer Colombia',
      'Web Developer Bogotá',
      'Desarrollador Full Stack Colombia',
      'Desarrollador Freelance',
      'Dave Miranda',
      'David Orlando Miranda',
    ],
    targetCountries: ['CO', 'US', 'MX', 'ES', 'AR', 'CL'],
    targetCities: ['Bogotá', 'Medellín', 'Cali', 'Madrid', 'Mexico City', 'Buenos Aires'],
  },

  // ── Estadísticas ────────────────────────────────────────────────
  stats: {
    years: 4,
    projects: 10,
    clients: 3,
  },

  // ── Experiencia laboral ─────────────────────────────────────────
  experience: [
    {
      company: 'Colombian Cannabis Center',
      role: {
        en: 'Development Lead',
        es: 'Líder de Desarrollo',
      },
      period: 'Nov 2024 – Present',
      description: {
        en: 'I lead development of a traceability platform that handles agricultural management and end-to-end traceability for compliance with Colombian regulation and international standards.',
        es: 'Lidero el desarrollo de una plataforma de trazabilidad que gestiona la operación agrícola y la trazabilidad de extremo a extremo para el cumplimiento de la norma colombiana y los estándares internacionales.',
      },
      logo: null,
      website: 'https://app.colombiancannabiscenter.space',
    },
    {
      company: 'DigitalYa',
      role: {
        en: 'Frontend Developer',
        es: 'Desarrollador Frontend',
      },
      period: '2026 – Present',
      description: {
        en: 'Frontend developer at a marketing agency, building and optimizing high-performance websites and landing pages for clients.',
        es: 'Desarrollador frontend en una agencia de marketing, construyendo y optimizando sitios web y landing pages de alto rendimiento para clientes.',
      },
      logo: null,
      website: 'https://digitalya.com.ar/',
    },
    {
      company: 'Rescatista',
      role: {
        en: 'Frontend Engineer (Freelance)',
        es: 'Ingeniero Frontend (Freelance)',
      },
      period: '2024 – Present',
      description: {
        en: 'I implement responsive UIs, optimize performance and contribute to product design as a freelance collaborator.',
        es: 'Implemento interfaces responsivas, optimizo el rendimiento y contribuyo al diseño de producto como colaborador freelance.',
      },
      logo: '/icons/rescatista.png',
      website: 'https://rescatista.vercel.app',
    },
    {
      company: 'AppTender',
      role: {
        en: 'Full Stack Developer',
        es: 'Desarrollador Full Stack',
      },
      period: '2023 – 2024',
      description: {
        en: 'I improved the core API, integrated the META and Brevo APIs and shipped new backend and frontend features.',
        es: 'Mejoré la API principal, integré las APIs de META y Brevo e implementé nuevas funcionalidades en backend y frontend.',
      },
      logo: '/icons/appTender.svg',
      website: null,
    },
  ],

  // ── Skills ──────────────────────────────────────────────────────
  skills: {
    frontend: ['React', 'Next.js', 'Astro', 'Vue', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS'],
    backend: ['Node.js', 'NestJS', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs'],
    tools: ['Git', 'Docker', 'NX', 'Redux', 'Jest', 'Vercel', 'Cloudflare', 'GitHub Actions'],
  },

  // ── Proyectos destacados ────────────────────────────────────────
  featuredProjects: [
    {
      name: 'Colombian Cannabis Center — Traceability Platform',
      description: {
        en: 'Agricultural management and compliance traceability platform I lead, aligned with Colombian regulation and international standards.',
        es: 'Plataforma de gestión agrícola y trazabilidad para cumplimiento normativo que lidero, alineada con la norma colombiana y los estándares internacionales.',
      },
      repoUrl: null,
      liveUrl: 'https://app.colombiancannabiscenter.space',
      technologies: ['React', 'Next.js', 'NestJS', 'PostgreSQL', 'Docker'],
      type: { en: 'Lead · Full Stack', es: 'Líder · Full Stack' },
      collaboration: null,
      thumbnail: 'https://image.thum.io/get/width/1200/crop/900/https://app.colombiancannabiscenter.space',
      featured: true,
    },
    {
      name: 'Ópticas Apolo Vision — E-commerce',
      description: {
        en: 'Custom e-commerce store I built for an optical retailer, with product catalog and a smooth online shopping experience.',
        es: 'Tienda e-commerce a medida que construí para una óptica, con catálogo de productos y una experiencia de compra fluida.',
      },
      repoUrl: null,
      liveUrl: 'https://opticasapolovision.com/',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'E-commerce'],
      type: { en: 'Freelance · E-commerce', es: 'Freelance · E-commerce' },
      collaboration: null,
      thumbnail: 'https://image.thum.io/get/width/1200/crop/900/https://opticasapolovision.com',
      featured: true,
    },
    {
      name: 'Ukraine Population & Roads Map',
      description: {
        en: 'Interactive map of Ukraine population density and road infrastructure using GeoJSON data.',
        es: 'Mapa interactivo de densidad poblacional e infraestructura vial de Ucrania usando datos GeoJSON.',
      },
      repoUrl: 'https://github.com/Davidongo93/pop-ukraine-map',
      liveUrl: 'https://pop-ukraine-map.vercel.app/',
      technologies: ['Next.js', 'Tailwind', 'TypeScript', 'Leaflet', 'GeoJSON'],
      type: { en: 'Tech Challenge', es: 'Reto Técnico' },
      collaboration: null,
      thumbnail: '/thumbnails/ukraine.png',
      featured: true,
    },
    {
      name: 'Rescatista — Branding & Gallery',
      description: {
        en: 'Branding site and photo gallery for an animal rescue organization.',
        es: 'Sitio de branding y galería de fotos para una organización de rescate animal.',
      },
      repoUrl: 'https://github.com/Davidongo93/rescatista',
      liveUrl: 'https://rescatista.vercel.app',
      technologies: ['Vue', 'Express', 'MySQL'],
      type: { en: 'Freelance', es: 'Freelance' },
      collaboration: 'rescatista',
      thumbnail: '/thumbnails/rescatista.png',
      featured: true,
    },
    {
      name: 'GitPulse — Repo Comparison Tool',
      description: {
        en: 'Web app to visualize and compare GitHub repositories with graphs.',
        es: 'Aplicación web para visualizar y comparar repositorios de GitHub con gráficos.',
      },
      repoUrl: 'https://github.com/Davidongo93/git-pulse-web',
      liveUrl: 'https://github.com/Davidongo93/git-pulse-web',
      technologies: ['TypeScript', 'React', 'GitHub API'],
      type: { en: 'Personal', es: 'Personal' },
      collaboration: null,
      thumbnail: null,
      featured: true,
    },
    {
      name: 'VideoApp API Challenge',
      description: {
        en: 'Full Stack backend-oriented challenge with NestJS, JWT auth and PostgreSQL.',
        es: 'Reto Full Stack orientado al backend con NestJS, autenticación JWT y PostgreSQL.',
      },
      repoUrl: 'https://github.com/Davidongo93/videoapp-API-challenge',
      liveUrl: 'https://github.com/Davidongo93/videoapp-API-challenge',
      technologies: ['TypeScript', 'NestJS', 'PostgreSQL'],
      type: { en: 'Tech Challenge', es: 'Reto Técnico' },
      collaboration: null,
      thumbnail: null,
      featured: true,
    },
    {
      name: 'Disruptive Media — Full Stack MERN',
      description: {
        en: 'Full Stack MERN application for digital media content management.',
        es: 'Aplicación Full Stack MERN para gestión de contenido de medios digitales.',
      },
      repoUrl: 'https://github.com/Davidongo93/disruptive-media',
      liveUrl: 'https://github.com/Davidongo93/disruptive-media',
      technologies: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
      type: { en: 'Tech Challenge', es: 'Reto Técnico' },
      collaboration: null,
      thumbnail: null,
      featured: true,
    },
    {
      name: 'PI Videogames — Henry Full Stack',
      description: {
        en: 'Full Stack videogame catalog app with filtering, sorting and detail pages.',
        es: 'Catálogo Full Stack de videojuegos con filtros, ordenamiento y páginas de detalle.',
      },
      repoUrl: 'https://github.com/Davidongo93/PI-Videogames-main',
      liveUrl: 'https://github.com/Davidongo93/PI-Videogames-main',
      technologies: ['JavaScript', 'React', 'Redux', 'Express', 'PostgreSQL'],
      type: { en: 'Academic', es: 'Académico' },
      collaboration: null,
      thumbnail: null,
      featured: true,
    },
  ],

  // ── FAQ (GEO/AEO — answer-first, citable by AI engines) ─────────
  faq: [
    {
      q: {
        en: 'Who am I?',
        es: '¿Quién soy?',
      },
      a: {
        en: "I'm David Orlando Miranda, a Full Stack Developer based in Colombia. I build fast, scalable web products end to end —from the idea to production— with React, Next.js, Astro, Node.js, NestJS and TypeScript. I work under my personal brand, DÆV.",
        es: 'Soy David Orlando Miranda, Desarrollador Full Stack radicado en Colombia. Construyo productos web rápidos y escalables de extremo a extremo —desde la idea hasta producción— con React, Next.js, Astro, Node.js, NestJS y TypeScript. Lo hago bajo mi marca personal, DÆV.',
      },
    },
    {
      q: {
        en: 'What can I build for you or your company?',
        es: '¿Qué puedo construir para ti o para tu empresa?',
      },
      a: {
        en: 'Landing pages, custom websites, e-commerce stores, educational platforms (LMS), custom software and full SaaS products. I work with both companies and individuals, and I can take a project from design through deployment and maintenance.',
        es: 'Landing pages, sitios web a medida, tiendas e-commerce, plataformas educativas (LMS), software a medida y productos SaaS completos. Trabajo tanto con empresas como con particulares, y puedo llevar un proyecto desde el diseño hasta el despliegue y el mantenimiento.',
      },
    },
    {
      q: {
        en: 'Am I available for new projects?',
        es: '¿Estoy disponible para nuevos proyectos?',
      },
      a: {
        en: "Yes. I'm open to freelance projects and full-time roles, working remotely with teams across Latin America, the US and Europe. The fastest way to reach me is WhatsApp or email; tell me about your project and I'll get back to you shortly.",
        es: 'Sí. Estoy abierto a proyectos freelance y a roles de tiempo completo, trabajando de forma remota con equipos de Latinoamérica, EE. UU. y Europa. La vía más rápida es WhatsApp o correo; cuéntame sobre tu proyecto y te respondo enseguida.',
      },
    },
    {
      q: {
        en: 'Where am I based and what languages do I work in?',
        es: '¿Dónde resido y en qué idiomas trabajo?',
      },
      a: {
        en: 'I’m based in Colombia and I work in both Spanish and English, collaborating comfortably across time zones in the Americas and Europe.',
        es: 'Resido en Colombia y trabajo en español e inglés, colaborando sin problema en zonas horarias de América y Europa.',
      },
    },
  ],

  // ── Servicios / tipos de proyecto (CTA → WhatsApp) ──────────────
  services: [
    {
      key: 'landing',
      icon: 'rocket',
      title: { en: 'Landing Pages', es: 'Landing Pages' },
      description: {
        en: 'Fast, conversion-optimized landing pages that turn visitors into customers.',
        es: 'Páginas de aterrizaje rápidas y optimizadas para convertir visitantes en clientes.',
      },
      whatsapp: {
        en: "Hi Dave! I'm interested in a high-impact *landing page* for my business. Can we set up a call?",
        es: '¡Hola Dave! Me interesa una *landing page* de alto impacto para mi negocio. ¿Podemos coordinar una llamada?',
      },
    },
    {
      key: 'website',
      icon: 'web',
      title: { en: 'Custom Websites', es: 'Sitios Web a Medida' },
      description: {
        en: 'Bespoke corporate sites and portfolios — responsive and SEO-ready.',
        es: 'Sitios corporativos y portafolios a medida, responsivos y listos para SEO.',
      },
      whatsapp: {
        en: 'Hi Dave! I need a *custom website*. I’d like to tell you about my idea.',
        es: '¡Hola Dave! Necesito un *sitio web a medida*. Me gustaría contarte mi idea.',
      },
    },
    {
      key: 'ecommerce',
      icon: 'cart',
      title: { en: 'E-commerce', es: 'Comercios Electrónicos' },
      description: {
        en: 'Online stores with payment gateways, cart and product management.',
        es: 'Tiendas online con pasarelas de pago, carrito y gestión de productos.',
      },
      whatsapp: {
        en: 'Hi Dave! I want to launch an *online store (e-commerce)*. Shall we talk?',
        es: '¡Hola Dave! Quiero lanzar una *tienda online (e-commerce)*. ¿Hablamos?',
      },
    },
    {
      key: 'lms',
      icon: 'lms',
      title: { en: 'Educational Platforms (LMS)', es: 'Plataformas Educativas (LMS)' },
      description: {
        en: 'Learning platforms with courses, roles, progress tracking and assessments.',
        es: 'Plataformas de aprendizaje con cursos, roles, seguimiento de progreso y evaluaciones.',
      },
      whatsapp: {
        en: 'Hi Dave! I’m looking to build an *educational platform (LMS)*. Can we coordinate?',
        es: '¡Hola Dave! Busco desarrollar una *plataforma educativa (LMS)*. ¿Podemos coordinar?',
      },
    },
    {
      key: 'software',
      icon: 'software',
      title: { en: 'Custom Software', es: 'Software a Medida' },
      description: {
        en: "Tailored applications that automate and solve your business's specific needs.",
        es: 'Aplicaciones a medida que automatizan y resuelven necesidades específicas de tu negocio.',
      },
      whatsapp: {
        en: 'Hi Dave! I need *custom software* to solve a specific problem. Can we discuss it?',
        es: '¡Hola Dave! Necesito *software a medida* para resolver un problema específico. ¿Lo conversamos?',
      },
    },
    {
      key: 'saas',
      icon: 'saas',
      title: { en: 'SaaS Products', es: 'Productos SaaS' },
      description: {
        en: 'Scalable SaaS products with subscriptions, multi-tenant and dashboards.',
        es: 'Productos SaaS escalables, con suscripciones, multi-tenant y panel de control.',
      },
      whatsapp: {
        en: 'Hi Dave! I want to build a *SaaS product*. I’d love your help taking it to production.',
        es: '¡Hola Dave! Quiero construir un *producto SaaS*. Me encantaría tu ayuda para llevarlo a producción.',
      },
    },
  ],

  // ── Snippet de código (terminal / About) ────────────────────────
  codeSnippet: `class DavidMiranda extends MasterProgrammer {
  constructor() {
    super(
      'David Orlando Miranda',
      'Full Stack Developer',
      {
        years: 4,
        companiesWorkedWith: 3,
        projectsCompleted: 10,
      },
      {
        frontend: ['React', 'Next.js', 'Vue', 'TypeScript'],
        backend: ['Node.js', 'NestJS', 'Express', 'PostgreSQL'],
        other: ['Git', 'Docker', 'NX', 'Redux', 'GraphQL'],
      }
    );
    this.email = 'domirandar@gmail.com';
  }
}`,
} as const;

export type Lang = 'en' | 'es';
