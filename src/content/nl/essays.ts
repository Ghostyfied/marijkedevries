/** The four essays on the series page, in the order the original showed them. */
import type { Essay } from '../types'

import essay0 from './series/monument-voor-de-liefde.md'
import essay1 from './series/liefde-in-tijden-van-corona-2020.md'
import essay2 from './series/tinder-times-2020.md'
import essay3 from './series/werken-in-perspex.md'

export const essays: Essay[] = [
  { id: "monument-voor-de-liefde", heading: "MONUMENT VOOR DE LIEFDE", html: essay0 },
  { id: "liefde-in-tijden-van-corona-2020", heading: "Liefde in tijden van Corona (2020)", html: essay1 },
  { id: "tinder-times-2020", heading: "Tinder times (2020)", html: essay2 },
  { id: "werken-in-perspex", heading: "Werken in perspex", html: essay3 },
]
