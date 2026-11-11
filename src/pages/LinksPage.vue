<script setup lang="ts">
import { useLocale } from '../locale'

const { c } = useLocale()
</script>

<template>
  <div class="prose">
    <h1 class="sr-only">Links</h1>
    <ul class="link-list">
      <li v-for="link in c.links" :key="link.href">
        <a :href="link.href" target="_blank" rel="noopener">{{ link.label }}</a>
        <span v-if="link.description"> — {{ link.description }}</span>
        <!--
          youtube-nocookie keeps YouTube from setting tracking cookies until
          the visitor actually plays the video; lazy loading keeps the iframe
          from costing anything on page load.
        -->
        <iframe
          v-if="link.youtubeId"
          class="video-embed"
          :src="`https://www.youtube-nocookie.com/embed/${link.youtubeId}`"
          :title="link.label"
          loading="lazy"
          allow="encrypted-media; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
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

.video-embed {
  display: block;
  margin-top: 0.8em;
  width: 100%;
  max-width: 560px;
  aspect-ratio: 16 / 9;
  border: 0;
}
</style>
