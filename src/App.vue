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
    // The studio photograph from the home page, at a size that suits a share card.
    { property: 'og:image', content: `${SITE_URL}/img/model-session-bas/1200.jpg` },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [{ rel: 'canonical', href: canonical }],
})
</script>

<template>
  <a class="skip" href="#main">Naar de inhoud</a>

  <div class="layout">
    <p class="site-title">Marijke de Vries</p>
    <MainNav class="rail" />
    <main id="main" class="content">
      <RouterView />
    </main>
  </div>
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

/*
 * The original floated three stacked divs; the same geometry as a grid.
 * Column widths and insets are the measured values — see styles/tokens.css.
 */
.layout {
  display: grid;
  grid-template-columns: var(--rail-w) minmax(0, var(--content-w));
  grid-template-areas:
    'title title'
    'nav content';
  padding-top: 4%;
}

/*
 * The 47px below the title is the original's spacing measured off the rendered
 * page. There it fell out of a 10px line-height inherited onto a 25px font plus
 * two 1% paddings; stating it directly is less fragile than recreating that.
 */
.site-title {
  grid-area: title;
  margin: 0 0 47px;
  padding-left: var(--inset-title);
  font-size: var(--fs-title);
  font-weight: bold;
  line-height: 1.15;
  letter-spacing: var(--ls-display);
}

.rail {
  grid-area: nav;
  padding-left: var(--inset-nav);
}

/*
 * No left padding here. In the original, the paragraphs and the gallery
 * wrapper were siblings inside .bottom-sidebar and each carried its own 5%
 * inset; putting it on the column too would double it.
 */
.content {
  grid-area: content;
  min-width: 0;
  padding-right: 2%;
  padding-bottom: 6rem;
}

@media (max-width: 780px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'title'
      'nav'
      'content';
    padding: 4% 5% 30%;
  }

  .site-title {
    padding-left: 0;
    text-align: center;
  }

  .rail {
    padding-left: 0;
  }

  .content {
    padding: 4% 0 0;
  }
}
</style>
