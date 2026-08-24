<script setup lang="ts">
import { computed } from 'vue'
import manifest from '../generated/images.json'

const props = withDefaults(
  defineProps<{
    /** Key into the generated image manifest, e.g. `tinder-times/shy.jpg`. */
    src: string
    alt: string
    /** The `sizes` attribute — what width this will actually render at. */
    sizes?: string
    /** Rendered height in px, mirroring the original's fixed thumbnail heights. */
    height?: number
    eager?: boolean
  }>(),
  { sizes: '100vw', eager: false },
)

interface Entry {
  slug: string
  width: number
  height: number
  aspect: number
  sources: Record<string, { type: string; entries: { w: number; url: string }[] }>
  lqip: string
  fallback: string
}

const images = manifest.images as unknown as Record<string, Entry>

const entry = computed(() => {
  const found = images[props.src]
  if (!found) throw new Error(`No generated image for "${props.src}" — run npm run images`)
  return found
})

/** Ordered widest-support-last so the browser picks the best it understands. */
const sourceList = computed(() =>
  (['avif', 'webp'] as const)
    .map((ext) => entry.value.sources[ext])
    .filter(Boolean)
    .map((s) => ({
      type: s.type,
      srcset: s.entries.map((e) => `${e.url} ${e.w}w`).join(', '),
    })),
)

const jpegSrcset = computed(() =>
  entry.value.sources.jpg.entries.map((e) => `${e.url} ${e.w}w`).join(', '),
)

/*
 * Intrinsic width and height go on the <img> so the browser reserves the right
 * box before the bytes arrive. When a display height is given, the width is
 * derived from the real aspect ratio rather than guessed.
 */
const box = computed(() => {
  if (!props.height) return { width: entry.value.width, height: entry.value.height }
  return { width: Math.round(props.height * entry.value.aspect), height: props.height }
})
</script>

<template>
  <picture>
    <source v-for="s in sourceList" :key="s.type" :type="s.type" :srcset="s.srcset" :sizes="sizes" />
    <img
      :src="entry.fallback"
      :srcset="jpegSrcset"
      :sizes="sizes"
      :alt="alt"
      :width="box.width"
      :height="box.height"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      decoding="async"
      :style="{ backgroundImage: `url(${entry.lqip})` }"
    />
  </picture>
</template>

<style scoped>
img {
  display: block;
  background-size: cover;
  background-position: center;
  max-width: 100%;
  height: auto;
}
</style>
