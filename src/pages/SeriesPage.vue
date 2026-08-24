<script setup lang="ts">
import { essays } from '../content/essays'
</script>

<template>
  <div class="prose">
    <h1 class="sr-only">Series en thema's</h1>
    <section v-for="essay in essays" :key="essay.id" :id="essay.id">
      <h2>{{ essay.heading }}</h2>
      <!-- eslint-disable-next-line vue/no-v-html -- build-time Markdown from src/content/series -->
      <div class="essay" v-html="essay.html" />
    </section>
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
</style>
