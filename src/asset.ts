/**
 * Resolves a site-relative path from the generated image manifest against the
 * mount point Vite was built with.
 *
 * The manifest stores paths without a leading slash so one build artefact can
 * serve from the apex domain (BASE_URL "/") or from a project path such as
 * "/marijkedevries/" without regenerating it.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
