<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

export interface Slide {
  src: string
  srcset: string
  width: number
  height: number
  thumb: string
  caption: string
  alt: string
}

const props = defineProps<{ slides: Slide[] }>()

const lightbox = shallowRef<PhotoSwipeLightbox | null>(null)

/**
 * Rebuilds the fancyBox 2 presentation the original used — a white overlay at
 * 0.8, the caption below the image, an 80×80 thumbnail strip along the bottom —
 * on top of PhotoSwipe, which brings the pinch-zoom, touch and focus handling
 * the original never had.
 */
function build() {
  const pswp = new PhotoSwipeLightbox({
    dataSource: props.slides.map((s) => ({
      src: s.src,
      srcset: s.srcset,
      width: s.width,
      height: s.height,
      alt: s.alt,
    })),
    pswpModule: () => import('photoswipe'),
    bgOpacity: 0.8,
    padding: { top: 30, bottom: 130, left: 30, right: 30 },
    showHideAnimationType: 'fade',
    zoomAnimationDuration: false,
    counter: false,
    zoom: false,
    arrowPrev: true,
    arrowNext: true,
    bgClickAction: 'close',
    imageClickAction: 'next',
    tapAction: 'next',
  })

  pswp.on('uiRegister', () => {
    pswp.pswp?.ui?.registerElement({
      name: 'caption',
      order: 9,
      isButton: false,
      appendTo: 'root',
      html: '',
      onInit: (el, instance) => {
        const render = () => {
          el.textContent = props.slides[instance.currIndex]?.caption ?? ''
        }
        instance.on('change', render)
        render()
      },
    })

    pswp.pswp?.ui?.registerElement({
      name: 'thumbstrip',
      order: 10,
      isButton: false,
      appendTo: 'root',
      onInit: (el, instance) => {
        el.setAttribute('role', 'tablist')
        el.setAttribute('aria-label', 'Werken in deze serie')

        const buttons = props.slides.map((slide, i) => {
          const b = document.createElement('button')
          b.type = 'button'
          b.className = 'pswp-thumb'
          b.setAttribute('role', 'tab')
          b.title = slide.caption
          b.style.backgroundImage = `url("${slide.thumb}")`
          b.addEventListener('click', () => instance.goTo(i))
          el.appendChild(b)
          return b
        })

        const sync = () => {
          buttons.forEach((b, i) => {
            const on = i === instance.currIndex
            b.classList.toggle('is-current', on)
            b.setAttribute('aria-selected', String(on))
            if (on) b.scrollIntoView({ block: 'nearest', inline: 'center' })
          })
        }
        instance.on('change', sync)
        sync()
      },
    })
  })

  pswp.init()
  lightbox.value = pswp
  return pswp
}

function open(index: number) {
  const pswp = lightbox.value ?? build()
  pswp.loadAndOpen(index)
}

onBeforeUnmount(() => {
  lightbox.value?.destroy()
  lightbox.value = null
})

defineExpose({ open })
</script>

<template>
  <!-- PhotoSwipe renders into its own root; nothing to mount here. -->
</template>

<style>
/* fancyBox showed the image on white, not the usual dark chrome. */
.pswp {
  --pswp-bg: #ffffff;
  --pswp-placeholder-bg: #f2f2f2;
  --pswp-icon-color: #333333;
  --pswp-icon-color-secondary: #ffffff;
  --pswp-icon-stroke-color: transparent;
  --pswp-icon-stroke-width: 0;
}

.pswp__img {
  background: #ffffff;
  box-shadow: 0 0 0 12px #ffffff;
}

.pswp .pswp__caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 96px;
  z-index: 10;
  padding: 0 24px;
  color: #000305;
  font-family: var(--font-sans);
  font-size: 13px;
  letter-spacing: var(--ls-body);
  line-height: 18px;
  text-align: center;
}

.pswp .pswp__thumbstrip {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  gap: 6px;
  justify-content: center;
  overflow-x: auto;
  padding: 8px 12px 12px;
  scrollbar-width: thin;
}

.pswp .pswp-thumb {
  flex: 0 0 auto;
  width: 80px;
  height: 80px;
  padding: 0;
  border: 1px solid transparent;
  background-color: #f2f2f2;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  opacity: 0.55;
  transition: opacity var(--t-image) var(--ease);
}

.pswp .pswp-thumb:hover,
.pswp .pswp-thumb:focus-visible {
  opacity: 1;
}

.pswp .pswp-thumb.is-current {
  opacity: 1;
  border-color: #333333;
}

/* The original had no close button. Keep one — Escape alone strands touch
   users — but make it quiet. */
.pswp__button--close {
  opacity: 0.5;
}

.pswp__button--close:hover {
  opacity: 1;
}

@media (max-width: 780px) {
  .pswp .pswp__thumbstrip {
    display: none;
  }

  .pswp .pswp__caption {
    bottom: 16px;
  }
}
</style>
