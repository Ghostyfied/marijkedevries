import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './routes'
import './styles/base.css'

export const createApp = ViteSSG(
  App,
  // base follows Vite's, so the router resolves links correctly whether the site
  // is mounted at the apex domain or under a project path.
  { routes, base: import.meta.env.BASE_URL, scrollBehavior: () => ({ top: 0 }) },
  ({ router }) => {
    /*
     * The build emits flat files — /werken.html — and GitHub Pages serves those
     * at the clean /werken. Anyone who lands on the .html URL directly (an old
     * bookmark, a link that kept the extension) would otherwise hydrate into a
     * router with no matching route. Normalise to the clean path instead.
     */
    router.beforeEach((to) => {
      if (!to.path.endsWith('.html')) return true
      const clean = to.path.replace(/(?:\/index)?\.html$/, '') || '/'
      return { path: clean, query: to.query, hash: to.hash, replace: true }
    })
  },
)
