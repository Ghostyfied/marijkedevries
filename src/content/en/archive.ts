/**
 * The archive page in English. Translated from the Dutch archief page; the
 * exhibition and work titles stay in their original language.
 */

import type { ArchiveItem } from '../types'

export const items: ArchiveItem[] = [
  {
    title: 'Tinder Times: Monumenten voor Vluchtigheid',
    period: 'November 2020',
    blocks: [
      {
        heading: 'Exhibition 21 - 24 November',
        lines: [
          'Sociëteit SEXYLAND',
          'Ms. van Riemsdijkweg 39, Amsterdam',
          '€5 admission | pay at the door',
        ],
      },
      {
        heading: 'Workshop 2 December',
        lines: ['Huis van de Wijk Waterlandplein', 'Waterlandplein 302, Amsterdam', 'Free admission'],
      },
      {
        heading: 'Tango salons 22 - 24 November, daily 20:00-23:00',
        lines: [
          'Sociëteit SEXYLAND',
          'Ms. van Riemsdijkweg 39, Amsterdam',
          '€10 admission | pay at the door',
          'Registration with a fixed partner',
        ],
      },
    ],
    body: [
      'From Saturday 21 November to Tuesday 24 November, Rijksakademie alumna and visual artist Marijke de Vries presents her exhibition Tinder Times: Monumenten voor Vluchtigheid at Sociëteit SEXYLAND — an exciting, interactive programme in which painting, music and dating apps join in a whirling tango.',
      'Marijke de Vries is single, 60+, and two years ago decided to devote a series to the dating app Tinder, feeling the need to make the memory of these often fleeting contacts tangible. It is a courageous, vulnerable position to take. Men she had been in contact with through Tinder, where a sense of equality had grown, were invited to her studio to pose for her — often resulting in erotic model paintings on rice paper. Later, when the pandemic arrived, these studio encounters shifted to digital model sessions. So the Tinder Times project unintentionally became a document about Love in Times of Corona as well.',
      'The quickly set-up, sketch-like works, which serve as the starting point for the more abstract paintings and collages, are shown at SEXYLAND in a walk-in installation inspired by the old-fashioned peepshow.',
      'Throughout the four-day programme at Sociëteit SEXYLAND the exhibition can be visited daily, and a painting-and-dance performance is given by Marijke and Marco Maretti of the modern dance company Gruppo Nanou from Italy. In the evenings there are tango salons, and the "sexperts" of VOOS host a talk on the theme "what is NORMal?", inviting visitors to get creative themselves. Cathelijne Blok of the feminist art platform The Titty Mag opens the exhibition on Saturday with an artist talk, after which musical multi-talent Firoza — image-breaker for the Van Gogh Museum, among other things — plays her newest songs from inside the peepshow installation.',
    ],
    pdf: {
      label: 'Programme Tinder Times (pdf, in Dutch)',
      href: '/media/programma-tinder-times.pdf',
    },
  },
]
