<script setup lang="ts">
import { useLocale } from '../locale'
import ResponsiveImage from '../components/ResponsiveImage.vue'

const { c } = useLocale()
</script>

<template>
  <div class="prose">
    <h1 class="sr-only">Contact</h1>

    <ul class="details">
      <li v-for="d in c.contact.details" :key="d.label">
        <strong>{{ d.label }}:</strong>&#32;
        <a v-if="d.href" :href="d.href">{{ d.value }}</a>
        <span v-else>{{ d.value }}</span>
      </li>
    </ul>

    <p class="flyer">
      <ResponsiveImage
        src="AAtindertimesflyer4.png"
        :alt="c.contact.flyerAlt"
        sizes="(max-width: 780px) 60vw, 200px"
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

.details {
  list-style: none;
  padding: 0;
  margin: 0 0 3em var(--text-inset);
}

.details li {
  font-weight: bold;
}

/*
 * The original styled links exactly like body text — same colour, no underline —
 * so an email address in a bold line was indistinguishable from the label next
 * to it. Underlined here; it is the only cue these links have.
 */
.details a {
  font-weight: bold;
  text-decoration: underline;
}

.flyer {
  max-width: 200px;
}

@media (max-width: 780px) {
  .details {
    margin-left: 0;
  }
}
</style>
