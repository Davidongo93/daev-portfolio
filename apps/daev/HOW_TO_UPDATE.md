# Cómo actualizar tu sitio

Todo está centralizado para que actualices datos en **un solo archivo** (o agregues blog posts con un comando).

---

## 📇 Actualizar info personal, contacto, experiencia, proyectos

Edita un solo archivo:

```
apps/daev/src/config/site.ts
```

Allí encuentras (todo bilingüe EN/ES):

| Sección              | Qué cambias                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `name`, `alias`, `role` | Tu nombre y título profesional                                                            |
| `bio`, `shortBio`    | Tu descripción en EN y ES (aparece en hero y meta tags)                                     |
| `location`           | Tu ubicación (con bandera emoji aparte en `locationFlag`)                                   |
| `available`          | `true` muestra badge verde "disponible para trabajar"; `false` lo oculta                    |
| `email`, `phone`, `whatsapp` | Datos de contacto. WhatsApp usa el formato `https://wa.me/+57...`                  |
| `links.*`            | URLs de GitHub, LinkedIn, X, Instagram, Discord                                             |
| `stats`              | Años de experiencia, proyectos completados, clientes — se ven como números grandes          |
| `experience[]`       | Cada item es una empresa con `role`, `period`, `description` (EN/ES) y `logo`               |
| `skills.*`           | Frontend / Backend / Tools — listas de strings                                              |
| `featuredProjects[]` | Cada proyecto destacado: nombre, descripción EN/ES, repo, demo, tecnologías, type, thumbnail|
| `seo.keywords`       | Palabras clave para SEO/SEM                                                                 |

**Ejemplo: cambiar disponibilidad**

```ts
// site.ts
available: false,  // pasa a true cuando quieras mostrar el badge
```

**Ejemplo: agregar nueva experiencia**

```ts
experience: [
  // ...
  {
    company: 'Nueva Empresa',
    role: { en: 'Lead Developer', es: 'Desarrollador Principal' },
    period: '2026 – Present',
    description: {
      en: 'Description in English.',
      es: 'Descripción en español.',
    },
    logo: '/icons/nueva-empresa.png',
    website: 'https://example.com',
  },
],
```

**Ejemplo: agregar proyecto destacado**

```ts
featuredProjects: [
  // ...
  {
    name: 'Nombre del Proyecto',
    description: { en: '...', es: '...' },
    repoUrl: 'https://github.com/Davidongo93/repo',
    liveUrl: 'https://demo.example.com',
    technologies: ['Next.js', 'TypeScript'],
    type: { en: 'Freelance', es: 'Freelance' },
    collaboration: null,
    thumbnail: '/thumbnails/mi-proyecto.png',
    featured: true,
  },
],
```

Para el thumbnail, sube la imagen a `apps/daev/public/thumbnails/` (formato recomendado: 800x600 .png o .jpg).

---

## ✍️ Agregar un post al blog

### Opción 1 — con el script (recomendado)

```bash
node apps/daev/scripts/new-post.js "El título de mi post"
```

Esto crea `apps/daev/posts/el-titulo-de-mi-post.md` con el frontmatter completo. Solo te queda editar el contenido.

### Opción 2 — manualmente

1. Copia `apps/daev/posts/_template.md` a un nuevo archivo:
   ```bash
   cp apps/daev/posts/_template.md apps/daev/posts/mi-nuevo-post.md
   ```
2. Edita el frontmatter (las primeras líneas entre `---`):
   ```yaml
   ---
   title: "Tu título"
   date: "2026-05-20"
   description: "Descripción para SEO (155-160 chars)"
   excerpt: "Resumen que aparece en la card del blog"
   image: "/citydraw.png"          # o sube tu propia imagen a public/
   keywords: ["tag1", "tag2"]
   ---
   ```
3. Escribe el contenido del post en markdown debajo del frontmatter.

### Estructura del frontmatter

| Campo         | Obligatorio | Para qué sirve                                                          |
| ------------- | ----------- | ----------------------------------------------------------------------- |
| `title`       | ✓           | Título del post (aparece en h1, meta, OG)                               |
| `date`        | ✓           | Fecha de publicación (formato YYYY-MM-DD, ordena posts y muestra)       |
| `description` |             | Meta description para Google                                            |
| `excerpt`     |             | Resumen mostrado en la card del blog                                    |
| `image`       |             | Path desde `/public/`, ej: `/citydraw.png`. Si no se da, usa default    |
| `keywords`    |             | Array de tags. Se muestran como #tags y se usan en SEO                  |

**Archivos con `_` al inicio se ignoran** (útil para `_template.md` y drafts: `_draft-mi-idea.md`).

---

## 🎨 Cambiar tema (colores)

Edita las CSS variables en `apps/daev/src/app/global.css`:

```css
:root {
  /* Light theme */
  --accent: #0369a1;   /* color principal en modo claro */
  --green: #16a34a;    /* color verde (WhatsApp, success) */
  /* ... */
}

.dark {
  /* Dark theme */
  --accent: #00e5ff;   /* color principal en modo oscuro */
  /* ... */
}
```

Todos los componentes ya usan estas variables (`bg-accent`, `text-accent`, etc.), así que con cambiar aquí se actualiza todo el sitio.

---

## 🌍 Agregar/cambiar traducciones

Las traducciones de la UI están en `apps/daev/src/context/LangContext.tsx`. La estructura es:

```ts
translations = {
  en: {
    nav: { about: 'About', ... },
    hero: { greeting: 'Hi, I\'m Dave', ... },
    // ...
  },
  es: {
    nav: { about: 'Sobre mí', ... },
    hero: { greeting: 'Hola, soy Dave', ... },
    // ...
  },
}
```

Si agregas una clave nueva en EN, debes agregarla también en ES (TypeScript te avisará).

---

## 🚀 Deploy

Cualquier push a `main` dispara el deploy automático en Vercel. Para validar localmente antes:

```bash
npx nx build daev   # build de producción
npx nx dev daev     # dev server en localhost
```

---

## 📁 Imágenes y assets

- **Foto de perfil**: `apps/daev/public/daveDad.png` (se usa en hero)
- **Background**: `apps/daev/public/bwCity.jpg` (animated background)
- **Logo OG/Twitter**: `apps/daev/public/profileDave.png` (1200x630 recomendado)
- **Thumbnails proyectos**: `apps/daev/public/thumbnails/`
- **Logos empresas**: `apps/daev/public/icons/`
- **Imágenes blog**: cualquier lugar dentro de `apps/daev/public/`, referenciar con path absoluto en el frontmatter del post

---

## 🔍 SEO/SEM/GEO

El sitio ya incluye automáticamente:

- **Meta tags** completos (title, description, OG, Twitter)
- **JSON-LD** (Person, WebSite, ProfessionalService, BlogPosting)
- **Sitemap** dinámico en `/sitemap.xml`
- **Robots** en `/robots.txt`
- **RSS** en `/rss.xml`
- **PWA manifest** en `/manifest.webmanifest`
- **Geo tags** (`geo.region: CO`, `geo.placename`, `geo.position`, `ICBM`)
- **hreflang** (en-US, es-CO)
- **Multi-locale OpenGraph** (`en_US`, `es_CO`, `es_ES`, `es_MX`)

Para mejorar SEO/SEM:
1. Edita `siteConfig.seo.keywords` en `site.ts` con palabras clave que quieras posicionar
2. Usa los `keywords` en el frontmatter de cada blog post
3. Agrega más posts (Google ama contenido fresco)
4. Para Google Search Console, agrega tu código en `metadata.verification.google` en `layout.tsx`
