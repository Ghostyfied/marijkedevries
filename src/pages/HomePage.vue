<script setup lang="ts">
import ResponsiveImage from '../components/ResponsiveImage.vue'
</script>

<template>
  <div class="prose">
    <h1 class="sr-only">Marijke de Vries</h1>
    <p class="home-image">
      <ResponsiveImage
        src="model_session_bas.jpg"
        alt="Marijke de Vries aan het werk in haar atelier"
        sizes="(max-width: 780px) 90vw, 260px"
        :height="341"
        eager
      />
    </p>
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

@media (max-width: 780px) {
  .home-image :deep(img) {
    height: auto;
    width: 100%;
  }
}
</style>
