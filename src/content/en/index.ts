import type { SiteContent } from '../types'
import { series } from './works'
import { intro, cv } from './bio'
import { links } from './links'
import { details, flyerAlt } from './contact'
import { items as archive } from './archive'
import { essays } from './essays'

export const en: SiteContent = {
  home: {
    imageAlt: 'Marijke de Vries at work in her studio',
    // DRAFT translation of the artist statement — awaiting Marijke's sign-off.
    paragraphs: [
      'Marijke de Vries lives and works in Amsterdam and is an alumna of the Rijksakademie and a Prix de Rome laureate.',
      '‘Painting is an emotional act in which meanings and stories embed themselves. My work has a lyrical aspect; I am also a dancer — music and movement are part of my life and connected to my visual art. My work has figurative and abstract elements. I want viewers to make their own journey through my work, and I like to leave something to the imagination. In my use of materials I am fascinated by layering and transparency, among other things. To explore this I have (also) worked with perspex. Besides making visual objects, such as paintings, I consider the making of interdisciplinary events, performances and projects based on the Argentine tango an important part of my artistic practice’',
    ],
  },
  nieuws: {
    lines: [
      'Dwaler',
      'Kunsttraject window galleries in the Staatsliedenbuurt, Amsterdam',
      '2 September - 14 November 2026',
      'Van Boetzelaerstraat 56, 80 and 92, and Van Hogendorpstraat 205',
      'The paintings can be seen day and night.',
    ],
    posterAlt:
      'Poster of the exhibition Dwaler by Marijke de Vries, Kunsttraject window galleries in the Staatsliedenbuurt, Amsterdam, 2 September to 14 November 2026',
    posterCaption:
      'Dwaler — Kunsttraject window galleries, Staatsliedenbuurt, Amsterdam, 2 September - 14 November 2026',
    fullscreenLabel: 'View the poster full screen',
  },
  works: {
    series,
    videoFallback: 'Your browser cannot play this video.',
    viewLarger: 'View larger:',
    stripLabel: 'Works in this series',
    workWord: 'work',
    fromSeries: 'from the series',
  },
  series: {
    recentHeading: 'recent work (2021-2026)',
    essays,
  },
  bio: { intro, cv },
  links,
  contact: { details, flyerAlt },
  archive,
  ui: {
    skipToContent: 'Skip to content',
    navLabel: 'Main navigation',
    toggleLabel: 'nl',
  },
}
