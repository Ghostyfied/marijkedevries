/**
 * The werken page, extracted from the original site's markup.
 *
 * Captions there were one string per work — "Title ⎪ medium ⎪ 120 x 120 ⎪ 2020" —
 * held in a title attribute that only the lightbox read. Split into fields, they
 * drive the caption, the alt text and the page copy from one place.
 *
 * `image` and `src` are keys into src/generated/images.json, which the image
 * build writes from assets/originals/.
 */

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

export const series: Series[] = [
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
            "image": "love-in-times-of-corona/holding-falling.jpg",
            "displayHeight": 250,
            "title": "Holding/falling",
            "medium": "mixed media on and behind perspex",
            "dimensions": "140 x 96",
            "year": 2020
          },
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
            "image": "IMG_9848.jpg",
            "displayHeight": 250,
            "title": "The colours of you",
            "medium": "photo collage and mixed media on perspex",
            "dimensions": "62 x 77",
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
            "image": "Swimmers, detail of dyptich 200 x 200 cm .jpg",
            "displayHeight": 200,
            "title": "’swimmers’",
            "medium": "mixed media on canvas",
            "dimensions": "200 x 200",
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
          },
          {
            "kind": "image",
            "image": "tinder-times/shy.jpg",
            "displayHeight": 250,
            "title": "Shy",
            "medium": "model painting on ricepaper",
            "dimensions": "65 x 50",
            "year": 2019
          }
        ]
      },
      {
        "label": "works on canvas",
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
            "image": "tinder-times/blue-eyes.jpg",
            "displayHeight": 150,
            "title": "Blueeyes",
            "medium": "mixed media, plastic on canvas",
            "dimensions": "32,5 x 24",
            "year": 2019
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
            "image": "tinder-times/complementary.jpg",
            "displayHeight": 250,
            "title": "Complimentary",
            "medium": "mixed media, paper, perspex",
            "year": 2020
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
          },
          {
            "kind": "image",
            "image": "tinder-times/selfcare.jpg",
            "displayHeight": 250,
            "title": "Selfcare",
            "medium": "oil on canvas, mixed media on perspex and cardboard",
            "dimensions": "50,5x 35",
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
