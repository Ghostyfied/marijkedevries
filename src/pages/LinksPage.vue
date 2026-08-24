<script setup lang="ts">
import { links } from '../content/links'
</script>

<template>
  <div class="prose">
    <h1 class="sr-only">Links</h1>
    <ul class="link-list">
      <li v-for="link in links" :key="link.href">
        <a :href="link.href" target="_blank" rel="noopener">{{ link.label }}</a>
        <span v-if="link.description"> — {{ link.description }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.link-list {
  list-style: none;
  padding: 0;
  margin-top: 0;
}

.link-list li {
  margin-bottom: 1.4em;
}
</style>
