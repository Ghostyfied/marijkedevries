/**
 * The works page in English. The works themselves are shared with the Dutch
 * site — captions on the original were already largely English — so only the
 * three series titles are localised here.
 */

import type { Series } from '../types'
import { series as nlSeries } from '../nl/works'

const titles: Record<string, string> = {
  'liefde-in-tijden-van-corona-2020': 'Love in Times of Corona (2020)',
  'tinder-times-eind-2018-heden': 'Tinder Times (late 2018 - present)',
  'falling-angel-2015': 'Falling Angel (2015)',
}

export const series: Series[] = nlSeries.map((s) => ({
  ...s,
  title: titles[s.id] ?? s.title,
}))
