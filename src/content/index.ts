import type { Lang, SiteContent } from './types'
import { nl } from './nl'
import { en } from './en'

/** All site copy, keyed by language. Pages pick via the route's meta.lang. */
export const content: Record<Lang, SiteContent> = { nl, en }
