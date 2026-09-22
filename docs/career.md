# Trayectoria profesional — fuente de verdad

No se publica en la web. Es la referencia para el CV (`apps/daev/scripts/cv/`), la sección
de experiencia y cualquier texto que hable de la carrera de Dave. Si un dato
cambia, se cambia acá primero y después en `apps/daev/scripts/cv/content.mjs` y
`apps/daev/src/config/site.ts`.

Última revisión: 2026-09-22.

## Cifras (acordadas con Dave el 2026-09-22)

| Dato | Valor | Base |
|---|---|---|
| Proyectos terminados | **45+** | DigitalYa: 30 terminados y 12 en curso (planilla `digitalYa/control-proyectos-digitalYa.ods`); más los propios y freelance. **Art Gallery no cuenta** (decisión de Dave). |
| Años en desarrollo full stack | **4+** | desde el bootcamp de Henry (dic 2022) |
| Años en IT | **15+** | técnico en sistemas desde 2008; los CV de 2025 decían 16+ |

## Experiencia

### DigitalYa — Desarrollador Web y SEO · may 2026 – actual
Agencia argentina de marketing digital, trabajo remoto. Sitios para estudios
jurídicos y profesionales de Argentina.
- 42 proyectos asignados entre may y sep 2026: 30 terminados y 12 en curso.
- Ciclo completo: diseño, desarrollo (Astro 5, TypeScript, Tailwind v4), SEO
  técnico y local, GEO (JSON-LD, Open Graph), despliegue en Cloudflare, DNS y
  dominio.
- Automatizó el flujo de la agencia con scripts y skills de agentes de IA
  (`digitalYa/scripts/dy/`, `digitalya-skills`): scaffolding, deploy
  verificado, planilla de control y seguimiento en Jira.

### Colombian Cannabis Center — Líder técnico · sep 2024 – may 2026
(El sitio decía nov 2024; se corrigió a sep 2024 según Dave. Existe un manual
de funciones de CTO redactado por él; el título que se usa es Líder técnico.)
- Backend de la plataforma de gestión agrícola y trazabilidad: NestJS,
  Sequelize, PostgreSQL, Docker. Trazabilidad planta → lote pensada para
  auditoría, acceso por roles.
- Lideró un equipo frontend: sitio comercial y frontend de la app interna.
- Investigó e implementó tecnologías para cumplir estándares de calidad y
  seguridad de la información.

### AppTender — Desarrollador Full Stack (junior) · jul 2023 – ago 2024
- Migración del backend de Express a NestJS.
- Endpoints nuevos con APIs de terceros: Meta, Brevo, OpenAI.
- Contribuciones al frontend en Vue.

### Freelance (Daev) · 2023 – actual
Clientes: Chez Boaz Tours (LCP móvil 7,90 s → 1,62 s; checkout con Bold),
Climb Rock, Ópticas Apolo Visión (e-commerce), Kevin Galeano — Rescatista,
Chilcuague, Invicto (pasarelas de pago en plataforma preuniversitaria).

### Soporte e infraestructura IT — independiente · 2008 – 2022
Bloque sin empleadores (decisión de Dave). Técnico para empresas y hogares:
hardware, redes, sistemas operativos, servidores y despliegue. Aplicaciones con
Microsoft SQL Server, Access, PageMaker, Dreamweaver.

### Otros antecedentes (no van al CV de una página)
- Guía profesional de turismo; fundó una empresa de turismo de naturaleza,
  montañismo y escalada.
- Scout (recurso adulto). Bajo y guitarra. Natación y montañismo.

## Investigación y academia
- 2012 — Laboratorio de biología computacional (UNAL): cladogramas a partir de
  secuencias de ADN. Perl + CPAN, reportes en LaTeX, regex en Bash/Zsh.
- 2010 — Laboratorio de estadística social: R + CRAN.
- 2005 — Sitio del grupo musical Ácido: HTML, Flash, Dreamweaver, MySQL.

## Formación
- Bootcamp Full Stack — Henry — 800 h — dic 2022 – jul 2023
- Java Upskill — Henry — 300 h — oct – dic 2023
- NDG Linux Unhatched — ene 2023
- Cisco IT Essentials in JavaScript — OpenEDG JS Institute — dic 2022
- Administración y soporte IT (Cisco IT Essentials 1) — SENA — sep 2010 – ene 2011
- Psicología y Biología (sin terminar) — Universidad Nacional de Colombia — 2009 – 2014
- Técnico en Análisis y Programación de Sistemas — IE Alexander von Humboldt — 2005 – 2008

## Idiomas
Español nativo. Inglés: los CV de 2025 dicen «B2 en curso, orientado a IT».
**Pendiente confirmar el nivel actual.**

## Encargos abiertos (órdenes de Dave)

Registrados el 2026-09-22.

1. **Rehacer todo el home** con doble objetivo: vender proyectos freelance y
   dar la seriedad que busca un reclutador. Se trabaja sección por sección y
   se empieza por el hero.
2. **Hero** (hecho el 2026-09-22): sin cifras, sin badge de disponibilidad, sin
   tecnologías; subtítulo «Desarrollador Full Stack especializado». Debajo de
   los CTA, el enlace «¿Eres reclutador?» que lleva a contacto y descarga el CV.
3. **CV de una página a dos columnas, ES y EN**, generado desde
   `apps/daev/scripts/cv/` (`npm run cv`) y publicado en `apps/daev/public/cv/`.
4. **Recuperar la experiencia laboral en el home.** La versión anterior del
   sitio la mostraba y se quitó al rehacer el home. Los datos ya están en
   `site.ts` → `experience`. Falta decidir dónde va en el orden del home.
