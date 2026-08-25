/**
 * The archief page: material about past exhibitions, moved here from the
 * contact page on Marijke's feedback of August 2026. Text is verbatim from the
 * original site's contact/nieuws page.
 *
 * The event blocks render as plain text, not links — the reservation pages
 * (Eventbrite, Tangokalender) were for November 2020 and would send visitors
 * to dead booking forms. The programme PDF is ours and still works, so that
 * stays a link.
 */

import type { ArchiveItem } from '../types'

export const items: ArchiveItem[] = [
  {
    title: 'Tinder Times: Monumenten voor Vluchtigheid',
    period: 'november 2020',
    blocks: [
      {
        heading: 'Expositie 21 - 24 november',
        lines: [
          'Sociëteit SEXYLAND',
          'Ms. van Riemsdijkweg 39, Amsterdam',
          '€5,- entree | afrekenen aan de deur',
        ],
      },
      {
        heading: 'Workshop 2 december',
        lines: ['Huis van de Wijk Waterlandplein', 'Waterlandplein 302, Amsterdam', 'Gratis entree'],
      },
      {
        heading: 'Tangosalons 22 - 24 november, elke dag van 20:00-23:00',
        lines: [
          'Sociëteit SEXYLAND',
          'Ms. van Riemsdijkweg 39, Amsterdam',
          '€10,- entree | afrekenen aan de deur',
          'Registratie met fixed partner',
        ],
      },
    ],
    body: [
      'Rijksakademie alumnus en beeldend kunstenaar Marijke de Vries presenteert van zaterdag 21 november t/m dinsdag 24 november haar tentoonstelling Tinder Times: Monumenten voor Vluchtigheid in Sociëteit SEXYLAND. Een spannend en interactief programma waarin schilderkunst, muziek en dating-apps samen een wervelende tango aangaan.',
      'Marijke de Vries is single, 60+ en besloot twee jaar geleden om een serie te wijden aan de dating-app Tinder omdat zij de noodzaak voelde om de herinnering aan de vaak vluchtige contacten tastbaar te maken. Hierin getuigt Marijke van lef door zich kwetsbaar op te stellen. Mannen waarmee zij via Tinder contact had, en waarbij er een gevoel van gelijkwaardigheid ontstond, nodigde ze uit in haar atelier om voor haar te poseren, wat vaak resulteerde in erotische modelschilderijen op rijstpapier. Later, toen de huidige pandemie zijn intrede nam, verschoven deze atelier-ontmoetingen naar digitale modelsessies. Zo ontaardde het project Tinder Times, onbedoeld tevens in een document over Love in Times of Corona.',
      'De snel opgezette, schetsachtige werken, die als vertrekpunt dienen voor de meer abstracte schilderijen en collages, zullen in SEXYLAND worden getoond in een installatie die je kunt betreden, geïnspireerd op de ouderwetse peepshow.',
      'Gedurende het vierdaagse programma in Sociëteit SEXYLAND, is iedere dag de tentoonstelling te bekijken en wordt er een schilder- en dansperformance uitgevoerd door Marijke en Marco Maretti van het moderne dansgezelschap Gruppo Nanou uit Italië. Daarnaast zijn er ’s avonds tangosalons te volgen en de ‘sexperts’ van VOOS organiseren een Poespraat met als thema ‘wat is NORMaal?’, waarbij bezoekers worden uitgenodigd zelf creatief aan de slag te gaan. Cathelijne Blok van het feministisch kunstplatform The Titty Mag opent de tentoonstelling op zaterdag met een artist talk en aansluitend zal muzikaal multitalent Firoza, onder andere beeldbreker voor het Van Gogh Museum, haar nieuwste nummers spelen vanuit de peepshow installatie.',
    ],
    pdf: {
      label: 'Programma Tinder Times (pdf)',
      href: '/media/programma-tinder-times.pdf',
    },
  },
]
