import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { content } from './content'
import type { Lang } from './content/types'

/** The current route's language and its content bundle. */
export function useLocale() {
  const route = useRoute()
  const lang = computed<Lang>(() => route.meta.lang ?? 'nl')
  const c = computed(() => content[lang.value])
  return { lang, c }
}
