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

/** "Titel, mixed media on canvas, 120 x 120 cm, 2020" — as the original captioned it. */
function caption(w: Work): string {
  return [w.title, w.medium, w.dimensions && `${w.dimensions} cm`, w.year, w.note]
    .filter(Boolean)
    .join(', ')
}

/*
 * Alt text is not the caption. Seven of the Falling angel drawings are captioned
 * only "untitled", which as alt text tells a screen-reader user nothing and
 * repeats seven times; those get described by their place in the series instead.
 */
function altFor(w: Work, seriesTitle: string, groupLabel: string | undefined, n: number): string {
  const parts = [w.title, w.medium, w.dimensions && `${w.dimensions} cm`, w.year].filter(Boolean)
  if (parts.length > 1) return parts.join(', ')
  const where = groupLabel ? `${groupLabel} (${n})` : `werk ${n}`
  return `${w.title} — ${where} uit de serie ${seriesTitle}`
}

/*
 * One flat list across every series, carrying the context each work needs for
 * its alt text, so the grid and the lightbox describe images identically.
 */
const flat = computed(() =>
  series.flatMap((s) =>
    s.groups.flatMap((g) =>
      g.works.map((work, i) => ({ work, seriesTitle: s.title, groupLabel: g.label, n: i + 1 })),
    ),
  ),
)

/**
 * Alt text for one work, keyed by its image.
 *
 * Several works share a caption in the source on purpose — two details of one
 * diptych, five photographs of a single print session. That is fine as a
 * caption, but as alt text it means hearing the same sentence five times, so
 * duplicates get numbered.
 */
const altByImage = computed(() => {
  const base = new Map<string, string>()
  const counts = new Map<string, number>()

  for (const { work, seriesTitle, groupLabel, n } of flat.value) {
    if (work.kind !== 'image') continue
    const alt = altFor(work, seriesTitle, groupLabel, n)
    base.set(work.image, alt)
    counts.set(alt, (counts.get(alt) ?? 0) + 1)
  }

  const seen = new Map<string, number>()
  const map = new Map<string, string>()
  for (const [image, alt] of base) {
    const total = counts.get(alt) ?? 1
    if (total === 1) {
      map.set(image, alt)
      continue
    }
    const i = (seen.get(alt) ?? 0) + 1
    seen.set(alt, i)
    map.set(image, `${alt} (${i} van ${total})`)
  }
  return map
})

const slides = computed<Slide[]>(() =>
  flat.value
    .filter((f): f is typeof f & { work: Work } => f.work.kind === 'image')
    .map(({ work }) => {
      const e = images[work.image]
      const webp = e.sources.webp.entries
      return {
        src: webp[webp.length - 1].url,
        srcset: webp.map((v) => `${v.url} ${v.w}w`).join(', '),
        width: e.width,
        height: e.height,
        thumb: webp[0].url,
        caption: caption(work),
        alt: altByImage.value.get(work.image) ?? caption(work),
      }
    }),
)

/** Index of a work within `slides` — videos are skipped, so it is not the DOM order. */
const slideIndex = computed(() => {
  const map = new Map<string, number>()
  let i = 0
  for (const { work } of flat.value) if (work.kind === 'image') map.set(work.image, i++)
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

    <section v-for="(s, si) in series" :key="s.id" :id="s.id">
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
                :alt="altByImage.get(work.image) ?? caption(work)"
                :height="work.displayHeight"
                sizes="(max-width: 780px) 90vw, 400px"
                :eager="si === 0 && gi === 0 && wi === 0"
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
