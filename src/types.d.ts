import 'vue-router'
import type { Lang } from './content/types'

declare module 'vue-router' {
  interface RouteMeta {
    /** Language this route renders in. */
    lang: Lang
    /** Label shown in the main navigation. */
    nav: string
    /** Page title, suffixed with the site name. */
    title: string
    /** Meta description for this page. */
    description: string
    /** Path of the same page in the other language. */
    counterpart: string
    /** Kept out of the main navigation (the 404 route). */
    hidden?: boolean
  }
}
