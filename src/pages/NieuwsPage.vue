<script setup lang="ts">
import { computed, ref } from 'vue'
import manifest from '../generated/images.json'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import { asset } from '../asset'
import ArtLightbox, { type Slide } from '../components/ArtLightbox.vue'

const POSTER = 'dwaler-kunsttraject-2026.jpeg'
const ALT =
  'Affiche van de tentoonstelling Dwaler van Marijke de Vries, Kunsttraject-etalages in de Staatsliedenbuurt, Amsterdam, 2 september tot en met 14 november 2026'

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
      caption: 'Dwaler — Kunsttraject-etalages, Staatsliedenbuurt, Amsterdam, 2 september t/m 14 november 2026',
      alt: ALT,
    },
  ]
})

const lightbox = ref<InstanceType<typeof ArtLightbox> | null>(null)
</script>

<template>
  <div class="prose">
    <h1 class="sr-only">Nieuws</h1>

    <!-- Details as they appear on the affiche Marijke supplied. -->
    <p>
      <strong>Dwaler</strong><br />
      Kunsttraject-etalages in de Staatsliedenbuurt, Amsterdam<br />
      2 september t/m 14 november 2026<br />
      Van Boetzelaerstraat 56, 80 en 92 en Van Hogendorpstraat 205<br />
      De schilderijen zijn dag en nacht te zien.
    </p>

    <p class="poster">
      <button type="button" class="thumb" @click="lightbox?.open(0)">
        <ResponsiveImage
          :src="POSTER"
          :alt="ALT"
          sizes="(max-width: 780px) 90vw, 560px"
          eager
        />
        <span class="sr-only">Bekijk de affiche op volledig scherm</span>
      </button>
    </p>

    <ArtLightbox ref="lightbox" :slides="slides" />
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
