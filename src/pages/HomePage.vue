<script setup lang="ts">
import { computed } from 'vue'
import ResponsiveImage from '../components/ResponsiveImage.vue'
import { useLocale } from '../locale'

const { c } = useLocale()

/** The first paragraph may carry **bold** markers (the cv-style lead). */
const first = computed(() => c.value.home.paragraphs[0])
const rest = computed(() => c.value.home.paragraphs.slice(1))
</script>

<template>
  <div class="prose">
    <h1 class="sr-only">Marijke de Vries</h1>
    <p class="home-image">
      <ResponsiveImage
        src="model_session_bas.jpg"
        :alt="c.home.imageAlt"
        sizes="(max-width: 780px) 90vw, 260px"
        :height="341"
        eager
      />
    </p>

    <p>{{ first }}</p>
    <p v-for="para in rest" :key="para.slice(0, 24)" class="statement">{{ para }}</p>
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

.home-image :deep(img) {
  height: 341px;
  width: auto;
}

.prose p {
  max-width: 62ch;
}

@media (max-width: 780px) {
  .home-image :deep(img) {
    height: auto;
    width: 100%;
  }
}
</style>
