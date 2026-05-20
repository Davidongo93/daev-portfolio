# CLAUDE.md — Plan de rediseño completo: daev-portfolio v2

> **Para Opus:** Ejecuta cada fase en orden. Lee la sección completa antes de escribir código. Verifica `npx nx build daev` sin errores al terminar cada fase. No agregues dependencias externas — todo lo necesario ya está instalado.

---

## Stack y comandos

```bash
npx nx dev daev          # dev server en localhost:4200 (o 3000)
npx nx build daev        # build de producción
npx nx lint daev         # linter
```

Rutas clave:
- App: `apps/daev/src/`
- Config personal: `apps/daev/src/config/site.ts` ← **crear en Fase 0**
- Contextos: `apps/daev/src/context/` ← **crear en Fase 0**
- Componentes: `apps/daev/src/components/`
- Vistas: `apps/daev/src/views/`
- CSS global: `apps/daev/src/app/global.css`
- Tailwind config: `apps/daev/tailwind.config.js`
- Layout root: `apps/daev/src/app/layout.tsx`

Dependencias ya instaladas relevantes:
- `swiper ^11` — reemplaza react-slick
- `react-icons ^5` — iconos (incluye FaWhatsapp, FaMoon, FaSun, etc.)
- `prism-react-renderer ^2` — bloques de código
- `react-slick` + `slick-carousel` — ELIMINAR en Fase 1

---

## FASE 0 — Foundation: Config central, tema y lenguaje

Esta es la fase más crítica. Todo el resto la usa.

### 0.1 — Crear `apps/daev/src/config/site.ts`

Archivo de configuración único para TODA la info personal. Dave modifica solo este archivo para actualizar el sitio.

```typescript
// apps/daev/src/config/site.ts

export const siteConfig = {
  // ── Identidad ──────────────────────────────────────────────────
  name: 'David Orlando Miranda',
  alias: 'DÆV',
  role: { en: 'Full Stack Developer', es: 'Desarrollador Full Stack' },
  bio: {
    en: 'I build fast, scalable web products from idea to deployment. Passionate about clean code, great UX and open source.',
    es: 'Construyo productos web rápidos y escalables desde la idea hasta el despliegue. Apasionado por el código limpio, la buena UX y el open source.',
  },
  location: 'Colombia 🇨🇴',
  available: true,

  // ── Contacto ────────────────────────────────────────────────────
  email: 'domirandar@gmail.com',
  phone: '+573015740156',
  whatsapp: 'https://wa.me/+573015740156',

  // ── Redes sociales ──────────────────────────────────────────────
  links: {
    github: 'https://github.com/Davidongo93',
    linkedin: 'https://www.linkedin.com/in/domirandar/',
    twitter: 'https://x.com/domirandar',
    instagram: 'https://www.instagram.com/davegoes2rock/',
    discord: 'https://discordapp.com/users/1072550664762298468',
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
      role: { en: 'Junior Backend Developer', es: 'Desarrollador Backend Junior' },
      period: '2021 – 2022',
      description: {
        en: 'Developed backend APIs, collaborated with frontend teams, optimized database queries.',
        es: 'Desarrollé APIs backend, colaboré con equipos frontend y optimicé queries de base de datos.',
      },
      logo: '/icons/appTender.svg',
    },
    {
      company: 'Invicto',
      role: { en: 'Backend Developer (Freelance)', es: 'Desarrollador Backend (Freelance)' },
      period: '2022 – 2023',
      description: {
        en: 'Designed RESTful services, handled server-side logic, integrated third-party APIs.',
        es: 'Diseñé servicios RESTful, manejé lógica del servidor e integré APIs de terceros.',
      },
      logo: '/icons/invicto.png',
    },
    {
      company: 'Rescatista',
      role: { en: 'Frontend Engineer (Freelance)', es: 'Ingeniero Frontend (Freelance)' },
      period: '2023 – Present',
      description: {
        en: 'Implemented responsive UIs, optimized performance, contributed to product design.',
        es: 'Implementé UIs responsivas, optimicé rendimiento y contribuí al diseño del producto.',
      },
      logo: '/icons/rescatista.png',
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
    },
  ],

  // ── Snippet de código (CodeExample / AboutSection) ──────────────
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
};
```

### 0.2 — Sistema de temas con CSS variables

**Archivo:** `apps/daev/src/app/global.css`

Reemplaza el contenido con el siguiente sistema de tokens. Mantén los `@tailwind` imports al inicio y el resto de estilos existentes que no sean de tema. **Agrega al inicio después de los @tailwind**:

```css
/* ── Design tokens ───────────────────────────────────── */
:root {
  /* Light theme (default) */
  --bg:              #f0f4ff;
  --surface:         #ffffff;
  --surface-el:      #e4ecfb;
  --accent:          #0369a1;
  --accent-hover:    #0284c7;
  --accent-2:        #4f46e5;
  --green:           #16a34a;
  --green-hover:     #15803d;
  --text:            #0f172a;
  --text-muted:      #475569;
  --border:          #cbd5e1;
  --shadow:          rgba(15, 23, 42, 0.08);
}

.dark {
  /* Dark theme */
  --bg:              #080d14;
  --surface:         #0f1724;
  --surface-el:      #1a2332;
  --accent:          #00e5ff;
  --accent-hover:    #38bdf8;
  --accent-2:        #818cf8;
  --green:           #22c55e;
  --green-hover:     #4ade80;
  --text:            #e2e8f0;
  --text-muted:      #64748b;
  --border:          #1e3a5f;
  --shadow:          rgba(0, 229, 255, 0.04);
}
```

### 0.3 — Tailwind config: custom colors y fuentes

**Archivo:** `apps/daev/tailwind.config.js` — reemplaza completamente:

```js
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

module.exports = {
  darkMode: 'class',
  content: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        bg:         'var(--bg)',
        surface:    'var(--surface)',
        'surface-el': 'var(--surface-el)',
        accent:     'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-2': 'var(--accent-2)',
        green:      'var(--green)',
        'green-hover': 'var(--green-hover)',
        fore:       'var(--text)',
        muted:      'var(--text-muted)',
        border:     'var(--border)',
      },
      fontFamily: {
        sans:    ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in':  'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'bg-pan':   'moveBackground 20s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
```

### 0.4 — Agregar fuentes Google al layout

**Archivo:** `apps/daev/src/app/layout.tsx`

Agrega en el `<head>` (dentro del `RootLayout`):
```tsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

Agrega también `suppressHydrationWarning` al `<html>` (necesario para el tema):
```tsx
<html lang="en" suppressHydrationWarning>
```

### 0.5 — Crear ThemeContext

**Archivo nuevo:** `apps/daev/src/context/ThemeContext.tsx`

```tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const preferred = stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(preferred);
    document.documentElement.classList.toggle('dark', preferred === 'dark');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
```

### 0.6 — Crear LangContext con traducciones completas

**Archivo nuevo:** `apps/daev/src/context/LangContext.tsx`

```tsx
'use client';
import { createContext, useContext, useState } from 'react';

type Lang = 'en' | 'es';

export const translations = {
  en: {
    nav: { about: 'About', blog: 'Blog', skills: 'Skills', projects: 'Projects', contact: 'Contact', cli: 'Terminal' },
    hero: { greeting: "Hi, I'm Dave", cta: 'Hire Me', ctaContact: 'Contact Me' },
    about: { title: 'About Me', available: 'Available for work' },
    experience: { title: 'Experience', company: 'Company', role: 'Role', period: 'Period', contact: 'Contact Me' },
    skills: { title: 'Skills', frontend: 'Frontend', backend: 'Backend', tools: 'Tools & DevOps' },
    stats: { title: 'My Stats', years: 'Years of Experience', projects: 'Projects Completed', clients: 'Satisfied Clients' },
    featured: { title: 'Featured Projects', viewRepo: 'Repo', liveDemo: 'Demo', collab: 'Collaboration with' },
    projects: { title: 'All Projects on GitHub', viewAll: 'View all on GitHub' },
    contact: { title: 'Contact', name: 'Your Name', email: 'Your Email', message: 'Your Message', send: 'Send Message', or: 'Or reach me directly' },
    blog: { title: 'Blog', search: 'Search articles...', sortDate: 'Sort by date', sortTitle: 'Sort by title', noResults: 'No articles found', related: 'Related Posts' },
    footer: { rights: 'All rights reserved', madeWith: 'Made with' },
    console: { help: 'Type help for available commands', gui: 'gui — load graphic interface' },
    theme: { dark: 'Dark mode', light: 'Light mode' },
    lang: { switch: 'ES' },
    notFound: { title: 'Page not found', back: 'Go home' },
  },
  es: {
    nav: { about: 'Sobre mí', blog: 'Blog', skills: 'Habilidades', projects: 'Proyectos', contact: 'Contacto', cli: 'Terminal' },
    hero: { greeting: 'Hola, soy Dave', cta: 'Contrátame', ctaContact: 'Contáctame' },
    about: { title: 'Sobre mí', available: 'Disponible para trabajar' },
    experience: { title: 'Experiencia', company: 'Empresa', role: 'Rol', period: 'Período', contact: 'Contáctame' },
    skills: { title: 'Habilidades', frontend: 'Frontend', backend: 'Backend', tools: 'Herramientas & DevOps' },
    stats: { title: 'Mis Estadísticas', years: 'Años de Experiencia', projects: 'Proyectos Completados', clients: 'Clientes Satisfechos' },
    featured: { title: 'Proyectos Destacados', viewRepo: 'Repo', liveDemo: 'Demo', collab: 'Colaboración con' },
    projects: { title: 'Todos los Proyectos en GitHub', viewAll: 'Ver todos en GitHub' },
    contact: { title: 'Contacto', name: 'Tu nombre', email: 'Tu correo', message: 'Tu mensaje', send: 'Enviar mensaje', or: 'O contáctame directamente' },
    blog: { title: 'Blog', search: 'Buscar artículos...', sortDate: 'Ordenar por fecha', sortTitle: 'Ordenar por título', noResults: 'No se encontraron artículos', related: 'Posts Relacionados' },
    footer: { rights: 'Todos los derechos reservados', madeWith: 'Hecho con' },
    console: { help: 'Escribe help para ver los comandos disponibles', gui: 'gui — cargar interfaz gráfica' },
    theme: { dark: 'Modo oscuro', light: 'Modo claro' },
    lang: { switch: 'EN' },
    notFound: { title: 'Página no encontrada', back: 'Ir al inicio' },
  },
} as const;

type Translations = typeof translations.en;

const LangContext = createContext<{ lang: Lang; t: Translations; toggle: () => void }>({
  lang: 'en',
  t: translations.en,
  toggle: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const toggle = () => setLang((l) => (l === 'en' ? 'es' : 'en'));

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
```

### 0.7 — Envolver la app con los providers

**Archivo:** `apps/daev/src/app/layout.tsx`

El `body` debe quedar así:
```tsx
<body className="bg-bg text-fore font-sans transition-colors duration-300">
  <ThemeProvider>
    <LangProvider>
      {children}
      <WhatsAppButton />
    </LangProvider>
  </ThemeProvider>
</body>
```

Importar `ThemeProvider`, `LangProvider` (ambos `'use client'`), y `WhatsAppButton` (se crea en Fase 3.6).

**Borrar** el `@import` de Google Fonts que estaba en `ConsoleCLI.style.css` y `global.css` — quedan solo en el `layout.tsx`.

### 0.8 — Eliminar archivos obsoletos

Eliminar:
- `apps/daev/src/components/Posts/Posts.tsx` — no se usa, tiene bug de path antiguo
- `apps/daev/src/hooks/hook.ts` — `useTailwindColors` no se usa en ningún componente
- `apps/daev/src/components/Projects/projectData.ts` — datos ficticios nunca usados

Desinstalar dependencias pesadas no reemplazadas:
```bash
npm uninstall react-slick slick-carousel
```
Eliminar del `package.json` manual si el uninstall falla por workspace. Verificar que `react-slick` ya no se importe en ningún archivo.

---

## FASE 1 — Carousel: Migrar de react-slick a Swiper

El carousel actual usa `react-slick` (CSS roto, flechas malas, `cssEase: ''` inválido). Swiper ya está instalado.

### 1.1 — Reescribir el Carousel

**Archivo:** `apps/daev/src/components/Carousel.tsx/Carousel.tsx`

```tsx
'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import AboutSection from '../AboutSection/AboutSection';
import ExperienceSection from '../ExperienceSection/ExperienceSection';
import StatsSection from '../StatsSection/StatsSection';
import FeaturedProjects from '../FeaturedProjects.tsx/FeaturedProjects';
```

Configuración de Swiper:
```tsx
<Swiper
  modules={[Autoplay, Navigation, Pagination, EffectFade]}
  effect="fade"
  autoplay={{ delay: 8000, disableOnInteraction: false, pauseOnMouseEnter: true }}
  navigation
  pagination={{ clickable: true }}
  loop
  className="w-full"
>
  <SwiperSlide><AboutSection /></SwiperSlide>
  <SwiperSlide><ExperienceSection /></SwiperSlide>
  <SwiperSlide><StatsSection /></SwiperSlide>
  <SwiperSlide><FeaturedProjects /></SwiperSlide>
</Swiper>
```

Agregar estilos de personalización en `global.css` para los botones de Swiper:
```css
/* Swiper customization */
.swiper-button-next,
.swiper-button-prev {
  color: var(--accent) !important;
  opacity: 0.6;
  transition: opacity 0.3s;
}
.swiper-button-next:hover,
.swiper-button-prev:hover { opacity: 1; }
.swiper-pagination-bullet-active { background: var(--accent) !important; }
```

---

## FASE 2 — Header: tema, idioma, responsive mejorado

### 2.1 — Redesign completo del Header

**Archivo:** `apps/daev/src/components/Header/Header.tsx`

El nuevo Header tiene:
1. Logo "DÆV" a la izquierda (texto, clickeable → `href="/"`)
2. Nav links en el centro (desktop)
3. Tres controles a la derecha: toggle idioma | toggle tema | terminal button
4. Hamburger en mobile con menú desplegable que se cierra al hacer click en un link

Estructura JSX del nav desktop:
```tsx
<nav className="fixed top-0 left-0 w-screen z-50 h-16 bg-surface/80 backdrop-blur-md border-b border-border transition-all duration-300">
  <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 md:px-8">

    {/* Logo */}
    <a href="/" className="font-display font-bold text-xl text-accent tracking-widest hover:opacity-80 transition">
      DÆV
    </a>

    {/* Nav desktop */}
    <div className="hidden md:flex items-center gap-6">
      {/* Render nav links from translations */}
    </div>

    {/* Controls */}
    <div className="flex items-center gap-3">
      {/* Lang toggle: muestra "ES" o "EN" según idioma activo */}
      <button onClick={langToggle} className="text-xs font-mono font-bold text-muted hover:text-accent transition px-2 py-1 border border-border rounded">
        {t.lang.switch}
      </button>

      {/* Theme toggle: ícono luna/sol */}
      <button onClick={themeToggle} className="text-muted hover:text-accent transition">
        {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
      </button>

      {/* Terminal button */}
      <button onClick={() => onStateChange(true)} className="text-muted hover:text-accent transition">
        <FaTerminal size={18} />
      </button>

      {/* Hamburger (mobile only) */}
      <button className="md:hidden text-fore" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>
    </div>

  </div>

  {/* Mobile dropdown */}
  {isMenuOpen && (
    <div className="md:hidden bg-surface border-t border-border flex flex-col px-6 py-4 gap-4">
      {/* Nav links — al hacer click cierra el menú: onClick={() => setIsMenuOpen(false)} */}
    </div>
  )}
</nav>
```

Los nav links usan `href="#about"` etc. y tienen este estilo:
```tsx
<a href="#about" className="text-sm text-muted hover:text-accent transition font-medium">
  {t.nav.about}
</a>
```

### 2.2 — NavLink activo con IntersectionObserver

Agrega un hook que detecta la sección visible y resalta el link activo:
```tsx
const [activeSection, setActiveSection] = useState('');

useEffect(() => {
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => e.isIntersecting && setActiveSection(e.target.id)),
    { threshold: 0.3 }
  );
  sections.forEach(s => observer.observe(s));
  return () => observer.disconnect();
}, []);
```

Link activo: `text-accent font-semibold` en lugar de `text-muted`.

---

## FASE 3 — Rediseño de secciones

Cada sección usa las variables CSS del tema. Paleta: `bg-surface`, `bg-surface-el`, `text-fore`, `text-muted`, `text-accent`, `border-border`. Fuente de display en headings: `font-display`.

### 3.1 — HeroSection: background image

**Archivo:** `apps/daev/src/components/HeroSection/HeroSection.tsx`

El background animado sigue igual (bwCity.jpg, animated-background). Solo asegurar que el `pt-16` del section que lo contiene esté bien para que no tape el header fixed.

### 3.2 — AboutSection: rediseño completo

**Archivo:** `apps/daev/src/components/AboutSection/AboutSection.tsx`

Usar `useLang()` para textos. Layout:
- Background: `bg-surface/95` con mínimo `calc(100vh - 4rem)`
- Izquierda: foto (ya existe), badges de disponibilidad
- Derecha: nombre + rol + bio + botones CTA

**Foto**: mantener el `<Image src="/daveDad.png" width={400} height={400} />` con filtros CSS hover.

**Badge de disponibilidad**:
```tsx
{siteConfig.available && (
  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 border border-green/30 text-green text-xs font-medium">
    <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
    {t.about.available}
  </span>
)}
```

**Botón "Hire Me" (CTA primario)**: reemplaza CodeButton por un botón real:
```tsx
<a
  href="#contact"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-accent-hover transition-all hover:scale-105 shadow-lg"
>
  {t.hero.cta}
</a>
```

**Botón secundario** (GitHub):
```tsx
<a
  href={siteConfig.links.github}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-fore text-sm font-medium hover:border-accent hover:text-accent transition-all"
>
  <FaGithub /> GitHub
</a>
```

Eliminar `CodeButton` de `AboutSection` — reemplazado por CTA reales.

### 3.3 — ExperienceSection: timeline en lugar de tabla

**Archivo:** `apps/daev/src/components/ExperienceSection/ExperienceSection.tsx`

Leer datos desde `siteConfig.experience`. Usar `useLang()` para textos.

Layout: dos columnas en desktop, una en mobile. Izquierda: texto + CTA. Derecha: timeline vertical.

Timeline item:
```tsx
<div className="relative pl-8 pb-8 border-l-2 border-border last:border-l-0">
  <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-accent border-2 border-bg" />
  <div className="flex items-center gap-3 mb-1">
    <Image src={exp.logo} alt={exp.company} width={28} height={28} className="rounded" />
    <h3 className="font-semibold text-fore">{exp.company}</h3>
    <span className="ml-auto text-xs text-muted font-mono">{exp.period}</span>
  </div>
  <p className="text-sm text-accent font-medium mb-2">{exp.role[lang]}</p>
  <p className="text-sm text-muted">{exp.description[lang]}</p>
</div>
```

Eliminar la tabla hardcodeada. El botón "Contact Me" se convierte en:
```tsx
<a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-bg text-sm font-semibold hover:bg-accent-hover transition-all">
  {t.experience.contact}
</a>
```

### 3.4 — SkillsSection: rediseño con categorías claras

**Archivo:** `apps/daev/src/components/SkillsSection/SkillsSection.tsx`

Leer desde `siteConfig.skills`. Usar `useLang()`.

Cada categoría en una card `bg-surface-el rounded-xl p-6 border border-border`:
- Header de la card: ícono de categoría + título (en el idioma activo)
- Pills con `TechPill` que responde al tema:

**Actualizar TechPill** (`apps/daev/src/components/TechPill/TechPill.tsx`):
```tsx
<span className="bg-accent/10 text-accent border border-accent/20 text-xs font-medium px-3 py-1 rounded-full">
  {tech}
</span>
```

### 3.5 — StatsSection: counters y GitHub stats

**Archivo:** `apps/daev/src/components/StatsSection/StatsSection.tsx`

Leer `siteConfig.stats`. Usar `useLang()`.

Cards de stats:
```tsx
<div className="bg-surface-el rounded-xl p-6 border border-border text-center">
  <p className="text-4xl font-display font-bold text-accent">{siteConfig.stats.years}+</p>
  <p className="text-sm text-muted mt-2">{t.stats.years}</p>
</div>
```

Mantener las `<picture>` de github-readme-stats como están (son SVGs externos que funcionan bien). Agregar `loading="lazy"` a cada `<img>`.

### 3.6 — FeaturedProjects: grid mejorado

**Archivo:** `apps/daev/src/components/FeaturedProjects.tsx/FeaturedProjects.tsx`

Leer desde `siteConfig.featuredProjects`. Usar `useLang()`.

**ProjectCard** (`apps/daev/src/components/Projects/ProjectCard.tsx`) — agregar prop `description` y usar `lang`:
```tsx
<div className="bg-surface-el rounded-xl overflow-hidden border border-border hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
  {/* thumbnail */}
  <div className="relative h-44 overflow-hidden">
    <Image src={project.thumbnail} fill className="object-cover group-hover:scale-105 transition-transform duration-500" alt={project.name} />
    <div className="absolute inset-0 bg-gradient-to-t from-surface-el/80 to-transparent" />
  </div>
  {/* content */}
  <div className="p-4">
    <h3 className="font-semibold text-fore mb-1">{project.name}</h3>
    <p className="text-xs text-muted mb-3 line-clamp-2">{project.description[lang]}</p>
    {/* tech pills */}
    {/* links */}
    <div className="flex gap-2 mt-3">
      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
        className="flex-1 text-center text-xs py-1.5 rounded-md border border-border text-muted hover:text-accent hover:border-accent transition">
        {t.featured.viewRepo}
      </a>
      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
        className="flex-1 text-center text-xs py-1.5 rounded-md bg-accent text-bg font-medium hover:bg-accent-hover transition">
        {t.featured.liveDemo}
      </a>
    </div>
  </div>
</div>
```

### 3.7 — ProjectsSection: fix paginación real

**Archivo:** `apps/daev/src/components/ProjectsSection/ProjectsSection.tsx`

El `totalProjects = 12` es hardcodeado — incorrecto. La paginación debe basarse en el número real de repos.

**Fix:** Mover el estado `repos` a `ProjectsSection` en vez de `CardGrid`. Así `ProjectsSection` conoce el total real:

```tsx
const [repos, setRepos] = useState<Repo[]>([]);
const [loading, setLoading] = useState(true);
const projectsPerPage = 6; // cambiar de 3 a 6 para mostrar más

useEffect(() => {
  fetch('/api/github')
    .then(r => r.json())
    .then((data: Repo[]) => {
      setRepos(data.filter(r => !r.fork)); // filtrar forks
      setLoading(false);
    });
}, []);

const totalPages = Math.ceil(repos.length / projectsPerPage);
const currentProjects = repos.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);
```

Pasar `currentProjects` directamente a `CardGrid` (eliminar fetch de `CardGrid`, recibe repos como prop).

Agregar estado de loading con skeleton:
```tsx
{loading && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="h-48 bg-surface-el rounded-xl animate-pulse border border-border" />
    ))}
  </div>
)}
```

### 3.8 — ContactSection: layout mejorado + IconBar

**Archivo:** `apps/daev/src/components/ContactSection/ContactSection.tsx`

Leer desde `siteConfig`. Usar `useLang()`.

Layout 2 columnas en desktop:
- **Izquierda**: formulario funcional con mailto (ya implementado)
- **Derecha**: info de contacto directo + IconBar

Formulario con estilos del tema:
```tsx
<input className="w-full px-4 py-3 rounded-lg bg-surface-el border border-border text-fore placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50 transition" />
```

Botón de envío (CTA primario):
```tsx
<button type="submit" className="w-full py-3 rounded-lg bg-accent text-bg font-semibold hover:bg-accent-hover transition-all hover:scale-[1.02]">
  {t.contact.send}
</button>
```

Sección de contacto directo (derecha del grid en desktop):
```tsx
<div className="space-y-4">
  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-muted hover:text-accent transition">
    <FaEnvelope className="text-accent" /> {siteConfig.email}
  </a>
  <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer"
    className="flex items-center gap-3 text-muted hover:text-green transition">
    <FaWhatsapp className="text-green" /> WhatsApp
  </a>
  <IconBar />
</div>
```

Eliminar `CodeExample` del ContactSection — no aporta en este contexto.

### 3.9 — IconBar: actualizar con datos de siteConfig

**Archivo:** `apps/daev/src/components/IconBar/IconBar.tsx`

Leer desde `siteConfig.links`. El botón de WhatsApp debe tener el color verde oficial:
```tsx
<a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer"
  className="flex flex-col items-center text-[#25D366] hover:scale-110 transition-transform">
  <FaWhatsapp className="text-2xl" />
  <span className="text-xs mt-1">WhatsApp</span>
</a>
```

El resto de iconos: `text-muted hover:text-accent`.

### 3.10 — WhatsApp Floating Button

**Archivo nuevo:** `apps/daev/src/components/WhatsAppButton/WhatsAppButton.tsx`

```tsx
'use client';
import { FaWhatsapp } from 'react-icons/fa';
import { siteConfig } from '../../config/site';

export default function WhatsAppButton() {
  return (
    <a
      href={siteConfig.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      style={{ backgroundColor: '#25D366' }}
    >
      <FaWhatsapp className="text-white text-2xl" />
    </a>
  );
}
```

Este componente se importa en `layout.tsx` dentro del `<LangProvider>`.

---

## FASE 4 — Blog rediseño completo

### 4.1 — Blog layout

**Archivo:** `apps/daev/src/app/blog/layout.tsx`

Actualizar para usar las variables de tema y las fuentes nuevas. El nav usa los mismos controles de tema/idioma que el Header principal (extraer a un componente `NavControls` compartido o duplicar los botones de tema/idioma).

### 4.2 — Blog page

**Archivo:** `apps/daev/src/app/blog/page.tsx`

```tsx
const BlogPage = () => (
  <>
    <HeroSection />
    <PostProvider>
      {(posts) => (
        <main className="min-h-screen bg-bg pt-8 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <PostGrid posts={posts} />
          </div>
        </main>
      )}
    </PostProvider>
  </>
);
```

### 4.3 — PostGrid: usar traducciones

**Archivo:** `apps/daev/src/components/PostGrid/PostGrid.tsx`

Usar `useLang()` para los textos de búsqueda, sort y "no results". Actualizar los estilos:
```tsx
<SearchBar onSearch={handleSearch} placeholder={t.blog.search} />
<SortDropdown sortOption={sortOption} onSortChange={handleSortChange} labels={{ title: t.blog.sortTitle, date: t.blog.sortDate }} />
```

### 4.4 — PostCard: rediseño con tema

**Archivo:** `apps/daev/src/components/PostCard/PostCard.tsx`

```tsx
<article className="bg-surface-el rounded-xl overflow-hidden border border-border hover:border-accent/40 transition-all hover:-translate-y-1 hover:shadow-xl">
  <div className="relative h-44">
    <Image src={post.frontmatter.image || '/citydraw.png'} fill className="object-cover" alt={post.frontmatter.title} />
  </div>
  <div className="p-5">
    <a href={`/blog/${post.slug}`}>
      <h2 className="font-display font-semibold text-lg text-fore hover:text-accent transition mb-2 line-clamp-2">
        {post.frontmatter.title}
      </h2>
    </a>
    <p className="text-xs text-muted mb-3">{post.frontmatter.date}</p>
    <p className="text-sm text-muted line-clamp-3">{post.frontmatter.excerpt}</p>
    <div className="flex flex-wrap gap-2 mt-4">
      {post.frontmatter.keywords?.map((kw, i) => (
        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">#{kw}</span>
      ))}
    </div>
  </div>
</article>
```

Eliminar la sección "Posts Relacionados" del PostCard — mueve ese contenido al slug page si se necesita.

### 4.5 — Blog slug page: tipografía de artículo

**Archivo:** `apps/daev/src/app/blog/[slug]/page.tsx`

El cuerpo del artículo necesita prose styles. Agregar en `global.css`:
```css
.prose-article {
  color: var(--text);
  line-height: 1.8;
  font-size: 1.05rem;
}
.prose-article h1, .prose-article h2, .prose-article h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  color: var(--text);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}
.prose-article p { margin-bottom: 1.25rem; }
.prose-article a { color: var(--accent); text-decoration: underline; }
.prose-article code {
  background: var(--surface-el);
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9em;
}
.prose-article pre { margin: 1.5rem 0; }
```

Aplicar `className="prose-article"` al div que envuelve `<Markdown>`.

---

## FASE 5 — ConsoleCLI: fix y mejoras

### 5.1 — Eliminar duplicación CSS

El CSS del console está duplicado en `global.css` Y en `ConsoleCLI.style.css`. Eliminar el bloque de console de `global.css` (desde `/* Console Styles */` hasta el final de sus media queries). Dejar solo en `ConsoleCLI.style.css`.

Mantener `.bg-white-01` en `global.css`.

### 5.2 — Fix `pointer-events: visibleStroke`

**Archivo:** `apps/daev/src/views/console/ConsoleCLI.style.css`

```css
/* CAMBIAR esto: */
pointer-events: visibleStroke;
/* POR esto: */
pointer-events: none;
```

Mismo fix en `global.css` si quedara alguna referencia.

### 5.3 — Fix console-output layout

El `.console-output { display: flex; }` hace que las líneas se pongan en fila horizontal en lugar de columna. Cambiar a:
```css
.console-output {
  display: flex;
  flex-direction: column;
}
```

### 5.4 — Actualizar comandos con idioma activo

**Archivo:** `apps/daev/src/views/console/ConsoleCLI.tsx`

Pasar `lang` desde el contexto para que los comandos `about`, `skills`, `projects`, `contact` respondan en el idioma activo del sitio:

```tsx
const { lang } = useLang();
```

Los outputs de `about` y `skills` deben usar `siteConfig` en lugar de strings hardcodeados:
```tsx
case 'about':
  setHistory(prev => [
    ...prev,
    `${siteConfig.name} — ${siteConfig.role[lang]}`,
    siteConfig.bio[lang],
    `📍 ${siteConfig.location}`,
  ]);
  break;
```

### 5.5 — Hint en mobile

En mobile el teclado virtual no aparece solo. Agregar un botón visible en mobile:
```tsx
{/* Mobile keyboard hint */}
<div className="md:hidden absolute bottom-4 right-4 text-xs text-green/50">
  tap to type ↓
</div>
```

Y agregar `onClick` al div principal del console para hacer focus:
```tsx
<div className="console" onClick={() => inputRef.current?.focus()} onKeyDown={handleKeyDown} tabIndex={0}>
```

Usar un `<input ref={inputRef} />` invisible (`opacity-0 absolute pointer-events-none`) para capturar el teclado virtual en iOS/Android.

---

## FASE 6 — not-found.tsx: actualizar con tema

**Archivo:** `apps/daev/src/app/not-found.tsx`

Usar las variables de tema. El CodeBlock de prism con `goHomeCode` está bien — mantenerlo, es un touch divertido. Agregar `useLang()` para el texto "Page not found" y "Go home".

Actualizar fondo:
```tsx
<div className="relative min-h-screen bg-bg flex flex-col justify-center items-center text-fore">
```

---

## FASE 7 — Performance y limpieza final

### 7.1 — Verificar que `react-slick` no se importe en ningún archivo

```bash
grep -r "react-slick\|slick-carousel" apps/daev/src/
```

Si aparece algún import, eliminarlo.

### 7.2 — Limpiar import duplicados de Google Fonts

Asegurarse de que `@import url('https://fonts.googleapis.com')` solo esté en `layout.tsx` (via `<link>`) y NO en ningún archivo CSS.

### 7.3 — Agregar `loading="lazy"` a imágenes de stats

**Archivo:** `apps/daev/src/components/StatsSection/StatsSection.tsx`
```tsx
<img src="..." alt="..." className="w-full max-w-sm" loading="lazy" />
```

### 7.4 — `next.config.js`: activar compresión de imágenes para assets locales

No se necesitan cambios si `sharp` ya está instalado (lo está). Verificar que el build no dé warnings de imagen.

### 7.5 — Posts/Posts.tsx: verificar que fue borrado

Si sigue existiendo `apps/daev/src/components/Posts/Posts.tsx`, borrarlo ahora.

---

## FASE 8 — Build, revisión visual y deploy

### 8.1 — Build limpio

```bash
npx nx build daev
```

Sin errores TypeScript. Los warnings de `metadataBase` deben estar resueltos (se hizo en la sesión anterior).

### 8.2 — Dev server y checklist visual

```bash
npx nx dev daev
```

Revisar en `localhost:4200`:

**Home — Dark mode:**
- [ ] Fondo animado visible (bwCity.jpg, pan)
- [ ] Header: logo DÆV, nav links, toggle idioma, toggle tema, terminal button
- [ ] Carousel: 4 slides con Swiper, fade correcto, autoplay, flechas y paginación
- [ ] AboutSection: foto, badge disponible, botón "Hire Me" scrollea a #contact
- [ ] ExperienceSection: timeline con logos de empresas, no tabla
- [ ] StatsSection: cards con contadores reales, GitHub stats lazy-loaded
- [ ] FeaturedProjects: 6 cards con thumbnails, botones Repo y Demo funcionales
- [ ] SkillsSection: 3 categorías, pills con tema
- [ ] ProjectsSection: carga repos de GitHub, skeleton mientras carga, paginación real
- [ ] ContactSection: formulario con tema, IconBar, enlace de email y WhatsApp directo
- [ ] Footer: visible al bajar, link a GitHub
- [ ] WhatsApp FAB: visible en esquina inferior derecha, color #25D366

**Home — Light mode (toggle):**
- [ ] Todos los fondos, textos y bordes cambian al tema claro
- [ ] El toggle persiste en localStorage al recargar

**Cambio de idioma (toggle EN/ES):**
- [ ] Todos los textos de la UI cambian
- [ ] La bio, roles y tipos de proyecto aparecen en español
- [ ] Los botones de CTA cambian de texto

**Mobile (≤768px):**
- [ ] Hamburger abre/cierra menú
- [ ] Carousel muestra dots en lugar de flechas
- [ ] WhatsApp FAB sigue visible
- [ ] ContactSection: columna única
- [ ] ProjectsSection: columna única
- [ ] ExperienceSection: timeline en columna única

**Terminal (ConsoleCLI):**
- [ ] Botón de terminal en el header activa la vista CLI
- [ ] Líneas de log aparecen correctamente en columna (no en fila)
- [ ] Comandos `help`, `about`, `skills`, `projects`, `contact`, `gui`, `clear` funcionan
- [ ] `gui` regresa a la vista Home
- [ ] Mobile: tap activa teclado virtual

**Blog (/blog):**
- [ ] Nav del blog tiene controles de tema e idioma
- [ ] Cards de posts con imágenes
- [ ] Búsqueda y sort funcionan
- [ ] Post individual: tipografía de artículo legible en ambos temas

**404:**
- [ ] CodeBlock visible, link a home funciona

### 8.3 — Git commit y push

```bash
git add -A
git commit -m "feat: redesign v2 — dark/light theme, EN/ES i18n, Swiper, CTA buttons, WhatsApp FAB, site config"
git push origin main
```

### 8.4 — Vercel deploy

Push a `main` dispara el auto-deploy. Verificar en el dashboard de Vercel que el build pase.

---

## Notas finales para Opus

1. **No agregar nuevas dependencias npm** salvo que sea absolutamente imposible sin ellas. Todo lo necesario ya está instalado: Swiper, react-icons, prism-react-renderer.
2. **Orden estricto**: Fase 0 completa antes de tocar cualquier componente. Los contextos deben existir antes de que los componentes los usen.
3. **Build check** después de cada fase. Si TypeScript da error, resolverlo antes de continuar.
4. **No borrar** `ConsoleCLI.style.css` — solo el bloque de console en `global.css`.
5. **El archivo `site.ts`** es la única fuente de verdad para datos de Dave. Nunca hardcodear strings de datos personales en los componentes.
6. **Las clases de Tailwind** deben usar los nombres de los custom colors definidos en `tailwind.config.js` (`bg-surface`, `text-fore`, `text-accent`, etc.) — no los colores hardcodeados de Tailwind (`bg-gray-900`, etc.) en componentes nuevos. Los componentes existentes se pueden migrar progresivamente.
7. **El `<html>` necesita `suppressHydrationWarning`** por el ThemeProvider — sin esto Next.js lanza hydration mismatch en producción.
8. **Swiper CSS imports**: deben ir en el componente Carousel, no en global.css, para que el tree-shaking funcione correctamente.
