/**
 * The werken page. Originally extracted from the old site's markup, since then
 * HAND-CURATED to Marijke's feedback (removals, moves and relabels of
 * 31 August 2026) — do not regenerate this file from the content inventory.
 *
 * Captions were one string per work — "Title ⎪ medium ⎪ 120 x 120 ⎪ 2020" —
 * held in a title attribute that only the lightbox read. Split into fields, they
 * drive the caption, the alt text and the page copy from one place.
 *
 * `image` and `src` are keys into src/generated/images.json, which the image
 * build writes from assets/originals/. Masters removed from the page stay in
 * assets/originals/ so they can come back without re-supplying files.
 */

import type { Series } from '../types'

export const series: Series[] = [
  /*
   * Recent work by year, newest first — from Marijke's overview spreadsheet of
   * 14 September 2026 (Overzicht_kunstwerken26_voor_website.xlsx). Order within
   * a year follows the spreadsheet. The 2020 entry is, per her instruction, a
   * link to an Instagram video rather than an image.
   */
  {
    "title": "2026",
    "id": "werk-2026",
    "groups": [
      {
        "works": [
          {
            "kind": "image",
            "image": "recent/Sister, sister.png",
            "displayHeight": 250,
            "title": "Sister, sister",
            "medium": "oil and mixed media on canvas",
            "dimensions": "70 x 90",
            "year": 2026
          },
          {
            "kind": "image",
            "image": "recent/Gaining my senses.png",
            "displayHeight": 195,
            "title": "Gaining my senses",
            "medium": "oil and mixed media on canvas",
            "dimensions": "24 x 30",
            "year": 2026
          },
          {
            "kind": "image",
            "image": "recent/onderwereld.png",
            "displayHeight": 195,
            "title": "onderwereld",
            "medium": "oil and mixed media on canvas",
            "dimensions": "24 x 30",
            "year": 2026
          },
          {
            "kind": "image",
            "image": "recent/I am your mirror.png",
            "displayHeight": 220,
            "title": "I am your mirror",
            "medium": "oil and mixed media on mirror",
            "dimensions": "45 x 45",
            "year": 2026
          },
          {
            "kind": "image",
            "image": "recent/het schimmenrijk.png",
            "displayHeight": 250,
            "title": "het schimmenrijk",
            "medium": "oil and mixed media on canvas",
            "dimensions": "70 x 90",
            "year": 2026
          },
          {
            "kind": "image",
            "image": "recent/casita.png",
            "displayHeight": 195,
            "title": "casita",
            "medium": "oil on canvas",
            "dimensions": "24 x 30",
            "year": 2026
          },
          {
            "kind": "image",
            "image": "recent/bloesempark.png",
            "displayHeight": 240,
            "title": "bloesempark",
            "medium": "oil and mixed media on canvas",
            "dimensions": "80 x 80",
            "year": 2026
          },
          {
            "kind": "image",
            "image": "recent/Henkie.png",
            "displayHeight": 185,
            "title": "Henkie",
            "medium": "oil on canvas",
            "dimensions": "20 x 30",
            "year": 2026
          },
          {
            "kind": "image",
            "image": "recent/smokers.png",
            "displayHeight": 185,
            "title": "smokers",
            "medium": "oil and mixed media on canvas",
            "dimensions": "20 x 30",
            "year": 2026
          },
          {
            "kind": "image",
            "image": "recent/Eva.png",
            "displayHeight": 170,
            "title": "Eva",
            "medium": "oil on canvas",
            "dimensions": "18 x 24",
            "year": 2026
          }
        ]
      }
    ]
  },
  {
    "title": "2025",
    "id": "werk-2025",
    "groups": [
      {
        "works": [
          {
            "kind": "image",
            "image": "recent/Wedding vows.png",
            "displayHeight": 195,
            "title": "Wedding vows",
            "medium": "oil on canvas",
            "dimensions": "24 x 30",
            "year": 2025
          },
          {
            "kind": "image",
            "image": "recent/a visit to the dentist.png",
            "displayHeight": 220,
            "title": "a visit to the dentist",
            "medium": "oil and mixed media on canvas",
            "dimensions": "40 x 50",
            "year": 2025
          },
          {
            "kind": "image",
            "image": "recent/hosting my ghosts.png",
            "displayHeight": 250,
            "title": "hosting my ghosts",
            "medium": "oil and mixed media on canvas",
            "dimensions": "80 x 60",
            "year": 2025
          },
          {
            "kind": "image",
            "image": "recent/smoker small.png",
            "displayHeight": 175,
            "title": "smoker small",
            "medium": "oil and charcoal on canvas",
            "dimensions": "18 x 24",
            "year": 2025
          },
          {
            "kind": "image",
            "image": "recent/la fumeuse.png",
            "displayHeight": 260,
            "title": "la fumeuse",
            "medium": "oil and mixed media on canvas",
            "dimensions": "120 x 120",
            "year": 2025
          },
          {
            "kind": "image",
            "image": "recent/digging.png",
            "displayHeight": 250,
            "title": "digging",
            "medium": "oil and mixed media on canvas",
            "dimensions": "60 x 110",
            "year": 2025
          },
          /*
           * "in Buenos Aires with pneumonia" (oil and mixed media on canvas,
           * 120 x 120, 2025) belongs here — photo not yet supplied. Only a
           * cropped Instagram version exists; awaiting the real file.
           */
          {
            "kind": "image",
            "image": "recent/dwaler.png",
            "displayHeight": 195,
            "title": "dwaler",
            "medium": "oil and mixed media on canvas",
            "dimensions": "24 x 30",
            "year": 2025
          },
          {
            "kind": "image",
            "image": "recent/Icarus.png",
            "displayHeight": 260,
            "title": "Icarus",
            "medium": "oil and mixed media on perspex",
            "dimensions": "100 x 140",
            "year": 2025
          },
          {
            "kind": "image",
            "image": "recent/Gitana Russa.png",
            "displayHeight": 175,
            "title": "Gitana Russa",
            "medium": "pen, gouache on book page",
            "dimensions": "15 x 23",
            "year": 2025
          },
          {
            "kind": "image",
            "image": "recent/abrazo (detail).png",
            "displayHeight": 220,
            "title": "abrazo (detail)",
            "medium": "oil and mixed media on canvas",
            "year": 2025
          }
        ]
      }
    ]
  },
  {
    "title": "2024",
    "id": "werk-2024",
    "groups": [
      {
        "works": [
          {
            "kind": "image",
            "image": "recent/Tribute to Anja.png",
            "displayHeight": 185,
            "title": "Tribute to Anja",
            "medium": "oil and mixed media on canvas",
            "dimensions": "20 x 30",
            "year": 2024
          },
          {
            "kind": "image",
            "image": "recent/Parque de los inmigrantes de Armenia.png",
            "displayHeight": 195,
            "title": "Parque de los inmigrantes de Armenia",
            "medium": "oil and mixed media on canvas",
            "dimensions": "24 x 30",
            "year": 2024
          },
          {
            "kind": "image",
            "image": "recent/El Beso.png",
            "displayHeight": 175,
            "title": "El Beso",
            "medium": "oil on canvas",
            "dimensions": "18 x 24",
            "year": 2024
          },
          {
            "kind": "image",
            "image": "recent/Dance couple in orange.png",
            "displayHeight": 185,
            "title": "Dance couple in orange",
            "medium": "oil and mixed media on canvas",
            "dimensions": "20 x 30",
            "year": 2024
          }
        ]
      }
    ]
  },
  {
    "title": "2020",
    "id": "werk-2020",
    "groups": [
      {
        "works": [
          {
            "kind": "link",
            "href": "https://www.instagram.com/p/DdJm4zquVti/",
            "title": "Installatie Tinder Times Project",
            "medium": "various works and 'peepshow'",
            "year": 2020
          }
        ]
      }
    ]
  },
  {
    "title": "2019",
    "id": "werk-2019",
    "groups": [
      {
        "works": [
          {
            "kind": "image",
            "image": "recent/Dress.png",
            "displayHeight": 250,
            "title": "Dress",
            "medium": "oil and mixed media on canvas",
            "dimensions": "80 x 110",
            "year": 2019
          }
        ]
      }
    ]
  },
  {
    "title": "Liefde in tijden van Corona (2020)",
    "id": "liefde-in-tijden-van-corona-2020",
    "groups": [
      {
        "works": [
          {
            "kind": "image",
            "image": "love-in-times-of-corona/love-in-the-times-of-corona.jpg",
            "displayHeight": 250,
            "title": "Love in the times of Corona",
            "medium": "mixed media on canvas",
            "dimensions": "120 x 120",
            "year": 2020
          },
          {
            "kind": "image",
            "image": "love-in-times-of-corona/nathan.jpg",
            "displayHeight": 250,
            "title": "Nathan",
            "medium": "marker, mixed media on/behind perspex",
            "dimensions": "46 x 19,5",
            "year": 2020
          },
          {
            "kind": "image",
            "image": "love-in-times-of-corona/blowjob.jpg",
            "displayHeight": 250,
            "title": "Blowjob",
            "medium": "mixed media and plastic on canvas",
            "dimensions": "40 x 34,5",
            "year": 2020
          },
          {
            "kind": "image",
            "image": "love-in-times-of-corona/bas-iphone.jpg",
            "displayHeight": 250,
            "title": "Bas- Iphone",
            "medium": "model painting on ricepaper, vernis graveur, acrylic paint",
            "dimensions": "76 x 52",
            "year": 2020
          },
          {
            "kind": "image",
            "image": "love-in-times-of-corona/omer.jpg",
            "displayHeight": 250,
            "title": "Ömer",
            "medium": "model painting on ricepaper, vernis graveur, acrylic paint, collage",
            "dimensions": "76 x 52",
            "year": 2020
          },
          {
            "kind": "image",
            "image": "love-in-times-of-corona/muze.jpg",
            "displayHeight": 200,
            "title": "Muze",
            "medium": "drawin",
            "dimensions": "12,5 x 12,5",
            "year": 2020
          },
          {
            "kind": "image",
            "image": "Swimmers_, detail of dyptich 200 x 200 cm .jpg",
            "displayHeight": 200,
            "title": "’swimmers’",
            "medium": "mixed media on canvas",
            "dimensions": "200 x 200",
            "year": 2020
          },
          {
            "kind": "image",
            "image": "Taste. 77 x 62  cm , perspex mixed media.jpg",
            "displayHeight": 200,
            "title": "Taste",
            "medium": "mixed media on perspex",
            "dimensions": "77 x 62",
            "year": 2020
          }
        ]
      }
    ]
  },
  {
    "title": "Tinder Times (eind 2018-heden)",
    "id": "tinder-times-eind-2018-heden",
    "groups": [
      {
        "label": "model paintings on rice paper",
        "works": [
          {
            "kind": "image",
            "image": "tinder-times/4-project.jpg",
            "displayHeight": 250,
            "title": "Tindertimes tekeningen",
            "medium": "mixed media op rijstpapier, Gabriel",
            "dimensions": "50 x 78",
            "year": 2019
          },
          {
            "kind": "image",
            "image": "tinder-times/3-project.jpg",
            "displayHeight": 226,
            "title": "Tindertimes tekeningen",
            "medium": "mixed media op rijstpapier, serie Erik",
            "dimensions": "50 x 78",
            "year": 2019
          },
          {
            "kind": "image",
            "image": "tinder-times/1-project.jpg",
            "displayHeight": 239,
            "title": "Tindertimes tekeningen",
            "medium": "mixed media op rijstpapier, serie Erik",
            "dimensions": "50 x 78",
            "year": 2019
          },
          {
            "kind": "image",
            "image": "tinder-times/2-project.jpg",
            "displayHeight": 180,
            "title": "Tindertimes tekeningen",
            "medium": "mixed media op rijstpapier, serie Erik",
            "dimensions": "50 x 78",
            "year": 2019
          }
        ]
      },
      {
        "label": "works on canvas 2019-2020",
        "works": [
          {
            "kind": "image",
            "image": "tinder-times/8-project.jpg",
            "displayHeight": 250,
            "title": "The blue dress",
            "medium": "mixed media op canvas, met details",
            "dimensions": "187 x 167",
            "year": 2019
          },
          {
            "kind": "image",
            "image": "tinder-times/5-project.jpg",
            "displayHeight": 252,
            "title": "Wanna play pool?",
            "medium": "mixed media op canvas",
            "dimensions": "100 x 80",
            "year": 2019
          },
          {
            "kind": "image",
            "image": "tinder-times/6-project.jpg",
            "displayHeight": 264,
            "title": "The river",
            "medium": "mixed media and perspex on canvas",
            "dimensions": "100 x 80",
            "year": 2019,
            "note": "with details and instagram post"
          },
          {
            "kind": "image",
            "image": "tinder-times/7-project.jpg",
            "displayHeight": 286,
            "title": "Dress",
            "medium": "mixed media op canvas",
            "dimensions": "110 x 80",
            "year": 2018
          },
          {
            "kind": "image",
            "image": "Room, 24 x 18, oil on canvas.jpg",
            "displayHeight": 150,
            "title": "Room",
            "medium": "oil on paper",
            "dimensions": "16 x 16",
            "year": 2020
          }
        ]
      },
      {
        "label": "perspex works",
        "works": [
          {
            "kind": "image",
            "image": "love-in-times-of-corona/harbor.jpg",
            "displayHeight": 250,
            "title": "Harbor",
            "medium": "mixed media and wood on/behind/between two layers of transparent perspex",
            "dimensions": "95 x 70",
            "year": 2019
          },
          {
            "kind": "image",
            "image": "tinder-times/stranger-in-a-strange-land.jpg",
            "displayHeight": 250,
            "title": "Stranger in a strange land",
            "medium": "mixed media on and behind perspex",
            "dimensions": "175 x 116",
            "year": 2019
          },
          {
            "kind": "image",
            "image": "tinder-times/stranger-in-a-strange-land-detail.jpg",
            "displayHeight": 250,
            "title": "Stranger in a strange land (detail)",
            "dimensions": "175 x 116",
            "year": 2019
          }
        ]
      },
      {
        "label": "multiple Tinder Times",
        "works": [
          {
            "kind": "image",
            "image": "tinder-times/9-project.jpg",
            "displayHeight": 206,
            "title": "Tinder times",
            "medium": "multiple, mixed media & digital print",
            "dimensions": "100 + 100 x 16",
            "year": 2019
          },
          {
            "kind": "image",
            "image": "tinder-times/10-project.jpg",
            "displayHeight": 133,
            "title": "Voorbereiden voor zeefdrukken multiple Tinder Times in Aga Lab",
            "year": 2019
          },
          {
            "kind": "image",
            "image": "tinder-times/11-project.jpg",
            "displayHeight": 133,
            "title": "Voorbereiden voor zeefdrukken multiple Tinder Times in Aga Lab",
            "year": 2019
          },
          {
            "kind": "image",
            "image": "tinder-times/12-project.jpg",
            "displayHeight": 140,
            "title": "Voorbereiden voor zeefdrukken multiple Tinder Times in Aga Lab",
            "year": 2019
          },
          {
            "kind": "image",
            "image": "tinder-times/13-project.jpg",
            "displayHeight": 180,
            "title": "Voorbereiden voor zeefdrukken multiple Tinder Times in Aga Lab",
            "year": 2019
          },
          {
            "kind": "image",
            "image": "tinder-times/14-project.jpg",
            "displayHeight": 279,
            "title": "Voorbereiden voor zeefdrukken multiple Tinder Times in Aga Lab",
            "year": 2019
          }
        ]
      }
    ]
  },
  {
    "title": "Falling angel (2015)",
    "id": "falling-angel-2015",
    "groups": [
      {
        "label": "perspex works",
        "works": [
          {
            "kind": "image",
            "image": "falling-angel/falling-angel.jpg",
            "displayHeight": 250,
            "title": "Falling angel",
            "dimensions": "178 x 126",
            "year": 2015
          },
          {
            "kind": "video",
            "src": "falling-angel/falling-angel.mp4"
          }
        ]
      },
      {
        "label": "drawings",
        "works": [
          {
            "kind": "image",
            "image": "falling-angel/1-tekening.jpg",
            "displayHeight": 250,
            "title": "untitled"
          },
          {
            "kind": "image",
            "image": "falling-angel/2-tekening.jpg",
            "displayHeight": 250,
            "title": "untitled"
          },
          {
            "kind": "image",
            "image": "falling-angel/3-tekening.jpg",
            "displayHeight": 250,
            "title": "untitled"
          },
          {
            "kind": "image",
            "image": "falling-angel/4-tekening.jpg",
            "displayHeight": 250,
            "title": "untitled"
          },
          {
            "kind": "image",
            "image": "falling-angel/5-tekening.jpg",
            "displayHeight": 250,
            "title": "untitled"
          },
          {
            "kind": "image",
            "image": "falling-angel/6-tekening.jpg",
            "displayHeight": 250,
            "title": "untitled"
          },
          {
            "kind": "image",
            "image": "falling-angel/7-tekening.jpg",
            "displayHeight": 250,
            "title": "untitled"
          }
        ]
      }
    ]
  }
]
