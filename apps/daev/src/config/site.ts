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
  photo:
    'https://res.cloudinary.com/de43jseoy/image/upload/v1782355482/davidongo93/daveTrabaja_kxooa1.png',
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

  // ── Precios / planes (página /pricing) ──────────────────────────
  pricing: {
    currency: 'COP',
    // Última lectura válida de la TRM (USD→COP). Sirve de respaldo si la API falla.
    trmUsdToCop: 3426,
    trmDate: '2026-06-24',
    plans: [
      {
        key: 'landing',
        icon: 'rocket',
        name: { en: 'Landing Page', es: 'Landing Page' },
        tagline: {
          en: 'A simple, high-impact one-page site to present your business.',
          es: 'Un sitio de una sola página, sencillo y de alto impacto para presentar tu negocio.',
        },
        priceCop: 850000,
        priceSuffix: { en: 'one-time', es: 'pago único' },
        featured: false,
        fineprint: [
          {
            en: 'The price does not include recurring hosting: the first year is free and, from the second year on, it costs COP $300,000 per year.',
            es: 'El precio no incluye el hosting recurrente: el primer año es sin costo y, a partir del segundo, cuesta $300.000 COP al año.',
          },
        ],
        features: [
          {
            en: 'Responsive design for every device',
            es: 'Diseño adaptable a todos los dispositivos',
          },
          {
            en: 'WhatsApp and social media buttons',
            es: 'Botones a WhatsApp y redes sociales',
          },
          {
            en: 'Basic search engine optimization (SEO)',
            es: 'Optimización básica para buscadores (SEO)',
          },
          {
            en: 'Hosting included free for the first year',
            es: 'Hosting sin costo el primer año',
          },
          {
            en: 'Free basic support for 3 months',
            es: 'Soporte básico sin costo durante 3 meses',
          },
        ],
        whatsapp: {
          en: 'Hi Dave! I’m interested in a *landing page* (COP $850,000). Can we set up a call?',
          es: '¡Hola Dave! Me interesa una *landing page* (COP $850.000). ¿Coordinamos una llamada?',
        },
      },
      {
        key: 'ecommerce',
        icon: 'cart',
        name: { en: 'E-commerce', es: 'E-commerce' },
        tagline: {
          en: 'A complete online store to sell your products with payments.',
          es: 'Una tienda online completa para vender tus productos con pagos.',
        },
        priceCop: 1800000,
        priceSuffix: { en: 'from', es: 'desde' },
        featured: true,
        fineprint: [
          {
            en: 'This price covers up to 50 product references and 4 photos per product.',
            es: 'Este precio cubre únicamente 50 referencias de producto y 4 fotografías por producto.',
          },
          {
            en: 'It does not include the fees of the payment gateway you choose.',
            es: 'No incluye los costos de la pasarela de pago que elijas.',
          },
        ],
        features: [
          {
            en: 'Responsive design and basic SEO',
            es: 'Diseño responsive y SEO básico',
          },
          {
            en: 'WhatsApp and social media buttons',
            es: 'Botones a WhatsApp y redes sociales',
          },
          {
            en: 'Product catalog and shopping cart',
            es: 'Catálogo de productos y carrito de compras',
          },
          {
            en: 'Payment gateway integration',
            es: 'Integración de pasarela de pagos',
          },
          { en: 'Admin dashboard', es: 'Panel administrativo' },
          { en: 'Database', es: 'Base de datos' },
          {
            en: 'Free premium support for 3 months',
            es: 'Soporte premium sin costo durante 3 meses',
          },
        ],
        whatsapp: {
          en: 'Hi Dave! I want an *e-commerce store* (from COP $1,800,000). Shall we talk?',
          es: '¡Hola Dave! Quiero una *tienda e-commerce* (desde COP $1.800.000). ¿Hablamos?',
        },
      },
      {
        key: 'lms',
        icon: 'lms',
        name: { en: 'LMS · Educational Platform', es: 'LMS · Plataforma Educativa' },
        tagline: {
          en: 'A learning platform with courses, students and progress tracking.',
          es: 'Una plataforma de aprendizaje con cursos, estudiantes y seguimiento de progreso.',
        },
        priceCop: 1500000,
        priceSuffix: { en: 'from', es: 'desde' },
        featured: false,
        features: [
          { en: 'User management', es: 'Gestión de usuarios' },
          {
            en: 'Roles (Admin, Instructor, Student)',
            es: 'Roles (Administrador, Instructor, Estudiante)',
          },
          { en: 'Course management', es: 'Gestión de cursos' },
          { en: 'Modules and lessons', es: 'Módulos y lecciones' },
          { en: 'Assessments', es: 'Evaluaciones' },
          { en: 'Quizzes', es: 'Cuestionarios' },
          { en: 'Progress tracking', es: 'Seguimiento de progreso' },
          { en: 'PDF certificates with QR code', es: 'Certificados PDF con código QR' },
          { en: 'Admin dashboard', es: 'Panel administrativo' },
          { en: 'Database', es: 'Base de datos' },
          {
            en: 'Responsive design with basic optimization (SEO)',
            es: 'Diseño responsive con optimización básica (SEO)',
          },
          {
            en: 'Free premium support for 3 months',
            es: 'Soporte premium sin costo durante 3 meses',
          },
        ],
        fineprint: [
          {
            en: 'Includes 1 administrator, 1 instructor, 10 modules and unlimited students.',
            es: 'Incluye 1 administrador, 1 instructor, 10 módulos y estudiantes ilimitados.',
          },
        ],
        whatsapp: {
          en: 'Hi Dave! I’m interested in an *educational platform (LMS)* (from COP $1,500,000). Can we coordinate?',
          es: '¡Hola Dave! Me interesa una *plataforma educativa (LMS)* (desde COP $1.500.000). ¿Podemos coordinar?',
        },
      },
    ],
    // Costos recurrentes de infraestructura (en USD, se muestran también en COP).
    infrastructure: [
      {
        key: 'domain',
        icon: 'domain',
        name: { en: 'Domain', es: 'Dominio' },
        priceUsd: null,
        priceCop: null,
        per: null,
        note: {
          en: 'Variable — depends on the domain you choose, or free if you already own one.',
          es: 'Variable — depende del dominio que elijas, o sin costo si ya tienes uno.',
        },
      },
      {
        key: 'hosting-landing',
        icon: 'hosting',
        name: { en: 'Hosting · Landing Page', es: 'Hosting · Landing Page' },
        priceUsd: null,
        priceCop: 300000,
        per: { en: '/year', es: '/año' },
        note: {
          en: 'First year free.',
          es: 'Primer año sin costo.',
        },
      },
      {
        key: 'hosting-store',
        icon: 'hosting',
        name: { en: 'Hosting · E-commerce & LMS', es: 'Hosting · E-commerce y LMS' },
        priceUsd: 540,
        priceCop: null,
        per: { en: '/year', es: '/año' },
        note: {
          en: 'Resources for an online store or learning platform.',
          es: 'Recursos para una tienda online o plataforma educativa.',
        },
      },
    ],
    // Complementos opcionales.
    addons: [
      {
        key: 'email',
        icon: 'email',
        name: { en: 'Email marketing lists', es: 'Listas de correo' },
        description: {
          en: 'Send campaigns to up to 5,000 contacts.',
          es: 'Envía campañas a hasta 5.000 contactos.',
        },
        priceUsd: 10,
        priceCop: null,
        per: { en: '/month', es: '/mes' },
        priceLabel: null,
      },
      {
        key: 'api',
        icon: 'api',
        name: { en: 'API integrations', es: 'Integraciones con APIs' },
        description: {
          en: 'Connect services like Meta, Telegram and others. The cost depends on the service and may vary.',
          es: 'Conexión con servicios como Meta, Telegram y otros. El costo depende del servicio y puede variar.',
        },
        priceUsd: null,
        priceCop: null,
        per: null,
        priceLabel: { en: 'Variable', es: 'Variable' },
      },
      {
        key: 'chatbot',
        icon: 'chatbot',
        name: { en: 'Chatbot integration', es: 'Integración de chatbots' },
        description: {
          en: 'Automated assistants for your site or channels. Variable price, agreed per project.',
          es: 'Asistentes automatizados para tu sitio o canales. Precio variable y a convenir.',
        },
        priceUsd: null,
        priceCop: null,
        per: null,
        priceLabel: { en: 'On request', es: 'A convenir' },
      },
      {
        key: 'seo',
        icon: 'seo',
        name: {
          en: 'SEO positioning strategy',
          es: 'Estrategia de posicionamiento SEO',
        },
        description: {
          en: 'Search positioning strategy with Google metrics and tracking.',
          es: 'Estrategia de posicionamiento con métricas de Google y seguimiento.',
        },
        priceUsd: null,
        priceCop: null,
        per: null,
        priceLabel: { en: 'On request', es: 'A convenir' },
      },
      {
        key: 'scheduling',
        icon: 'scheduling',
        name: {
          en: 'Booking & appointment scheduling',
          es: 'Integración y agendamiento de citas',
        },
        description: {
          en: 'Bookings and appointment scheduling — ideal for independent professionals.',
          es: 'Reservas y agendamiento de citas, ideal para profesionales independientes.',
        },
        priceUsd: null,
        priceCop: null,
        per: null,
        priceLabel: { en: 'On request', es: 'A convenir' },
      },
    ],
    // Planes de soporte mensual (sección aparte en /pricing).
    support: [
      {
        key: 'support-basic',
        icon: 'support-basic',
        name: { en: 'Monthly support · Basic', es: 'Soporte mensual · Básico' },
        description: {
          en: 'Add simple features and edit texts and sections.',
          es: 'Agrega funcionalidades sencillas y modifica textos y secciones.',
        },
        priceUsd: null,
        priceCop: 150000,
        per: { en: '/month', es: '/mes' },
        priceLabel: null,
      },
      {
        key: 'support-premium',
        icon: 'support-premium',
        name: { en: 'Monthly support · Premium', es: 'Soporte mensual · Premium' },
        description: {
          en: 'Add features, edit texts and sections, plus 24/7 technical support.',
          es: 'Agrega funcionalidades, modifica textos y secciones, y soporte técnico 24/7.',
        },
        priceUsd: null,
        priceCop: 350000,
        per: { en: '/month', es: '/mes' },
        priceLabel: null,
      },
    ],
    // CTA para productos a medida / no listados.
    quoteWhatsapp: {
      en: 'Hi Dave! I need a quote for a custom project. Let me share the details.',
      es: '¡Hola Dave! Necesito una cotización para un proyecto a medida. Te cuento los detalles.',
    },
    // Ejemplo ilustrativo de precios de dominio (referencia de un registrador).
    domainExample: {
      items: [
        {
          label: { en: '.CO Domain', es: 'Dominio .CO' },
          domain: 'example.co',
          term: { en: '1 Year', es: '1 año' },
          priceUsd: 29.99,
          renewsUsd: 56.99,
          offUsd: 27,
        },
        {
          label: { en: '.COM.CO Domain', es: 'Dominio .COM.CO' },
          domain: 'example.com.co',
          term: { en: '3 Years — $20/yr', es: '3 años — $20/año' },
          priceUsd: 60,
          renewsUsd: 125.97,
          offUsd: 65.97,
        },
      ],
    },
  },

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
