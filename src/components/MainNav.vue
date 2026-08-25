<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { navRoutesFor } from '../routes'
import { useLocale } from '../locale'

const route = useRoute()
const { lang, c } = useLocale()

const items = computed(() =>
  navRoutesFor(lang.value).map((r) => ({ to: r.path as string, label: r.meta!.nav as string })),
)

/*
 * The language toggle. The original site had exactly this — an 'eng' item at
 * the bottom of the nav (li.language), commented out in 2019 when the English
 * content went stale. It links to the counterpart of the current page, so
 * switching keeps your place.
 */
const toggle = computed(() => ({
  to: route.meta.counterpart ?? (lang.value === 'nl' ? '/en' : '/'),
  label: c.value.ui.toggleLabel,
}))
</script>

<template>
  <nav class="main-nav" :aria-label="c.ui.navLabel">
    <ul>
      <li v-for="item in items" :key="item.to">
        <RouterLink :to="item.to">{{ item.label }}</RouterLink>
      </li>
      <li class="language">
        <RouterLink :to="toggle.to" :lang="lang === 'nl' ? 'en' : 'nl'">{{
          toggle.label
        }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.main-nav {
  font-size: var(--fs-nav);
  font-weight: bold;
  letter-spacing: var(--ls-display);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  height: 24px;
  line-height: var(--lh-nav);
}

/* Same offset the original gave its li.language. */
li.language {
  margin-top: 15px;
}

a {
  color: var(--c-nav);
  display: inline-block;
  line-height: 1;
}

/* The original marks the current page by greying it out, the same as hover. */
a:hover,
a.router-link-exact-active {
  color: var(--c-nav-active);
}

li.language a.router-link-exact-active {
  color: var(--c-nav);
}

@media (max-width: 780px) {
  ul {
    width: 60%;
    margin: 0 auto 10px;
  }

  li {
    width: 100%;
    text-align: center;
  }
}
</style>
