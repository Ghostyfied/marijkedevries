/**
 * The bio page, extracted from the original markup.
 *
 * The original laid the cv out as ten <table>s with a stray
 * `table { font-weight: bold }` rule, which is why every entry rendered bold.
 * Held as rows, the same content can be styled properly and read correctly by
 * screen readers. Text is verbatim from the source, typos included.
 */

export interface CvRow {
  /** Year or range, e.g. "1992-1994". */
  period: string
  text: string
}

export interface CvSection {
  heading: string
  rows: CvRow[]
}

/** Lead paragraphs, as Markdown-ish inline HTML is not needed here. */
export const intro: string[] = [
  "**Marijke de Vries** woont en werkt in Amsterdam.",
  "Kort na haar studie aan de Rijksakademie in Amsterdam ontving Marijke de Vries een zilveren Prix de Rome voor haar beginnende kunstpraktijk. Later kwam ze terecht in de wereld van dans en muziek en met name de tango raakte haar bijzonder. Voor een internationaal dansfestival werkte ze jarenlang fulltime als choreograaf en maakte dansproducties. In 2015 pakte Marijke haar beeldende kunstpraktijk weer volledig op met een residentie en expositie in Spanje. Ze begon te werken met nieuw materiaal, perspex, en ontdekte de mogelijkheden van gelaagdheid en transparantie van dit materiaal. Die transparantie werd een uitgangspunt in haar verdere werk.",
  "Muziek en dans komen ook tot uitdrukking in haar huidige beeldende werk. Beweging, openheid, flow en erotiek zijn belangrijke elementen. Daarbij is Marijke altijd op zoek naar verbinding, zoals op dit moment tot uitdrukking komt in haar project over online daten: ‘Tinder Times', en nog recenter in de thematiek ‘Liefde in tijden van Corona’. Net als bij muziek en dans, is haar beeldende werk een drager van de expressie van passionele energie en de lyriek van het onzegbare."
]

export const cv: CvSection[] = [
  {
    "heading": "Solo exposities",
    "rows": [
      {
        "period": "2020",
        "text": "Tinder Times/monumenten voor vluchtigheid, Sexyland, Amsterdam; curator Fleur Feringa"
      },
      {
        "period": "2018",
        "text": "'Onderweg', Bagagehal/Loods 6, Amsterdam (curator; performance 'Panta Rei') *interdisciplinair*"
      },
      {
        "period": "2017",
        "text": "WG Kunst, Amsterdam"
      },
      {
        "period": "2015",
        "text": "'Falling Angel', Xávia, Spain"
      },
      {
        "period": "2009",
        "text": "AIR Proyecto 'Ace, Buenos Aires, Argentina"
      },
      {
        "period": "2006",
        "text": "De Duif, Amsterdam"
      },
      {
        "period": "1997",
        "text": "Presentatie opdracht 'Metamorphosen', OSB Bijlmer Amsterdam"
      },
      {
        "period": "1992",
        "text": "SBK, Spui Amsterdam"
      },
      {
        "period": "1992",
        "text": "Galerie Van Mourik, Rotterdam"
      },
      {
        "period": "1985",
        "text": "Galerie Vassallucci, Amsterdam"
      },
      {
        "period": "1983",
        "text": "Wetering Galerie, Amsterdam"
      },
      {
        "period": "1980",
        "text": "Galerie D'Theeboom, Amsterdam"
      }
    ]
  },
  {
    "heading": "Groeps exposities",
    "rows": [
      {
        "period": "2020",
        "text": "Nieuw Dakota: De Passage"
      },
      {
        "period": "2020",
        "text": "Arti et Amicitiae"
      },
      {
        "period": "2019",
        "text": "Amsterdam Art Weekend, Looiersgracht 60.org: Printing Plant met Rijksakademie"
      },
      {
        "period": "2019 (november)",
        "text": "Arti, Amsterdam"
      },
      {
        "period": "2018 (november)",
        "text": "Looiersgracht 60.org: Printing Plant 2018, Rijksakademie alumni"
      },
      {
        "period": "2018 (september)",
        "text": "Kunstmanifestatie 'Onderweg', Bagagehal, Amsterdam"
      },
      {
        "period": "2018 ((juli)",
        "text": "Arti et Amicitiae, Amsterdam ('Update', Nieuwe leden expositie)"
      },
      {
        "period": "2017",
        "text": "Josilda da Conceicao Gallery, Amsterdam"
      },
      {
        "period": "2017",
        "text": "Arti et Amicitiae, Amsterdam (Salon)"
      },
      {
        "period": "2015",
        "text": "Boekpresentatie/ duo expositie Kompaszaal, Amsterdam"
      },
      {
        "period": "2014",
        "text": "Cobra museum, Amstelveen"
      },
      {
        "period": "2013-2014",
        "text": "FDA 'Follow the Money' , Amsterdam met oa Aldert Mantje"
      },
      {
        "period": "1997",
        "text": "Theater De Krakeling, Amsterdam (project 'Kunstenaarskinderboeken')"
      },
      {
        "period": "1996",
        "text": "'Multiples', De Annex, Galerie Maria Chailloux, Amsterdam"
      },
      {
        "period": "1994",
        "text": "'Hommage aan Mondriaan', Galerie Speijer & Vogtschmidt, Amsterdam"
      },
      {
        "period": "1993",
        "text": "'Grafiek Nu', Singer Museum, Laren"
      },
      {
        "period": "1986",
        "text": "Gemeenteaankopen, Arti, Amsterdam"
      },
      {
        "period": "1986",
        "text": "'Galerie '86', Beurs van Berlage, Amsterdam"
      },
      {
        "period": "1985",
        "text": "Gallery De Expeditie, Amsterdam"
      },
      {
        "period": "1984",
        "text": "Vorpal Gallery, New York"
      },
      {
        "period": "1984",
        "text": "Gallerie Vassallucci, Amsterdam"
      }
    ]
  },
  {
    "heading": "A.I.R. (artist in residence)",
    "rows": [
      {
        "period": "2015",
        "text": "Fundacion Knecht/Drenth, Callosa, Spanje"
      },
      {
        "period": "2009",
        "text": "Proyecto 'Ace, Buenos Aires"
      },
      {
        "period": "1981",
        "text": "New York"
      }
    ]
  },
  {
    "heading": "Prijzen",
    "rows": [
      {
        "period": "1977",
        "text": "Prix de Rome silver"
      }
    ]
  },
  {
    "heading": "Subsidies",
    "rows": [
      {
        "period": "2020",
        "text": "Amsterdams Fonds voor de kunst - projectsubsidie"
      },
      {
        "period": "2020",
        "text": "Gemeente Amsterdam, Kunst en Cultuur , projectsubsidie"
      },
      {
        "period": "1992-1994",
        "text": "Stipendia, Fonds voor Beeldende Kunst"
      },
      {
        "period": "1987-1989",
        "text": "Stipendia, Fonds voor Beeldende Kunst"
      },
      {
        "period": "1982",
        "text": "Stipendium, Ministerie v Cultuur"
      },
      {
        "period": "1981",
        "text": "Reisbeurs New York, Ministerie v Cultuur"
      }
    ]
  },
  {
    "heading": "Publicaties",
    "rows": [
      {
        "period": "2015",
        "text": "'Falling Angel'"
      },
      {
        "period": "2008",
        "text": "'Marijke de Vries, paintings and drawings'"
      },
      {
        "period": "1993",
        "text": "Catalogus 'Grafiek Nu'"
      },
      {
        "period": "1989",
        "text": "\"BKV\" , Fonds voor Beeldende Kunst"
      }
    ]
  },
  {
    "heading": "Grafiek",
    "rows": [
      {
        "period": "2019",
        "text": "Multiple: Tinder Times, kunstenaarsboek oa bij AGA lab"
      },
      {
        "period": "2009",
        "text": "Multiples bij Proyecto 'Ace, Buenos Aires"
      },
      {
        "period": "1994",
        "text": "Litho, Thoets, Amsterdam"
      },
      {
        "period": "1992",
        "text": "Zeefdruk \"Z.T.\" , Zeger Reijers' Multiples, Rotterdam"
      },
      {
        "period": "1992",
        "text": "Zeefdruk map \"TIBIDABO\" , Zeger Reijers' Multiples, Rotterdam"
      }
    ]
  },
  {
    "heading": "Opdrachten",
    "rows": [
      {
        "period": "1996-1997",
        "text": "Monumentale opdracht Open Schoolgemeenschap Bijlmer Amsterdams Fonds voor de Kunst/ gemeente Amsterdam percentageregeling"
      },
      {
        "period": "1992",
        "text": "Opdracht zeefdruk \"When most I wink\" SBK Amsterdam, druk Z. Reijers"
      },
      {
        "period": "1991",
        "text": "Vrije monumentale opdracht NDSM opdracht gemeente Amsterdam"
      },
      {
        "period": "1980",
        "text": "Muurschildering Kinkerbuurt opdracht gemeente Amsterdam"
      }
    ]
  },
  {
    "heading": "Aankopen",
    "rows": [
      {
        "period": "1985-heden:",
        "text": "aankopen via galeries, SBK en door gemeente Amsterdam en Schiedam"
      }
    ]
  },
  {
    "heading": "Pers",
    "rows": [
      {
        "period": "2020",
        "text": "interviews over project Tinder Times op Vice.nl en NPO radio2"
      }
    ]
  }
]
