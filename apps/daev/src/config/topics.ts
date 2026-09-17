// Controlled vocabulary for the blog.
//
// Keywords stay free-form: they are the long tail, they live in each post's
// frontmatter and they only filter the index in the browser. Topics are the
// opposite — a short, closed list that gets real, indexable URLs under
// /blog/tema/<slug>, so the clusters the blog already has (cacao, territorio,
// ensayo) stop being nine unrelated pages in the eyes of a search engine.
//
// Adding a topic here does nothing on its own; a post joins it through the
// `topics:` field in its frontmatter.

export interface BlogTopic {
  slug: string;
  /** Short name for chips and filters. */
  label: { es: string; en: string };
  /** Page heading and <title>. */
  title: { es: string; en: string };
  /** Meta description, ~155 characters. */
  description: { es: string; en: string };
  /** Lead paragraph shown above the post list. */
  intro: { es: string; en: string };
}

/**
 * A topic needs at least this many posts before it gets its own page. A topic
 * page with a single entry is a thin page that adds nothing a reader could not
 * get from the index, and thin pages drag on the whole site's quality signal.
 * Topics below the threshold still tag their posts — they simply do not link
 * anywhere until a second post joins them.
 */
export const MIN_POSTS_PER_TOPIC = 2;

export const blogTopics: BlogTopic[] = [
  {
    slug: 'cacao-y-raices',
    label: { es: 'Cacao y raíces', en: 'Cacao and roots' },
    title: {
      es: 'Cacao y raíces',
      en: 'Cacao and roots',
    },
    description: {
      es: 'Cacao de origen, chucula de los 7 granos y raíces de la herbolaria tradicional: procesos, recetas y las personas que los sostienen.',
      en: 'Single-origin cacao, seven-grain chucula and roots from traditional herbalism: processes, recipes and the people behind them.',
    },
    intro: {
      es: 'De la mazorca a la taza. Crónicas sobre cacao de origen, alimentos ancestrales y las raíces que la herbolaria tradicional lleva siglos usando.',
      en: 'From pod to cup. Stories about single-origin cacao, ancestral foods and the roots traditional herbalism has used for centuries.',
    },
  },
  {
    slug: 'territorio',
    label: { es: 'Territorio', en: 'Territory' },
    title: {
      es: 'Territorio: Cundinamarca y el Alto Magdalena',
      en: 'Territory: Cundinamarca and the Alto Magdalena',
    },
    description: {
      es: 'Recorridos por Cundinamarca y el Alto Magdalena: Anapoima, Nilo, Tocaima. Paisaje, arquitectura, comunidad y turismo de naturaleza.',
      en: 'Journeys through Cundinamarca and the Alto Magdalena: Anapoima, Nilo, Tocaima. Landscape, architecture, community and nature tourism.',
    },
    intro: {
      es: 'Lo que hay a menos de dos horas de casa: fincas, casas campestres, redes en los árboles y la gente que hace que ese territorio valga la pena.',
      en: 'What sits less than two hours from home: farms, country houses, nets in the trees, and the people who make the place worth it.',
    },
  },
  {
    slug: 'ensayo',
    label: { es: 'Ensayo', en: 'Essay' },
    title: {
      es: 'Ensayo y cultura',
      en: 'Essays and culture',
    },
    description: {
      es: 'Textos sobre cine, música, arte y libertad. Lecturas a contrapelo y escritura honesta, sin herramientas de inteligencia artificial.',
      en: 'Writing on film, music, art and freedom. Contrarian readings and honest prose, written without AI tools.',
    },
    intro: {
      es: 'Escribir para entender. Ensayos sobre cine, música y libertad, incluidos textos invitados de autores que admiro.',
      en: 'Writing in order to understand. Essays on film, music and freedom, including guest pieces by authors I admire.',
    },
  },
  {
    slug: 'oficio',
    label: { es: 'Oficio', en: 'Craft' },
    title: {
      es: 'Código y oficio',
      en: 'Code and craft',
    },
    description: {
      es: 'Cómo se aprende a programar de verdad: el camino, los errores y lo que el oficio exige más allá de los lenguajes y los frameworks.',
      en: 'How you actually learn to build software: the path, the mistakes, and what the craft demands beyond languages and frameworks.',
    },
    intro: {
      es: 'El oficio por dentro: cómo empecé, qué me costó y qué sigue costando.',
      en: 'The craft from the inside: how I started, what it cost me, and what still does.',
    },
  },
];

export const blogTopicsBySlug = new Map(blogTopics.map((topic) => [topic.slug, topic]));
