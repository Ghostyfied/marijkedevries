<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import MainNav from './components/MainNav.vue'

const SITE_NAME = 'Marijke de Vries'
const SITE_URL = 'https://marijkedevries.nl'

const route = useRoute()

const title = computed(() =>
  route.meta.title === SITE_NAME ? SITE_NAME : `${route.meta.title} — ${SITE_NAME}`,
)
const description = computed(() => route.meta.description)
const canonical = computed(() => `${SITE_URL}${route.path}`)

useHead({
  htmlAttrs: { lang: 'nl' },
  title,
  meta: [
    { name: 'description', content: description },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonical },
    { property: 'og:locale', content: 'nl_NL' },
  ],
  link: [{ rel: 'canonical', href: canonical }],
})
</script>

<template>
  <a class="skip" href="#main">Naar de inhoud</a>

  <header class="site-header">
    <p class="site-title">Marijke de Vries</p>
    <MainNav />
  </header>

  <main id="main">
    <RouterView />
  </main>
</template>

<style scoped>
.skip {
  position: absolute;
  left: -9999px;
}

.skip:focus {
  left: 1rem;
  top: 1rem;
  z-index: 10;
  background: var(--c-bg);
  padding: 0.5rem 0.75rem;
}

.site-title {
  margin: 0;
  font-size: var(--fs-title);
  font-weight: bold;
  letter-spacing: var(--ls-display);
}
</style>
