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
    en: 'I build fast, scalable web products from idea to deployment. Passionate about clean code, great UX, and shipping quality software that drives business results.',
    es: 'Construyo productos web rápidos y escalables desde la idea hasta el despliegue. Apasionado por el código limpio, la buena UX y entregar software de calidad que genere resultados de negocio.',
  },
  location: 'Colombia',
  locationFlag: '🇨🇴',
  available: true,
  siteUrl: 'https://daev.vercel.app',

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
      company: 'AppTender',
      role: {
        en: 'Junior Backend Developer',
        es: 'Desarrollador Backend Junior',
      },
      period: '2021 – 2022',
      description: {
        en: 'Developed backend APIs, collaborated with frontend teams, optimized database queries.',
        es: 'Desarrollé APIs backend, colaboré con equipos frontend y optimicé queries de base de datos.',
      },
      logo: '/icons/appTender.svg',
      website: null,
    },
    {
      company: 'Invicto',
      role: {
        en: 'Backend Developer (Freelance)',
        es: 'Desarrollador Backend (Freelance)',
      },
      period: '2022 – 2023',
      description: {
        en: 'Designed RESTful services, handled server-side logic, integrated third-party APIs.',
        es: 'Diseñé servicios RESTful, manejé lógica del servidor e integré APIs de terceros.',
      },
      logo: '/icons/invicto.png',
      website: null,
    },
    {
      company: 'Rescatista',
      role: {
        en: 'Frontend Engineer (Freelance)',
        es: 'Ingeniero Frontend (Freelance)',
      },
      period: '2023 – Present',
      description: {
        en: 'Implemented responsive UIs, optimized performance, contributed to product design.',
        es: 'Implementé UIs responsivas, optimicé rendimiento y contribuí al diseño del producto.',
      },
      logo: '/icons/rescatista.png',
      website: 'https://rescatista.vercel.app',
    },
  ],

  // ── Skills ──────────────────────────────────────────────────────
  skills: {
    frontend: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS'],
    backend: ['Node.js', 'NestJS', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs'],
    tools: ['Git', 'Docker', 'NX', 'Redux', 'Jest', 'Vercel', 'GitHub Actions'],
  },

  // ── Proyectos destacados ────────────────────────────────────────
  featuredProjects: [
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
      thumbnail: '/cityDrawImp.jpg',
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
      thumbnail: '/bwCity.jpg',
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
      thumbnail: '/citydraw.png',
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
      thumbnail: '/daveEmployee.png',
      featured: true,
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
