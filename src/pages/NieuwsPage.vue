<script setup lang="ts">
import { computed, ref } from 'vue'
import manifest from '../generated/images.json'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import { asset } from '../asset'
import ArtLightbox, { type Slide } from '../components/ArtLightbox.vue'
import { useLocale } from '../locale'

const POSTER = 'dwaler-kunsttraject-2026.jpeg'
const { c } = useLocale()

interface Entry {
  width: number
  height: number
  sources: Record<string, { entries: { w: number; url: string }[] }>
}
const entry = (manifest.images as unknown as Record<string, Entry>)[POSTER]

const slides = computed<Slide[]>(() => {
  const webp = entry.sources.webp.entries
  return [
    {
      src: asset(webp[webp.length - 1].url),
      srcset: webp.map((v) => `${asset(v.url)} ${v.w}w`).join(', '),
      width: entry.width,
      height: entry.height,
      thumb: asset(webp[0].url),
      caption: c.value.nieuws.posterCaption,
      alt: c.value.nieuws.posterAlt,
    },
  ]
})

const lightbox = ref<InstanceType<typeof ArtLightbox> | null>(null)
</script>

<template>
  <div class="prose">
    <h1 class="sr-only">{{ $route.meta.title }}</h1>

    <!-- Details as they appear on the affiche Marijke supplied. -->
    <p>
      <template v-for="(line, i) in c.nieuws.lines" :key="line">
        <strong v-if="i === 0">{{ line }}</strong>
        <template v-else><br />{{ line }}</template>
      </template>
    </p>

    <p class="poster">
      <button type="button" class="thumb" @click="lightbox?.open(0)">
        <ResponsiveImage :src="POSTER" :alt="c.nieuws.posterAlt" sizes="(max-width: 780px) 90vw, 560px" eager />
        <span class="sr-only">{{ c.nieuws.fullscreenLabel }}</span>
      </button>
    </p>

    <ArtLightbox ref="lightbox" :slides="slides" :strip-label="c.works.stripLabel" />
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

.poster {
  max-width: 560px;
}

/* Same affordance as the werken thumbnails: a real button, hover fade. */
.thumb {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}

.thumb :deep(img) {
  width: 100%;
  height: auto;
  opacity: 1;
  transition: opacity var(--t-image) var(--ease);
}

.thumb:hover :deep(img),
.thumb:focus-visible :deep(img) {
  opacity: 0.85;
}
</style>
