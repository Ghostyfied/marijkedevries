import type { SiteContent } from '../types'
import { series } from './works'
import { intro, cv } from './bio'
import { links } from './links'
import { details, flyer } from './contact'
import { items as archive } from './archief'
import { essays } from './essays'

export const nl: SiteContent = {
  home: {
    imageAlt: 'Marijke de Vries aan het werk in haar atelier',
    // Artist statement, verbatim from Marijke's mail of 23 August 2026.
    paragraphs: [
      'Marijke de Vries woont en werkt in Amsterdam en is alumna van de Rijksakademie en Prix de Rome winnaar.',
      '‘Schilderen is een emotionele daad waarin zich betekenissen en verhalen invoegen. Mijn werk heeft een lyrisch aspect; ik ben ook danser, muziek en beweging zijn deel van mijn leven en verbonden met mijn beeldende kunst. Mijn werk heeft figuratieve en abstracte elementen. Ik wil kijkers hun eigen reis laten maken in mijn werk en laat graag iets aan de verbeelding over. In mijn materiaalgebruik ben ik onder meer geboeid door gelaagdheid en transparantie. Om dit te onderzoeken heb ik (ook) met perspex gewerkt. Naast het maken van beeldende objecten, zoals schilderijen, beschouw ik het maken van interdisciplinaire evenementen, performances en projecten gebaseerd op de Argentijnse tango, als een belangrijk onderdeel van mijn kunstpraktijk’',
    ],
  },
  nieuws: {
    // Details as they appear on the affiche Marijke supplied.
    lines: [
      'Dwaler',
      'Kunsttraject-etalages in de Staatsliedenbuurt, Amsterdam',
      '2 september t/m 14 november 2026',
      'Van Boetzelaerstraat 56, 80 en 92 en Van Hogendorpstraat 205',
      'De schilderijen zijn dag en nacht te zien.',
    ],
    posterAlt:
      'Affiche van de tentoonstelling Dwaler van Marijke de Vries, Kunsttraject-etalages in de Staatsliedenbuurt, Amsterdam, 2 september tot en met 14 november 2026',
    posterCaption:
      'Dwaler — Kunsttraject-etalages, Staatsliedenbuurt, Amsterdam, 2 september t/m 14 november 2026',
    fullscreenLabel: 'Bekijk de affiche op volledig scherm',
  },
  works: {
    series,
    videoFallback: 'Je browser kan deze video niet afspelen.',
    viewLarger: 'Bekijk groter:',
    stripLabel: 'Werken in deze serie',
    workWord: 'werk',
    fromSeries: 'uit de serie',
  },
  series: {
    recentHeading: 'recent werk (2021-2026)',
    essays,
  },
  bio: { intro, cv },
  links,
  contact: { details, flyerAlt: flyer.alt },
  archive,
  ui: {
    skipToContent: 'Naar de inhoud',
    navLabel: 'Hoofdnavigatie',
    toggleLabel: 'ENG',
  },
}
