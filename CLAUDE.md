# CLAUDE.md — daev-portfolio

Portafolio personal de Dave (Daev). Next.js 14 (App Router) dentro de un
workspace Nx. Producción: <https://daev.space>.

Este archivo es el contrato del repo. Sobrevive al cierre de cualquier sesión;
la memoria del agente no. **Todo acuerdo que deba persistir se escribe acá, no
en memoria.**

---

## Contrato de interacción

Reglas de operación, acordadas el 18-09-2026. Tienen prioridad sobre cualquier
default de estilo.

- **Sin lenguaje social.** Nada de validar, adular, disculparse en exceso ni
  darle la razón a un razonamiento por cortesía. Dar la razón no mejora el
  resultado.
- **Sin sarcasmo ni humor.** El idioma es el transporte, no el producto.
- **Español neutro, impersonal.** Nada de voseo ni modismos argentinos
  (`tenés`, `querés`, `decime`). Dave vive en Colombia.
- **Orden ambigua = se marca antes de ejecutar.** Si un pedido admite dos
  lecturas que producen trabajo distinto, se dice cuál es la ambigüedad y se
  pide la definición. No se asume en silencio y no se entrega algo a medias.
- **Reportar el resultado como es.** Si un test falla, se muestra la salida. Si
  un paso se omitió, se dice. Sin suavizar.

### Cómo se formula una orden ejecutable

Una orden es ejecutable cuando trae estos cuatro campos. Si falta alguno, el
agente lo pide antes de escribir código.

| Campo | Pregunta que responde | Ejemplo |
|---|---|---|
| **Objetivo** | qué debe ser verdad al terminar | "el home muestra los posts recientes" |
| **Alcance** | qué archivos o rutas entran, y cuáles no | "solo `/`, no tocar `/blog`" |
| **Restricción** | qué no se puede romper | "sin dependencias nuevas" |
| **Verificación** | cómo se comprueba que quedó | "`npx nx build daev` limpio + captura" |

Órdenes como "mejora el home" no son ejecutables: no traen criterio de
aceptación. La respuesta correcta a una orden así es pedir el criterio, no
inventarlo.

---

## Stack y comandos

```bash
npx nx dev daev          # dev server (localhost:3000)
npx nx build daev        # build de producción
npx nx lint daev         # eslint
npx nx test daev         # jest
```

**Regla de recursos (WSL2):** antes de lanzar un dev server, verificar que no
haya otro corriendo (`pgrep -af "next dev"`) y mirar `free -h`. Todo proceso en
background se lanza capturando el PID y se mata al cerrar la tarea.

---

## Arquitectura — hechos que no se deducen leyendo el árbol

- **`apps/daev/src/config/site.ts` es la única fuente de verdad** de los datos
  personales, casos, servicios, precios y FAQ. Nunca hardcodear esos datos en un
  componente.
- **i18n por rutas:** el español vive en la raíz (`app/(es)/`), el inglés bajo
  `/en` (`app/(en)/`). `lib/i18n.ts` resuelve canonical, hreflang y la ruta
  contraparte. El blog es solo español; un visitante en inglés que pide su
  contraparte cae en `/en`.
- **Los textos de UI viven en `context/LangContext.tsx`**, no en los
  componentes. El contenido bilingüe de datos vive en `site.ts` como
  `{ en, es }`.
- **`lib/posts.ts` toca el filesystem y es server-only.** La vista `Home` es
  cliente, así que los posts se leen en el `page.tsx` (servidor) y bajan como
  props vía `lib/homePosts.ts`.
- **El JSON-LD raíz se arma en `lib/seo.ts`** (`rootJsonLd`): Person, WebSite,
  ProfessionalService, ItemList del trabajo y FAQPage. Un caso cuyo dominio no
  resuelve se lista sin `url`.
- **Estructura del home (`views/Home/Home.tsx`):** hero → clientes → casos →
  servicios → proceso → blog → lab → sobre mí → FAQ → contacto. El orden es
  deliberado: el home vende resultados, no habilidades.

---

## Deploy

**`git push origin main` → Vercel.** El repo tiene dos remotos:

| Remoto | Destino | Despliega |
|---|---|---|
| `origin` | GitLab (`gitlab.com/Davidongo93/daev-portfolio`) | **sí** |
| `github` | GitHub (`github.com/Davidongo93/daev-portfolio`) | no, es espejo |

`.gitlab-ci.yml` solo corre lint + test + build. El despliegue lo hace la
integración de Vercel conectada al repo de GitLab. El DNS de `daev.space` pasa
por Cloudflare, pero el origen es Vercel.

Nunca filtrar la salida de `git remote -v` al decidir a dónde pushear.

---

## Publicar un post — flujo obligatorio

Dave escribe casi todos los posts por medio de Claude Code. **La indexación es
parte de publicar, no un paso aparte que él tenga que pedir.** Al terminar un
post, se ejecuta esta secuencia completa sin preguntar:

1. Crear el post con `npm run new-post -- "Título"` (genera desde
   `posts/_template.md`; no escribir el frontmatter a mano).
2. Llenar `description`, `excerpt`, `image`, `keywords` y **`topics`**. Los
   temas válidos están en `apps/daev/src/config/topics.ts`. Un post sin
   `topics` queda fuera de los clústers y sin enlaces internos.
3. `npx nx build daev` — debe pasar limpio.
4. Commit.
5. **`git push origin main`** — único remoto que dispara el deploy.
6. **`npm run indexnow -- --latest --wait`** — espera a que la URL esté viva y
   la envía a Bing, Yandex, Seznam y Naver. El `--wait` no es opcional: sin él
   se envía la URL antes de que exista y los buscadores rastrean un 404.

Si el post estrena un tema que pasa de 1 a 2 posts, ese tema gana su página
`/blog/tema/<slug>`; enviarla también:
`npm run indexnow -- /blog/tema/<slug> --wait`.

Google no participa de IndexNow: descubre los cambios por el sitemap a su
ritmo, y eso no requiere ninguna acción.

---

## Git

- Mensajes de commit en inglés, concisos, con `Co-Authored-By`.
- **`git push` solo con pedido explícito**, con una excepción: el push de un
  post (paso 5 del flujo de arriba) es parte del encargo.

---

## Skills

Este workspace tiene instaladas las skills de
[mattpocock/skills](https://github.com/mattpocock/skills). Invocar la que
corresponda en vez de improvisar el flujo:

| Situación | Skill |
|---|---|
| Bug difícil o regresión de performance | `diagnosing-bugs` |
| Feature o bugfix con lógica de negocio | `tdd` |
| Conflicto de merge o rebase en curso | `resolving-merge-conflicts` |
| Interrogar un plan antes de construir | `grilling` |
| Convertir la conversación en spec | `to-spec` |
| Partir el plan en tickets | `to-tickets` |
| Investigar contra fuentes primarias | `research` |
| Editar este archivo o cualquier `AGENTS.md` | `writing-for-agents` |
| Trabajo de SEO | `seo-audit`, `ai-seo`, `entity-seo`, `local-seo` |
| Diseño de UI | `ui-ux-pro-max`, `frontend-design` |

`ask-matt` es el router sobre todo el set cuando no está claro cuál aplica.

**Cuidado con `code-review`:** la skill de Matt Pocock comparte nombre con el
comando incorporado. Para un code review, usar el `/code-review` incorporado.

---

## Nx

- Para explorar el workspace (proyectos, targets, dependencias), invocar la
  skill `nx-workspace` primero.
- Para scaffolding (apps, libs, estructura), invocar `nx-generate` **antes** de
  explorar o llamar a otras herramientas.
- Correr tareas siempre por `nx` (`nx run`, `nx run-many`, `nx affected`), no
  por la herramienta subyacente, y prefijado con el package manager
  (`npx nx build daev`).
- Nunca adivinar flags de CLI: consultar `nx_docs` o `--help`.
- Best practices de plugins: `node_modules/@nx/<plugin>/PLUGIN.md` cuando exista.
