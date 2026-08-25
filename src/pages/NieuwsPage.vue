<script setup lang="ts">
import ResponsiveImage from '../components/ResponsiveImage.vue'
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
      <ResponsiveImage
        src="dwaler-kunsttraject-2026.jpeg"
        alt="Affiche van de tentoonstelling Dwaler van Marijke de Vries, Kunsttraject-etalages in de Staatsliedenbuurt, Amsterdam, 2 september tot en met 14 november 2026"
        sizes="(max-width: 780px) 90vw, 420px"
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

.poster {
  max-width: 420px;
}
</style>
