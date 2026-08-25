/**
 * The four essays on the series page, in English.
 *
 * "Works in perspex" and the first Tinder Times paragraph use Marijke's own
 * previously published English texts (the old /eng/ pages); the others are
 * DRAFT translations awaiting her sign-off — Rob Perrée's essay in particular
 * should not go live without approval.
 */
import type { Essay } from '../types'

import essay0 from './series/monument-voor-de-liefde.md'
import essay1 from './series/liefde-in-tijden-van-corona-2020.md'
import essay2 from './series/tinder-times-2020.md'
import essay3 from './series/werken-in-perspex.md'

export const essays: Essay[] = [
  { id: 'monument-voor-de-liefde', heading: 'MONUMENT FOR LOVE', html: essay0 },
  { id: 'liefde-in-tijden-van-corona-2020', heading: 'Love in Times of Corona (2020)', html: essay1 },
  { id: 'tinder-times-2020', heading: 'Tinder Times (2020)', html: essay2 },
  { id: 'werken-in-perspex', heading: 'Works in perspex', html: essay3 },
]
