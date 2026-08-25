/**
 * Every URL the old site served, mapped to where it lives now.
 *
 * These paths have inbound links — the VICE article, a Facebook event, an
 * Eventbrite listing — and GitHub Pages cannot issue a 301, so the build emits
 * a small stub at each one carrying a canonical link and a meta refresh.
 *
 * Also consumed by scripts/postbuild.mjs.
 */
export interface LegacyUrl {
  /** Path as the old site served it. */
  from: string
  /** Where it lives now. */
  to: string
  /** Why, for the note shown to anyone who lands on the stub with JS off. */
  reason: 'moved' | 'retired'
}

export const legacyUrls: LegacyUrl[] = [
  // The five live inner pages.
  { from: '/nl/werken.html', to: '/werken', reason: 'moved' },
  { from: '/nl/series.html', to: '/series', reason: 'moved' },
  { from: '/nl/biografie.html', to: '/bio', reason: 'moved' },
  { from: '/nl/links.html', to: '/links', reason: 'moved' },
  { from: '/nl/contact.html', to: '/contact', reason: 'moved' },

  // Orphans: a stale duplicate of the home page, and two pages dropped from the
  // nav in 2020 whose content now lives on /series.
  { from: '/nl/index.html', to: '/', reason: 'moved' },
  { from: '/nl/over.html', to: '/series', reason: 'retired' },
  { from: '/nl/projecten.html', to: '/series', reason: 'retired' },

  // The old English site, unlinked since 2019, now points at the real
  // English pages under /en.
  { from: '/eng/index.html', to: '/en', reason: 'moved' },
  { from: '/eng/works.html', to: '/en/works', reason: 'moved' },
  { from: '/eng/about.html', to: '/en/series', reason: 'moved' },
  { from: '/eng/projects.html', to: '/en/series', reason: 'moved' },
  { from: '/eng/biography.html', to: '/en/bio', reason: 'moved' },
  { from: '/eng/links.html', to: '/en/links', reason: 'moved' },
  { from: '/eng/contact.html', to: '/en/contact', reason: 'moved' },
]
