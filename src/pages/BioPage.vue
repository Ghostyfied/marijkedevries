<script setup lang="ts">
import { cv, intro } from '../content/bio'

/** Bold lead-in on the first paragraph, matching the original's markup. */
const leadHtml = intro[0].replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
</script>

<template>
  <div class="prose">
    <h1 class="sr-only">Biografie</h1>

    <!-- eslint-disable-next-line vue/no-v-html -- static content from src/content/bio.ts -->
    <p v-html="leadHtml" />
    <p v-for="para in intro.slice(1)" :key="para.slice(0, 24)">{{ para }}</p>

    <section v-for="section in cv" :key="section.heading">
      <h3>{{ section.heading }}</h3>
      <table class="cv-table">
        <caption class="sr-only">
          {{
            section.heading
          }}
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

table {
  margin-left: var(--text-inset);
}

@media (max-width: 780px) {
  table {
    margin-left: 0;
  }
}
</style>
