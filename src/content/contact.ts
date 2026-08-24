/**
 * The contact / nieuws page.
 *
 * Hand-transcribed rather than scraped: in the original, several <a> tags are
 * closed with </b> instead of </a>, so the first "Reserveren" link swallows
 * every following paragraph into itself. The text below is verbatim; only the
 * link boundaries are repaired.
 *
 * The news item is the November 2020 exhibition, exactly as the live site still
 * advertises it. It is marked `past` so the page can say so — see PLAN.md §12,
 * question 1, which is Marijke's call.
 */

export interface ContactDetail {
  label: string
  value: string
  href?: string
}

export const details: ContactDetail[] = [
  { label: 'email', value: 'info@marijkedevries.nl', href: 'mailto:info@marijkedevries.nl' },
  { label: 'telefoon', value: '06 21 26 33 73', href: 'tel:+31621263373' },
  {
    label: 'instagram',
    value: 'devries.marijke',
    href: 'https://www.instagram.com/devries.marijke/',
  },
  {
    label: 'informatie over aquisitie',
    value: 'fleurferinga@gmail.com',
    href: 'mailto:fleurferinga@gmail.com',
  },
]

export interface NewsLink {
  label: string
  href: string
}

export interface NewsBlock {
  heading?: string
  lines: string[]
  links?: NewsLink[]
}

export interface NewsItem {
  title: string
  /** True once the dates have passed — the page labels it as an archive entry. */
  past: boolean
  blocks: NewsBlock[]
  body: string[]
  /**
   * Key into the generated image manifest. On the original this <img> pointed at
   * `http://www.marijkedevries.nl/...` from an HTTPS page, so browsers blocked it
   * as mixed content and the flyer has been a broken-image icon for years.
   */
  flyer?: string
  flyerHref?: string
}

export const news: NewsItem = {
  title: 'Tinder Times: Monumenten voor Vluchtigheid',
  past: true,
  blocks: [
    {
      heading: 'Expositie 21 -24 November',
      lines: [
        'Sociëteit SEXYLAND 21 - 24 November',
        'Ms. van Riemsdijkweg 39, Amsterdam',
        '€5,- entree | afrekenen aan de deur',
      ],
    },
    {
      heading: 'Workshop 2 december',
      lines: ['Huis van de Wijk Waterlandplein', 'Waterlandplein 302, Amsterdam', 'GRATIS ENTREE'],
      links: [
        {
          label: 'Klik hier om te reserveren',
          href: 'https://www.eventbrite.nl/e/tickets-tinder-times-monumenten-voor-vluchtigheid-125963701823',
        },
      ],
    },
    {
      heading: 'Tangosalons 22 - 24 november elke dag van 20:00-23:00',
      lines: [
        'Sociëteit SEXYLAND',
        'Ms. van Riemsdijkweg 39, Amsterdam',
        '€10,- entree | afrekenen aan de deur',
        'Registratie met fixed partner',
      ],
      links: [
        {
          label: 'Reserveren voor 22 november',
          href: 'https://www.tangokalender.nl/reserveren/reserveren.aspx?id=153438',
        },
        {
          label: 'Reserveren voor 23 november',
          href: 'https://www.tangokalender.nl/reserveren/reserveren.aspx?id=153439',
        },
        {
          label: 'Reserveren voor 24 november',
          href: 'https://www.tangokalender.nl/reserveren/reserveren.aspx?id=153440',
        },
      ],
    },
  ],
  body: [
    'Rijksakademie alumnus en beeldend kunstenaar Marijke de Vries presenteert van zaterdag 21 november t/m dinsdag 24 november haar tentoonstelling Tinder Times: Monumenten voor Vluchtigheid in Sociëteit SEXYLAND. Een spannend en interactief programma waarin schilderkunst, muziek en dating-apps samen een wervelende tango aangaan.',
    'Marijke de Vries is single, 60+ en besloot twee jaar geleden om een serie te wijden aan de dating-app Tinder omdat zij de noodzaak voelde om de herinnering aan de vaak vluchtige contacten tastbaar te maken. Hierin getuigt Marijke van lef door zich kwetsbaar op te stellen. Mannen waarmee zij via Tinder contact had, en waarbij er een gevoel van gelijkwaardigheid ontstond, nodigde ze uit in haar atelier om voor haar te poseren, wat vaak resulteerde in erotische modelschilderijen op rijstpapier. Later, toen de huidige pandemie zijn intrede nam, verschoven deze atelier-ontmoetingen naar digitale modelsessies. Zo ontaardde het project Tinder Times, onbedoeld tevens in een document over Love in Times of Corona.',
    'De snel opgezette, schetsachtige werken, die als vertrekpunt dienen voor de meer abstracte schilderijen en collages, zullen in SEXYLAND worden getoond in een installatie die je kunt betreden, geïnspireerd op de ouderwetse peepshow.',
    'Gedurende het vierdaagse programma in Sociëteit SEXYLAND, is iedere dag de tentoonstelling te bekijken en wordt er een schilder- en dansperformance uitgevoerd door Marijke en Marco Maretti van het moderne dansgezelschap Gruppo Nanou uit Italië. Daarnaast zijn er ’s avonds tangosalons te volgen en de ‘sexperts’ van VOOS organiseren een Poespraat met als thema ‘wat is NORMaal?’, waarbij bezoekers worden uitgenodigd zelf creatief aan de slag te gaan. Cathelijne Blok van het feministisch kunstplatform The Titty Mag opent de tentoonstelling op zaterdag met een artist talk en aansluitend zal muzikaal multitalent Firoza, onder andere beeldbreker voor het Van Gogh Museum, haar nieuwste nummers spelen vanuit de peepshow installatie.',
  ],
  flyer: 'AAtindertimesflyer4.png',
  flyerHref: 'https://www.facebook.com/events/2627798637332644/',
}
