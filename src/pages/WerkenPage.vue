<script setup lang="ts">
import { computed, ref } from 'vue'
import { series, type Work } from '../content/works'
import manifest from '../generated/images.json'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import ArtLightbox, { type Slide } from '../components/ArtLightbox.vue'

interface Entry {
  width: number
  height: number
  sources: Record<string, { entries: { w: number; url: string }[] }>
  fallback: string
}
const images = manifest.images as unknown as Record<string, Entry>
const media = manifest.media as Record<string, string>

/** "Titel, mixed media on canvas, 120 × 120 cm, 2020" */
function caption(w: Work): string {
  return [w.title, w.medium, w.dimensions && `${w.dimensions} cm`, w.year, w.note]
    .filter(Boolean)
    .join(', ')
}

/*
 * One flat slide list across every series, so the lightbox's next/previous walk
 * the whole page the way the original's did.
 */
const flat = computed(() => series.flatMap((s) => s.groups.flatMap((g) => g.works)))

const slides = computed<Slide[]>(() =>
  flat.value
    .filter((w): w is Work => w.kind === 'image')
    .map((w) => {
      const e = images[w.image]
      const webp = e.sources.webp.entries
      return {
        src: webp[webp.length - 1].url,
        srcset: webp.map((v) => `${v.url} ${v.w}w`).join(', '),
        width: e.width,
        height: e.height,
        thumb: e.sources.webp.entries[0].url,
        caption: caption(w),
        alt: caption(w),
      }
    }),
)

/** Index of a work within `slides` — videos are skipped, so it is not the DOM order. */
const slideIndex = computed(() => {
  const map = new Map<string, number>()
  let i = 0
  for (const w of flat.value) if (w.kind === 'image') map.set(w.image, i++)
  return map
})

const lightbox = ref<InstanceType<typeof ArtLightbox> | null>(null)

function openWork(work: Work) {
  lightbox.value?.open(slideIndex.value.get(work.image) ?? 0)
}
</script>

<template>
  <div class="prose">
    <h1 class="sr-only">Werken</h1>

    <section v-for="s in series" :key="s.id" :id="s.id">
      <h2 class="series-title">{{ s.title }}</h2>

      <template v-for="(group, gi) in s.groups" :key="gi">
        <h3 v-if="group.label" class="group-label">{{ group.label }}</h3>

        <ul class="grid">
          <li
            v-for="(work, wi) in group.works"
            :key="wi"
            :style="{ '--h': `${work.kind === 'image' ? work.displayHeight : 250}px` }"
          >
            <video
              v-if="work.kind === 'video'"
              :src="media[work.src]"
              controls
              preload="none"
              playsinline
            >
              Je browser kan deze video niet afspelen.
            </video>

            <button v-else type="button" class="thumb" @click="openWork(work)">
              <ResponsiveImage
                :src="work.image"
                :alt="caption(work)"
                :height="work.displayHeight"
                sizes="(max-width: 780px) 90vw, 400px"
              />
              <span class="sr-only">Bekijk groter: {{ caption(work) }}</span>
            </button>
          </li>
        </ul>
      </template>
    </section>

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

/*
 * On the werken page the series titles were plain bold body text, not the <h2>
 * treatment the series page used — no rule, no larger size. Kept as <h2> for
 * document structure, styled to match.
 */
.series-title {
  margin: 0 0 0.6em var(--text-inset);
  padding: 2% 0 0;
  border-left: 0;
  font-size: 1em;
  font-weight: bold;
  line-height: var(--lh-body);
}

.group-label {
  margin: 0 0 0.4em var(--text-inset);
  padding-top: 1.5%;
  font-size: 1em;
  font-weight: normal;
  line-height: var(--lh-body);
}

/*
 * The original sized each thumbnail with a height attribute and let them flow
 * as inline-blocks, producing rows of equal-height, variable-width images. Same
 * result here — but as a flex row that can reflow, instead of a fixed pixel
 * height that forced the page 560px wide on a 390px phone.
 */
.grid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1em;
  list-style: none;
  margin: 0 0 1em var(--text-inset);
  padding: 0;
}

.grid > li {
  height: var(--h);
}

.grid :deep(img),
.grid video {
  height: var(--h);
  width: auto;
  max-width: none;
}

.thumb {
  display: block;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  height: 100%;
}

.thumb :deep(img) {
  opacity: 1;
  transition: opacity var(--t-image) var(--ease);
}

.thumb:hover :deep(img),
.thumb:focus-visible :deep(img) {
  opacity: 0.6;
}

@media (max-width: 780px) {
  .series-title,
  .group-label {
    margin-left: 0;
  }

  .grid {
    margin-left: 0;
    gap: 1.5em;
  }

  /* Height-driven sizing is what overflowed the original. Width-driven here. */
  .grid > li {
    height: auto;
    width: 100%;
  }

  .grid :deep(img),
  .grid video {
    height: auto;
    width: 100%;
  }
}
</style>
