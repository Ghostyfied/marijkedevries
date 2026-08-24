<script setup lang="ts">
import { navRoutes } from '../routes'

const items = navRoutes.map((r) => ({ to: r.path, label: r.meta!.nav as string }))
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
