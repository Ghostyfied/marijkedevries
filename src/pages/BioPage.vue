<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '../locale'

const { c } = useLocale()

/** Bold lead-in on the first paragraph, matching the cv document. */
const leadHtml = computed(() =>
  c.value.bio.intro[0].replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
)
</script>

<template>
  <div class="prose">
    <h1 class="sr-only">{{ $route.meta.title }}</h1>

    <!-- eslint-disable-next-line vue/no-v-html -- static content from src/content -->
    <p v-html="leadHtml" />
    <p v-for="para in c.bio.intro.slice(1)" :key="para.slice(0, 24)">{{ para }}</p>

    <section v-for="section in c.bio.cv" :key="section.heading">
      <h2 class="cv-heading">{{ section.heading }}</h2>
      <table class="cv-table">
        <caption class="sr-only">
          {{ section.heading }}
        </caption>
        <tbody>
          <tr v-for="(row, i) in section.rows" :key="i">
            <td>{{ row.period }}</td>
            <td>{{ row.text }}</td>
          </tr>
        </tbody>
      </table>
    </section>
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
 * The cv section headings. <h2> so the document outline descends properly from
 * the page's <h1>; styled as the plain bold body text the original used.
 */
.cv-heading {
  margin: 0 0 0.4em var(--text-inset);
  padding: 2% 0 0;
  border-left: 0;
  font-size: 1em;
  font-weight: bold;
  line-height: var(--lh-body);
}

table {
  margin-left: var(--text-inset);
}

@media (max-width: 780px) {
  table,
  .cv-heading {
    margin-left: 0;
  }
}
</style>
