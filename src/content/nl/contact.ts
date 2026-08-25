/**
 * The contact page. Stripped down on Marijke's feedback of August 2026: the
 * acquisitie line and everything below instagram is gone — the Tinder Times
 * announcement now lives on the archief page — except the exhibition affiche,
 * which she asked to keep here.
 */

import type { ContactDetail } from '../types'

export const details: ContactDetail[] = [
  { label: 'email', value: 'info@marijkedevries.nl', href: 'mailto:info@marijkedevries.nl' },
  { label: 'telefoon', value: '06 21 26 33 73', href: 'tel:+31621263373' },
  {
    label: 'instagram',
    value: 'devries.marijke',
    href: 'https://www.instagram.com/devries.marijke/',
  },
]

/** The Tinder Times affiche — key into the generated image manifest. */
export const flyer = {
  image: 'AAtindertimesflyer4.png',
  alt: 'Affiche van de tentoonstelling Tinder Times: Monumenten voor Vluchtigheid, SEXYLAND Amsterdam, november 2020',
}
