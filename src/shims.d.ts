/**
 * Ambient module declarations. No top-level import/export in this file — that
 * would make it a module and scope these declarations locally.
 */

/** .md files are rendered to an HTML string by the markdown plugin in vite.config.ts. */
declare module '*.md' {
  const html: string
  export default html
}
