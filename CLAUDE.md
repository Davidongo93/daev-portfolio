# CLAUDE.md — Plan de trabajo: daev-portfolio

> **Para Opus:** Este documento es tu guía de trabajo completa. Ejecuta cada sección en orden, marcando tareas conforme las completes. El objetivo final es tener el portafolio 100% funcional, con datos reales, sin errores de compilación, y listo para desplegar en Vercel.

---

## Contexto del proyecto

- **Stack:** NX 19.6 monorepo · Next.js 14 (App Router) · Tailwind CSS 3.4 · TypeScript 5.5
- **App principal:** `apps/daev/`
- **Deploy:** Vercel (`npx nx build daev` → output en `dist/apps/daev`)
- **Dev server:** `npx nx dev daev`
- **Propietario:** David Orlando Miranda Roa — Full Stack Developer, ~4 años de experiencia real
- **Idioma de la UI:** Inglés (la UI está en inglés, no cambiar)

---

## FASE 1 — Corrección de bugs críticos

### 1.1 Deprecated Next.js Image API

Los siguientes componentes usan la API antigua de `next/image` (`layout`, `objectFit` como props directas). En Next.js 13+ estos son reemplazados por props nativas de CSS.

**Archivo:** `apps/daev/src/components/AboutSection/AboutSection.tsx`
- Eliminar `layout="responsive"` 
- Reemplazar por `width={400} height={400}` y `className="object-cover w-full h-auto"`

**Archivo:** `apps/daev/src/components/Projects/ProjectCard.tsx`
- Eliminar `layout="fill"` y `objectFit="cover"` como props
- El contenedor padre ya tiene `relative w-full h-48` — agregar `fill` sin el prop `layout`, y mover `objectFit` a `className="object-cover"`

**Archivo:** `apps/daev/src/components/PostCard/PostCard.tsx`
- El `Image` tiene `width={100} height={100}` pero `className="w-full h-full"` — esto hace que la imagen se vea minúscula o distorsionada
- Reemplazar por un contenedor `relative h-48` con `Image fill className="object-cover"`

### 1.2 Artifact residual en IconButton

**Archivo:** `apps/daev/src/components/IconButton/IconButton.tsx` (línea ~32)
```tsx
<span className="absolute left-0 -bottom-1 w-full h-0.5 bg-green-300 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100">hello</span>
```
- Eliminar el texto `hello` que aparece como contenido visible del span. Debe quedar el span vacío (solo el underline de animación), o eliminarlo si no se usa `group` en el padre.

### 1.3 Path de imágenes — case sensitivity

**Archivo:** `apps/daev/posts/energia-vital.md` y `apps/daev/posts/salados-o-empeliculados.md`
- Ambos posts referencian `image: "/cityDraw.png"` pero el archivo real es `/citydraw.png` (minúscula)
- Verificar nombre exacto en `apps/daev/public/` y corregir en los frontmatter de ambos posts

**Archivo:** `apps/daev/src/components/PostCard/PostCard.tsx`
- El fallback `'/default-image.jpg'` no existe en `public/`. Cambiar por una imagen que sí exista (ej: `/citydraw.png`) o crear un placeholder apropiado.

### 1.4 Imagen de thumbnail en FeaturedProjects

**Archivo:** `apps/daev/src/components/FeaturedProjects.tsx/FeaturedProjects.tsx`
- El proyecto "Interactive Population and Roads Ukraine" usa `thumbnail:"/ukraine.png"` 
- Pero `ProjectCard` construye la ruta como `/thumbnails${project.thumbnail}` → resulta en `/thumbnails/ukraine.png`
- El archivo existe en `public/thumbnails/ukraine.png` ✓ — verificar que coincida exactamente
- Los proyectos placeholder (Project A, B, C) usan `thumbnail:"/daveDad.png"` → ruta `/thumbnails/daveDad.png` que NO existe
- Actualizar thumbnails de proyectos reales (ver Fase 2)

### 1.5 Posts duplicados

En `apps/daev/posts/` existen:
- `energia-vital.md` + `energia-vitaly.md` (duplicado con sufijo 'y')
- `salados-o-empeliculados.md` + `salados-o-empeliculadosy.md` (duplicado con sufijo 'y')

**Acción:** Eliminar los archivos con sufijo 'y': `energia-vitaly.md` y `salados-o-empeliculadosy.md`

### 1.6 Path de posts en producción (Vercel)

**Archivos:** `apps/daev/src/components/PostProvider/PostProvider.tsx` y `apps/daev/src/app/blog/[slug]/page.tsx`

Ambos usan `path.join('posts')` relativo a `process.cwd()`. En Vercel esto puede fallar porque el directorio de trabajo no siempre apunta a la raíz del proyecto NX.

**Fix:** Cambiar a path absoluto usando `__dirname` o `process.cwd()` con la ruta correcta. En un proyecto NX, el `cwd` en build time es la raíz del workspace, así que verificar si `path.join(process.cwd(), 'apps/daev/posts')` funciona, o mejor usar:
```ts
import path from 'path';
const postsDirectory = path.join(process.cwd(), 'apps/daev/posts');
```
Actualizar ambos archivos para usar esta ruta consistente. Verificar que el build de Vercel incluya el directorio `posts/` (puede requerir configuración en `next.config.js`).

### 1.7 ContactSection — formulario sin funcionalidad

**Archivo:** `apps/daev/src/components/ContactSection/ContactSection.tsx`

El formulario tiene inputs pero ningún `onSubmit` handler. Al hacer click en "Send" no ocurre nada útil.

**Opciones (elegir la más simple):**
- Opción A: Integrar `mailto:` en el action del form: `<form action="mailto:domirandar@gmail.com" method="POST" encType="text/plain">`
- Opción B: Agregar un handler que haga fetch a un endpoint (crear `/api/contact/route.ts`)
- **Recomendación:** Opción A por simplicidad. Si se prefiere Opción B, crear el endpoint en `apps/daev/src/app/api/contact/route.ts` usando Resend o similar.

### 1.8 SearchBar del Header sin funcionalidad real

**Archivo:** `apps/daev/src/views/Home/Home.tsx` → Header recibe `<SearchBar onSearch={console.log}/>`

La búsqueda en el header simplemente loguea en consola. Como es un portfolio single-page con scroll, la búsqueda del header debería:
- Opción simple: Quitar el SearchBar del Header y dejarlo solo en el Blog
- Opción compleja: Implementar búsqueda de secciones
- **Recomendación:** Remover SearchBar del Header por ahora para evitar confusión al usuario.

**Archivo:** `apps/daev/src/components/Header/Header.tsx` — remover `<div className='w-80 mx-8 flex items-center justify-end'><SearchBar onSearch={console.log}/></div>` y el import de SearchBar. También remover el import de `Fa0` de `react-icons/fa6` que no se usa.

---

## FASE 2 — Actualización de datos reales

### 2.1 StatsSection — datos incorrectos

**Archivo:** `apps/daev/src/components/StatsSection/StatsSection.tsx`

Datos actuales incorrectos:
- "15+ Years Industry Experience" → **Cambiar a "4+ Years"** (Dave empezó en 2021-2022)
- "6+ Projects Completed" → Verificar número real basado en GitHub/FeaturedProjects
- "5+ Clients Worldwide" → Verificar y actualizar

### 2.2 SkillsSection — actualizar skills

**Archivo:** `apps/daev/src/components/SkillsSection/SkillsSection.tsx`

Skills actuales incompletos. Actualizar con el stack real de Dave:
```ts
const skillsData = {
  frontend: ['React', 'Next.js', 'Vue', 'Tailwind CSS', 'TypeScript', 'HTML', 'CSS'],
  backend: ['Node.js', 'NestJS', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs'],
  tools: ['Git', 'Docker', 'NX', 'Redux', 'Webpack', 'Vercel', 'Jest'],
};
```
Ajustar según las tecnologías reales que Dave domina.

### 2.3 CodeExample / descriptionEmployee — actualizar datos

**Archivo:** `apps/daev/src/components/CodeExample/descriptionEmployee.js`

Actualizar años y proyectos:
```js
years: 4,
companiesWorkedWith: 3,  // AppTender, Invicto, Rescatista
projectsCompleted: 6,    // Ajustar al número real
```
También actualizar el array de tecnologías para que coincida con SkillsSection.

### 2.4 FeaturedProjects — reemplazar proyectos placeholder

**Archivo:** `apps/daev/src/components/FeaturedProjects.tsx/FeaturedProjects.tsx`

Los proyectos "Project A", "Project B", "Project C" son placeholders con URLs falsas. Reemplazar con proyectos reales de Dave. Proyectos conocidos:
1. **Interactive Population and Roads Ukraine** — ya tiene datos reales ✓
2. **Rescuer branding and gallery page** — ya tiene datos reales ✓
3. Eliminar o reemplazar los 4 proyectos placeholder restantes con proyectos reales del GitHub de Dave (Davidongo93)

Proyectos sugeridos para investigar en `https://api.github.com/users/Davidongo93/repos`:
- Buscar repos con más stars, forks, o descripción relevante
- Agregar thumbnails apropiados en `apps/daev/public/thumbnails/`

### 2.5 projectData.ts — datos dummy

**Archivo:** `apps/daev/src/components/Projects/projectData.ts`

Este archivo tiene "Project A/B/C" con URLs falsas. Aunque parece no estar siendo usado (ProjectsGrid hace fetch a la API de GitHub), actualizar o eliminar si es código muerto.

### 2.6 ExperienceSection — mantener actualizado

**Archivo:** `apps/daev/src/components/ExperienceSection/ExperienceSection.tsx`

La tabla de experiencia está hardcodeada y relativamente correcta. Verificar:
- Que los logos en `public/icons/` coincidan: `appTender.svg`, `invicto.png`, `rescatista.png` ✓
- Si hay nuevas experiencias o proyectos freelance recientes, agregarlos

### 2.7 Blog posts — contenido real

Los posts actuales son de prueba/contenido genérico (energía vital, maldiciones históricas). Sugerencia:
- Agregar al menos 2-3 posts técnicos relevantes al perfil de Dave (tutoriales, reflexiones dev)
- Asegurarse de que todos los posts tengan `image` apuntando a archivos que existen en `/public/`

---

## FASE 3 — Mejoras de calidad y UX

### 3.1 Blog page — falta navbar/header

**Archivo:** `apps/daev/src/app/blog/page.tsx`

La página de blog no tiene Header con navegación. Solo tiene HeroSection (background) y PostGrid. El usuario no puede navegar de vuelta al home fácilmente excepto por el botón 🏠 en PostGrid.

**Fix:** Agregar el Header al BlogPage, o crear un `BlogLayout` en `apps/daev/src/app/blog/layout.tsx` que incluya un Header simplificado sin el TerminalButton.

### 3.2 Blog post individual — falta navbar

**Archivo:** `apps/daev/src/app/blog/[slug]/page.tsx`

Similar al punto anterior — el post individual tampoco tiene Header de navegación.

### 3.3 Metadata SEO por página

**Archivo:** `apps/daev/src/app/layout.tsx`

La metadata es genérica: `title: 'Dave Miranda', description: 'Full Stack Developer'`. Mejorar:
```tsx
export const metadata = {
  title: 'Dave Miranda | Full Stack Developer',
  description: 'Portfolio of David Orlando Miranda — Full Stack Developer specializing in React, Next.js, Node.js and TypeScript.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Colombia'],
  openGraph: {
    title: 'Dave Miranda | Full Stack Developer',
    description: 'Full Stack Developer portfolio — React, Next.js, Node.js',
    images: ['/profileDave.png'],
  },
};
```

Agregar metadata específica para la ruta `/blog` y cada post (usando `generateMetadata` en el slug page).

### 3.4 Next.js config — dominio de imágenes externas

**Archivo:** `apps/daev/next.config.js`

Si se usan imágenes externas (como los stats de github-readme-stats.vercel.app en StatsSection), Next.js puede bloquear optimización de imágenes. Como son etiquetas `<img>` normales no hay problema actual, pero si se migran a `<Image>`, hay que agregar los dominios a la config.

### 3.5 Footer link desactualizado

**Archivo:** `apps/daev/src/components/Footer/Footer.tsx`

El footer linkea a `https://davidongo93.github.io/` — verificar si ese GitHub Pages sigue activo. Si el portfolio principal es este Vercel deployment, actualizar el link o removerlo.

### 3.6 ConsoleCLI — mejorar comandos disponibles

**Archivo:** `apps/daev/src/views/console/ConsoleCLI.tsx`

Los comandos disponibles son solo `help`, `clear`, `gui`. Agregar al menos:
- `about` — mostrar info básica de Dave
- `skills` — listar tecnologías
- `contact` — mostrar email/links
- `projects` — listar los featured projects con URLs

### 3.7 Eliminar import no usado en Header

**Archivo:** `apps/daev/src/components/Header/Header.tsx`
- Eliminar `import { Fa0 } from 'react-icons/fa6';` (importado pero nunca usado)

---

## FASE 4 — Build y despliegue

### 4.1 Verificar build sin errores

```bash
npx nx build daev
```

Resolver todos los errores de TypeScript y warnings de Next.js antes de continuar.

### 4.2 Verificar con lint

```bash
npx nx lint daev
```

### 4.3 Correr dev server y revisar manualmente

```bash
npx nx dev daev
```

Revisar en el navegador:
- [ ] Home page carga correctamente
- [ ] Carousel funciona (About, Experience, Stats, FeaturedProjects)
- [ ] SkillsSection muestra skills correctos
- [ ] ProjectsSection carga repos de GitHub
- [ ] ContactSection — el formulario tiene feedback al usuario
- [ ] Footer visible al scroll hasta el final
- [ ] Toggle CLI mode funciona
- [ ] ConsoleCLI responde a comandos
- [ ] Blog `/blog` carga con posts
- [ ] Post individual `/blog/[slug]` renderiza correctamente
- [ ] Responsive en mobile (hamburger menu funciona)

### 4.4 Git commit y push

```bash
git add -p  # Revisar cambios uno por uno
git commit -m "fix: repair portfolio — real data, deprecated API fixes, build ready"
git push origin main
```

### 4.5 Vercel deploy

Si el proyecto está conectado a Vercel con auto-deploy en push a main, el deploy ocurrirá automáticamente.

Si se requiere deploy manual:
```bash
npx vercel --prod
```

---

## Notas importantes para Opus

1. **No cambiar el idioma de la UI** — está en inglés y debe permanecer en inglés.
2. **No agregar features no pedidas** — seguir estrictamente este plan.
3. **No agregar comentarios al código** salvo que sean absolutamente necesarios para explicar algo no obvio.
4. **Verificar el build** después de cada fase antes de continuar.
5. **Los posts de blog** en `apps/daev/posts/` son relativos al `cwd` de Next.js — en Vercel el `cwd` es la raíz del workspace NX (`/home/dave/Documents/daev-portfolio`), por lo que `path.join(process.cwd(), 'apps/daev/posts')` debería funcionar.
6. **GitHub API** — la ruta `/api/github` hace fetch público sin token. Si se alcanzan los rate limits de GitHub (60 req/hora sin auth), considerar agregar `GITHUB_TOKEN` como variable de entorno en Vercel.
7. **Prioridad:** Fase 1 (bugs críticos) → Fase 2 (datos reales) → Fase 3 (mejoras) → Fase 4 (deploy). No avanzar a la siguiente fase sin completar la anterior.

---

## Archivos clave de referencia

| Archivo | Propósito |
|---------|-----------|
| `apps/daev/src/app/layout.tsx` | Root layout, metadata global |
| `apps/daev/src/app/page.tsx` | Entry point — switch GUI/CLI |
| `apps/daev/src/views/Home/Home.tsx` | Vista principal GUI |
| `apps/daev/src/views/console/ConsoleCLI.tsx` | Vista CLI/terminal |
| `apps/daev/src/components/Carousel.tsx/Carousel.tsx` | Carousel con About/Experience/Stats/FeaturedProjects |
| `apps/daev/src/components/AboutSection/AboutSection.tsx` | Slide 1 del carousel |
| `apps/daev/src/components/ExperienceSection/ExperienceSection.tsx` | Slide 2 |
| `apps/daev/src/components/StatsSection/StatsSection.tsx` | Slide 3 — datos a corregir |
| `apps/daev/src/components/FeaturedProjects.tsx/FeaturedProjects.tsx` | Slide 4 — proyectos a actualizar |
| `apps/daev/src/components/ProjectsGrid/ProjectsGrid.tsx` | Grid de repos de GitHub |
| `apps/daev/src/components/PostProvider/PostProvider.tsx` | Server component — lee posts .md |
| `apps/daev/src/app/blog/[slug]/page.tsx` | Página de post individual |
| `apps/daev/src/app/api/github/route.ts` | API route — fetch repos GitHub |
| `apps/daev/posts/` | Directorio de markdown posts |
| `apps/daev/public/` | Assets estáticos |
| `apps/daev/next.config.js` | Config de Next.js |
