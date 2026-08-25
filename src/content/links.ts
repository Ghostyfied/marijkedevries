/**
 * The links page. Trimmed on Marijke's feedback of August 2026: the Sexyland
 * link is dead (the venue closed), Galerie Fleur & Wouter is removed, the VICE
 * headline quote is dropped (the link itself stays), and Tango11.nl is added
 * for the Alma del Sur project.
 */

export interface Link {
  href: string
  label: string
  description: string
}

export const links: Link[] = [
  {
    href: 'https://www.vice.com/nl/article/n7jzzw/moeder-tinder-daten-naaktschilderen',
    label: 'www.vice.com',
    description: 'Artikel in VICE',
  },
  {
    href: 'https://tango11.nl',
    label: 'Tango11.nl',
    description: 'over Alma del Sur',
  },
]
