import type { RouteRecordRaw } from 'vue-router'

/**
 * The six pages of the live site. `title` and `description` feed per-page
 * <head> tags — the original shipped one identical title across every page.
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
        'Teksten over het werk van Marijke de Vries: Monument voor de Liefde, Liefde in tijden van Corona, Tinder Times en de werken in perspex.',
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
      nav: 'contact/nieuws',
      title: 'Contact / nieuws',
      description: 'Contactgegevens van Marijke de Vries en nieuws over exposities.',
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
