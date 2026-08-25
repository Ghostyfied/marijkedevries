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

    <!-- Artist statement, verbatim from Marijke's mail of 23 August 2026. -->
    <p>
      Marijke de Vries woont en werkt in Amsterdam en is alumna van de Rijksakademie en Prix de
      Rome winnaar.
    </p>
    <p class="statement">
      ‘Schilderen is een emotionele daad waarin zich betekenissen en verhalen invoegen. Mijn werk
      heeft een lyrisch aspect; ik ben ook danser, muziek en beweging zijn deel van mijn leven en
      verbonden met mijn beeldende kunst. Mijn werk heeft figuratieve en abstracte elementen. Ik
      wil kijkers hun eigen reis laten maken in mijn werk en laat graag iets aan de verbeelding
      over. In mijn materiaalgebruik ben ik onder meer geboeid door gelaagdheid en transparantie.
      Om dit te onderzoeken heb ik (ook) met perspex gewerkt. Naast het maken van beeldende
      objecten, zoals schilderijen, beschouw ik het maken van interdisciplinaire evenementen,
      performances en projecten gebaseerd op de Argentijnse tango, als een belangrijk onderdeel
      van mijn kunstpraktijk’
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
