/**
 * Shared shapes for the per-language content in src/content/nl and
 * src/content/en. Both locales export the same SiteContent, so a page never
 * needs to know which language it is rendering beyond picking the module.
 */

export type Lang = 'nl' | 'en'

// ------------------------------------------------------------------ works ---

export interface Work {
  kind: 'image'
  /** Key into the generated image manifest. */
  image: string
  /** Thumbnail height in px at desktop, as the original set it. */
  displayHeight: number
  title: string
  medium?: string
  dimensions?: string
  year?: number
  /** Trailing remark from the original caption, e.g. "met details". */
  note?: string
}

export interface WorkVideo {
  kind: 'video'
  /** Key into the generated media manifest. */
  src: string
}

export interface Group {
  /** Sub-heading inside a series, e.g. "works on canvas". */
  label?: string
  works: (Work | WorkVideo)[]
}

export interface Series {
  id: string
  title: string
  groups: Group[]
}

// -------------------------------------------------------------------- bio ---

export interface CvRow {
  /** Year or range, e.g. "1992-1994". Empty for rows without one. */
  period: string
  text: string
}

export interface CvSection {
  heading: string
  rows: CvRow[]
}

// ------------------------------------------------------------------ other ---

export interface Link {
  href: string
  label: string
  description: string
}

export interface ContactDetail {
  label: string
  value: string
  href?: string
}

export interface ArchiveBlock {
  heading?: string
  lines: string[]
}

export interface ArchiveItem {
  title: string
  period: string
  blocks: ArchiveBlock[]
  body: string[]
  pdf?: { label: string; href: string }
}

export interface Essay {
  id: string
  heading: string
  /** Rendered HTML — the .md files are converted at build time. */
  html: string
}

// ------------------------------------------------------------- aggregate ---

export interface SiteContent {
  home: {
    imageAlt: string
    /** First paragraph may carry **bold** markers. */
    paragraphs: string[]
  }
  nieuws: {
    /** The event details block, first line bold. */
    lines: string[]
    posterAlt: string
    posterCaption: string
    fullscreenLabel: string
  }
  works: {
    series: Series[]
    videoFallback: string
    viewLarger: string
    /** aria-label for the lightbox thumbnail strip. */
    stripLabel: string
    /** "werk"/"work" — used in generated alt text for untitled pieces. */
    workWord: string
    /** "uit de serie"/"from the series" — ditto. */
    fromSeries: string
  }
  series: {
    /** The heading of the placeholder section above the essays. */
    recentHeading: string
    essays: Essay[]
  }
  bio: {
    intro: string[]
    cv: CvSection[]
  }
  links: Link[]
  contact: {
    details: ContactDetail[]
    flyerAlt: string
  }
  archive: ArchiveItem[]
  ui: {
    skipToContent: string
    navLabel: string
    /** Label of the language-toggle nav item, e.g. "eng". */
    toggleLabel: string
  }
}
