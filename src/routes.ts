import type { RouteRecordRaw } from 'vue-router'
import type { Lang } from './content/types'

/**
 * The eight pages of the site, defined once and emitted in both languages.
 * Dutch lives at the root — the site's original URLs — and English under /en
 * with translated slugs. `counterpart` links each page to itself in the other
 * language; the nav's toggle and the hreflang alternates both read it.
 */
interface PageDef {
  component: () => Promise<unknown>
  nl: { path: string; nav: string; title: string; description: string }
  en: { path: string; nav: string; title: string; description: string }
}

const pages: PageDef[] = [
  {
    component: () => import('./pages/HomePage.vue'),
    nl: {
      path: '/',
      nav: 'home',
      title: 'Marijke de Vries',
      description:
        'Beeldend kunstenaar Marijke de Vries — schilderijen, werken op perspex en tekeningen. Woont en werkt in Amsterdam.',
    },
    en: {
      path: '/en',
      nav: 'home',
      title: 'Marijke de Vries',
      description:
        'Visual artist Marijke de Vries — paintings, works on perspex and drawings. Lives and works in Amsterdam.',
    },
  },
  {
    component: () => import('./pages/NieuwsPage.vue'),
    nl: {
      path: '/nieuws',
      nav: 'nieuws',
      title: 'Nieuws',
      description:
        'Nieuws van Marijke de Vries: de tentoonstelling Dwaler, 2 september t/m 14 november 2026 in de Kunsttraject-etalages, Staatsliedenbuurt Amsterdam.',
    },
    en: {
      path: '/en/news',
      nav: 'news',
      title: 'News',
      description:
        'News from Marijke de Vries: the exhibition Dwaler, 2 September to 14 November 2026 in the Kunsttraject window galleries, Staatsliedenbuurt Amsterdam.',
    },
  },
  {
    component: () => import('./pages/WerkenPage.vue'),
    nl: {
      path: '/werken',
      nav: 'werken',
      title: 'Werken',
      description:
        'Werk van Marijke de Vries: Liefde in tijden van Corona, Tinder Times en Falling Angel.',
    },
    en: {
      path: '/en/works',
      nav: 'works',
      title: 'Works',
      description:
        'Work by Marijke de Vries: Love in Times of Corona, Tinder Times and Falling Angel.',
    },
  },
  {
    component: () => import('./pages/SeriesPage.vue'),
    nl: {
      path: '/series',
      nav: "series/thema's",
      title: "Series / thema's",
      description:
        'Teksten over het werk van Marijke de Vries: recent werk, Monument voor de Liefde, Liefde in tijden van Corona, Tinder Times en de werken in perspex.',
    },
    en: {
      path: '/en/series',
      nav: 'series/themes',
      title: 'Series / themes',
      description:
        'Texts on the work of Marijke de Vries: recent work, Monument for Love, Love in Times of Corona, Tinder Times and the works in perspex.',
    },
  },
  {
    component: () => import('./pages/BioPage.vue'),
    nl: {
      path: '/bio',
      nav: 'bio',
      title: 'Bio',
      description:
        'Biografie en cv van Marijke de Vries: exposities, residencies, prijzen, subsidies, publicaties en opdrachten.',
    },
    en: {
      path: '/en/bio',
      nav: 'bio',
      title: 'Bio',
      description:
        'Biography and cv of Marijke de Vries: exhibitions, residencies, awards, grants, publications and commissions.',
    },
  },
  {
    component: () => import('./pages/LinksPage.vue'),
    nl: {
      path: '/links',
      nav: 'links',
      title: 'Links',
      description: 'Links rond het werk van Marijke de Vries.',
    },
    en: {
      path: '/en/links',
      nav: 'links',
      title: 'Links',
      description: 'Links around the work of Marijke de Vries.',
    },
  },
  {
    component: () => import('./pages/ContactPage.vue'),
    nl: {
      path: '/contact',
      nav: 'contact',
      title: 'Contact',
      description: 'Contactgegevens van Marijke de Vries.',
    },
    en: {
      path: '/en/contact',
      nav: 'contact',
      title: 'Contact',
      description: 'Contact details of Marijke de Vries.',
    },
  },
  {
    component: () => import('./pages/ArchiefPage.vue'),
    nl: {
      path: '/archief',
      nav: 'archief',
      title: 'Archief',
      description:
        'Archief van Marijke de Vries: teksten en programma van de tentoonstelling Tinder Times: Monumenten voor Vluchtigheid (2020).',
    },
    en: {
      path: '/en/archive',
      nav: 'archive',
      title: 'Archive',
      description:
        'Archive of Marijke de Vries: texts and programme of the exhibition Tinder Times: Monumenten voor Vluchtigheid (2020).',
    },
  },
]

function localeRoutes(lang: Lang): RouteRecordRaw[] {
  const other: Lang = lang === 'nl' ? 'en' : 'nl'
  return pages.map((page) => ({
    path: page[lang].path,
    name: `${lang}-${page[lang].nav.replace(/[^a-z]/g, '') || 'home'}`,
    component: page.component,
    meta: {
      lang,
      nav: page[lang].nav,
      title: page[lang].title,
      description: page[lang].description,
      counterpart: page[other].path,
    },
  }))
}

export const routes: RouteRecordRaw[] = [...localeRoutes('nl'), ...localeRoutes('en')]

/*
 * Pre-rendered to dist/404.html, which GitHub Pages serves for any unknown path.
 * The catch-all keeps client-side navigation consistent with that. The page
 * itself is bilingual.
 */
routes.push(
  {
    path: '/404',
    name: 'not-found',
    component: () => import('./pages/NotFoundPage.vue'),
    meta: {
      hidden: true,
      lang: 'nl',
      nav: '',
      title: 'Pagina niet gevonden',
      description: 'Deze pagina bestaat niet. This page does not exist.',
      counterpart: '/',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'catch-all',
    component: () => import('./pages/NotFoundPage.vue'),
    meta: {
      hidden: true,
      lang: 'nl',
      nav: '',
      title: 'Pagina niet gevonden',
      description: 'Deze pagina bestaat niet. This page does not exist.',
      counterpart: '/',
    },
  },
)

/** The nav items for one language, in order. */
export function navRoutesFor(lang: Lang) {
  return routes.filter((r) => !r.meta?.hidden && r.meta?.lang === lang)
}
