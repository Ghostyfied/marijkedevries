/**
 * Post-build cleanup.
 *
 * vite-ssg needs Vite's SSR manifest during the render pass, but it is written
 * into dist/.vite and would otherwise be published alongside the site.
 *
 * Phase 6 will extend this with the sitemap and the legacy-URL redirect stubs.
 */
import { rm } from 'node:fs/promises'

await rm(new URL('../dist/.vite', import.meta.url), { recursive: true, force: true })
console.log('[postbuild] removed dist/.vite')
