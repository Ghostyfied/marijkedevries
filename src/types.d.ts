import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** Label shown in the main navigation. */
    nav: string
    /** Page title, suffixed with the site name. */
    title: string
    /** Meta description for this page. */
    description: string
    /** Kept out of the main navigation (the 404 route). */
    hidden?: boolean
  }
}
