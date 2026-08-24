<script setup lang="ts">
import { routes } from '../routes'

const items = routes.map((r) => ({ to: r.path, label: r.meta!.nav as string }))
</script>

<template>
  <nav class="main-nav" aria-label="Hoofdnavigatie">
    <ul>
      <li v-for="item in items" :key="item.to">
        <RouterLink :to="item.to">{{ item.label }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.main-nav {
  font-size: var(--fs-nav);
  line-height: var(--lh-nav);
  font-weight: bold;
  letter-spacing: var(--ls-display);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

a {
  color: var(--c-nav);
}

/* The original marks the current page by greying it out, same as hover. */
a:hover,
a.router-link-exact-active {
  color: var(--c-nav-active);
}
</style>
