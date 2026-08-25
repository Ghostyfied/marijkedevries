import type { RouteRecordRaw } from 'vue-router'

/**
 * The pages of the site, in nav order — restructured August 2026 on Marijke's
 * feedback: nieuws split out of contact into its own page, and an archief added
 * for material about past exhibitions. `title` and `description` feed the
 * per-page <head> tags.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/HomePage.vue'),
    meta: {
      nav: 'home',
      title: 'Marijke de Vries',
      description:
        'Beeldend kunstenaar Marijke de Vries — schilderijen, werken op perspex en tekeningen. Woont en werkt in Amsterdam.',
    },
  },
  {
    path: '/nieuws',
    name: 'nieuws',
    component: () => import('./pages/NieuwsPage.vue'),
    meta: {
      nav: 'nieuws',
      title: 'Nieuws',
      description:
        'Nieuws van Marijke de Vries: de tentoonstelling Dwaler, 2 september t/m 14 november 2026 in de Kunsttraject-etalages, Staatsliedenbuurt Amsterdam.',
    },
  },
  {
    path: '/werken',
    name: 'werken',
    component: () => import('./pages/WerkenPage.vue'),
    meta: {
      nav: 'werken',
      title: 'Werken',
      description:
        'Werk van Marijke de Vries: Liefde in tijden van Corona, Tinder Times en Falling Angel.',
    },
  },
  {
    path: '/series',
    name: 'series',
    component: () => import('./pages/SeriesPage.vue'),
    meta: {
      nav: "series/thema's",
      title: "Series / thema's",
      description:
        'Teksten over het werk van Marijke de Vries: recent werk, Monument voor de Liefde, Liefde in tijden van Corona, Tinder Times en de werken in perspex.',
    },
  },
  {
    path: '/bio',
    name: 'bio',
    component: () => import('./pages/BioPage.vue'),
    meta: {
      nav: 'bio',
      title: 'Bio',
      description:
        'Biografie en cv van Marijke de Vries: exposities, residencies, prijzen, subsidies, publicaties en opdrachten.',
    },
  },
  {
    path: '/links',
    name: 'links',
    component: () => import('./pages/LinksPage.vue'),
    meta: { nav: 'links', title: 'Links', description: 'Links rond het werk van Marijke de Vries.' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('./pages/ContactPage.vue'),
    meta: {
      nav: 'contact',
      title: 'Contact',
      description: 'Contactgegevens van Marijke de Vries.',
    },
  },
  {
    path: '/archief',
    name: 'archief',
    component: () => import('./pages/ArchiefPage.vue'),
    meta: {
      nav: 'archief',
      title: 'Archief',
      description:
        'Archief van Marijke de Vries: teksten en programma van de tentoonstelling Tinder Times: Monumenten voor Vluchtigheid (2020).',
    },
  },
]

/*
 * Pre-rendered to dist/404.html, which GitHub Pages serves for any unknown path.
 * The catch-all keeps client-side navigation consistent with that.
 */
routes.push(
  {
    path: '/404',
    name: 'not-found',
    component: () => import('./pages/NotFoundPage.vue'),
    meta: {
      hidden: true,
      nav: '',
      title: 'Pagina niet gevonden',
      description: 'Deze pagina bestaat niet.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'catch-all',
    component: () => import('./pages/NotFoundPage.vue'),
    meta: {
      hidden: true,
      nav: '',
      title: 'Pagina niet gevonden',
      description: 'Deze pagina bestaat niet.',
    },
  },
)

/** The routes that appear in the main navigation, in order. */
export const navRoutes = routes.filter((r) => !r.meta?.hidden)
