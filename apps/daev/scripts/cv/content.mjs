// Contenido del CV. La fuente de verdad de la trayectoria es docs/career.md:
// si un dato cambia, se cambia allá primero y después acá.

const contact = {
  email: 'domirandar@gmail.com',
  phone: '+57 301 574 0156',
  web: 'daev.space',
  linkedin: 'linkedin.com/in/domirandar',
  github: 'github.com/Davidongo93',
};

const photo =
  'https://res.cloudinary.com/de43jseoy/image/upload/c_fill,g_face,w_320,h_320,f_jpg,q_85/v1782355482/davidongo93/daveTrabaja_kxooa1.png';

export const cv = {
  es: {
    lang: 'es',
    file: 'david-miranda-cv-es.pdf',
    photo,
    name: 'David Orlando Miranda Roa',
    title: 'Desarrollador Full Stack',
    location: 'Bogotá, Colombia · remoto',
    contact,
    labels: {
      contact: 'Contacto',
      numbers: 'En cifras',
      skills: 'Habilidades',
      education: 'Formación',
      languages: 'Idiomas',
      profile: 'Perfil',
      experience: 'Experiencia',
      research: 'Investigación y academia',
    },
    numbers: [
      { value: '45+', label: 'proyectos terminados' },
      { value: '15+', label: 'años en IT' },
      { value: '4+', label: 'años en desarrollo full stack' },
    ],
    skills: [
      { group: 'Backend', items: 'Node.js, NestJS, Express, PostgreSQL, MySQL, MongoDB, APIs REST, Java/Spring' },
      { group: 'Frontend', items: 'React, Next.js, Astro, Vue, TypeScript, Tailwind CSS' },
      { group: 'Infraestructura', items: 'Linux, Docker, Cloudflare (Workers, Pages, D1, DNS), Vercel, AWS, CI/CD' },
      { group: 'SEO', items: 'SEO técnico y local, datos estructurados (JSON-LD), Core Web Vitals, IndexNow' },
      { group: 'Método', items: 'Scrum, TDD, principios SOLID, Git, Jira, agentes de IA' },
    ],
    education: [
      { title: 'Certificado Profesional de Diseño UX de Google', org: 'Coursera', period: 'en curso' },
      { title: 'Claude Code 101', org: 'Anthropic · Coursera', period: 'en curso' },
      { title: 'Bootcamp Full Stack', org: 'Henry · 800 h', period: '2022 – 2023' },
      { title: 'Java Upskill', org: 'Henry · 300 h', period: '2023' },
      { title: 'NDG Linux Unhatched', org: 'Cisco Networking Academy', period: '2023' },
      { title: 'IT Essentials in JavaScript', org: 'OpenEDG JS Institute', period: '2022' },
      { title: 'Administración y soporte IT', org: 'SENA · Cisco IT Essentials', period: '2010 – 2011' },
      { title: 'Técnico en Análisis y Programación de Sistemas', org: 'IE Alexander von Humboldt', period: '2005 – 2008' },
    ],
    languages: [
      { name: 'Español', level: 'nativo' },
      { name: 'Inglés', level: 'B2 en curso, orientado a IT' },
    ],
    profile:
      'Desarrollador full stack con más de 15 años en IT: empecé como técnico de hardware, redes y servidores, y desde 2022 construyo productos web de punta a punta. He liderado un equipo técnico en una plataforma de trazabilidad con cumplimiento normativo y hoy entrego sitios con SEO en una agencia de marketing, mientras atiendo clientes propios. Mi fuerte es el backend con lógica de negocio sólida y llevar un proyecto desde la idea hasta producción, con dominio y métricas.',
    experience: [
      {
        role: 'Desarrollador Web y SEO',
        company: 'DigitalYa',
        detail: 'agencia de marketing digital, Argentina · remoto',
        period: 'may 2026 – actual',
        bullets: [
          '42 sitios asignados en cinco meses, 30 ya entregados, para estudios jurídicos y profesionales.',
          'Ciclo completo de cada sitio: diseño, desarrollo en Astro y TypeScript, SEO técnico y local, despliegue en Cloudflare, DNS y dominio.',
          'Automaticé el flujo de la agencia con scripts y agentes de IA: arranque de proyectos, despliegue verificado, control de entregas y seguimiento en Jira.',
        ],
      },
      {
        role: 'Líder técnico',
        company: 'Colombian Cannabis Center',
        detail: 'agrotech regulada',
        period: 'sep 2024 – may 2026',
        bullets: [
          'Diseñé el backend de la plataforma de gestión agrícola y trazabilidad de planta a lote, pensada para auditoría (NestJS, PostgreSQL, Docker).',
          'Lideré el equipo frontend del sitio comercial y de la aplicación interna, con acceso por roles.',
          'Definí la estrategia tecnológica y las prácticas de calidad y seguridad de la información.',
        ],
      },
      {
        role: 'Desarrollador Full Stack',
        company: 'AppTender',
        period: 'jul 2023 – ago 2024',
        bullets: [
          'Migré el backend heredado de Express a NestJS.',
          'Implementé endpoints con integraciones de Meta, Brevo y OpenAI, y funcionalidades de frontend en Vue.',
        ],
      },
      {
        role: 'Desarrollador Full Stack freelance',
        company: 'Daev',
        period: '2023 – actual',
        bullets: [
          'Chez Boaz Tours: reconstrucción con reservas y anticipo en línea; LCP móvil de 7,9 s a 1,6 s.',
          'Ópticas Apolo Visión (e-commerce y agendamiento), Climb Rock (seguridad industrial), Invicto (pasarelas de pago) y otros.',
        ],
      },
      {
        role: 'Técnico de soporte e infraestructura IT',
        company: 'Independiente',
        period: '2008 – 2022',
        bullets: [
          'Mantenimiento de equipos, redes, sistemas operativos y servidores para empresas y hogares.',
          'Aplicaciones de gestión sobre SQL Server y Access; sitios web con Dreamweaver.',
        ],
      },
    ],
    research: [
      { year: '2012', text: 'Biología computacional (UNAL): cladogramas a partir de secuencias de ADN, en Perl con reportes en LaTeX.' },
      { year: '2010', text: 'Laboratorio de estadística social con R.' },
    ],
  },

  en: {
    lang: 'en',
    file: 'david-miranda-cv-en.pdf',
    photo,
    name: 'David Orlando Miranda Roa',
    title: 'Full Stack Developer',
    location: 'Bogotá, Colombia · remote',
    contact,
    labels: {
      contact: 'Contact',
      numbers: 'At a glance',
      skills: 'Skills',
      education: 'Education',
      languages: 'Languages',
      profile: 'Profile',
      experience: 'Experience',
      research: 'Research & academia',
    },
    numbers: [
      { value: '45+', label: 'projects delivered' },
      { value: '15+', label: 'years in IT' },
      { value: '4+', label: 'years in full stack development' },
    ],
    skills: [
      { group: 'Backend', items: 'Node.js, NestJS, Express, PostgreSQL, MySQL, MongoDB, REST APIs, Java/Spring' },
      { group: 'Frontend', items: 'React, Next.js, Astro, Vue, TypeScript, Tailwind CSS' },
      { group: 'Infrastructure', items: 'Linux, Docker, Cloudflare (Workers, Pages, D1, DNS), Vercel, AWS, CI/CD' },
      { group: 'SEO', items: 'Technical and local SEO, structured data (JSON-LD), Core Web Vitals, IndexNow' },
      { group: 'Practices', items: 'Scrum, TDD, SOLID principles, Git, Jira, AI agents' },
    ],
    education: [
      { title: 'Google UX Design Professional Certificate', org: 'Coursera', period: 'in progress' },
      { title: 'Claude Code 101', org: 'Anthropic · Coursera', period: 'in progress' },
      { title: 'Full Stack Bootcamp', org: 'Henry · 800 h', period: '2022 – 2023' },
      { title: 'Java Upskill', org: 'Henry · 300 h', period: '2023' },
      { title: 'NDG Linux Unhatched', org: 'Cisco Networking Academy', period: '2023' },
      { title: 'IT Essentials in JavaScript', org: 'OpenEDG JS Institute', period: '2022' },
      { title: 'IT Administration & Support', org: 'SENA · Cisco IT Essentials', period: '2010 – 2011' },
      { title: 'Technical Degree, Systems Analysis & Programming', org: 'IE Alexander von Humboldt', period: '2005 – 2008' },
    ],
    languages: [
      { name: 'Spanish', level: 'native' },
      { name: 'English', level: 'working toward B2, IT-focused' },
    ],
    profile:
      'Full stack developer with 15+ years in IT: I started as a hardware, networking and server technician, and since 2022 I have built web products end to end. I led a technical team on a regulatory-compliant traceability platform, and today I ship SEO-ready websites at a marketing agency while serving my own clients. My strength is backend work with solid business logic and taking a project from idea to production, domain and metrics included.',
    experience: [
      {
        role: 'Web & SEO Developer',
        company: 'DigitalYa',
        detail: 'digital marketing agency, Argentina · remote',
        period: 'May 2026 – present',
        bullets: [
          '42 websites assigned in five months, 30 already delivered, for law firms and professional practices.',
          'Own the full cycle of each site: design, Astro and TypeScript development, technical and local SEO, Cloudflare deployment, DNS and domain.',
          "Automated the agency's workflow with scripts and AI agents: project scaffolding, verified deploys, delivery tracking and Jira follow-up.",
        ],
      },
      {
        role: 'Technical Lead',
        company: 'Colombian Cannabis Center',
        detail: 'regulated agrotech',
        period: 'Sep 2024 – May 2026',
        bullets: [
          'Designed the backend of the farm-management platform with plant-to-batch traceability built for audits (NestJS, PostgreSQL, Docker).',
          'Led the frontend team behind the commercial website and the internal app, with role-based access.',
          'Set the technology strategy and the quality and information-security practices.',
        ],
      },
      {
        role: 'Full Stack Developer',
        company: 'AppTender',
        period: 'Jul 2023 – Aug 2024',
        bullets: [
          'Migrated the legacy backend from Express to NestJS.',
          'Built endpoints integrating Meta, Brevo and OpenAI, plus frontend features in Vue.',
        ],
      },
      {
        role: 'Freelance Full Stack Developer',
        company: 'Daev',
        period: '2023 – present',
        bullets: [
          'Chez Boaz Tours: rebuild with online booking and deposits; mobile LCP down from 7.9 s to 1.6 s.',
          'Ópticas Apolo Visión (e-commerce and booking), Climb Rock (industrial safety), Invicto (payment gateways) and others.',
        ],
      },
      {
        role: 'IT Support & Infrastructure Technician',
        company: 'Independent',
        period: '2008 – 2022',
        bullets: [
          'Maintained hardware, networks, operating systems and servers for businesses and households.',
          'Built management apps on SQL Server and Access, and websites with Dreamweaver.',
        ],
      },
    ],
    research: [
      { year: '2012', text: 'Computational biology (UNAL): cladograms from DNA sequences, in Perl with LaTeX reports.' },
      { year: '2010', text: 'Social statistics lab using R.' },
    ],
  },
};
