<script setup lang="ts">
import { useLocale } from '../locale'
import { asset } from '../asset'

const { c } = useLocale()
</script>

<template>
  <div class="prose">
    <h1 class="sr-only">{{ $route.meta.title }}</h1>

    <section v-for="item in c.archive" :key="item.title">
      <h2 class="item-title">{{ item.title }} ({{ item.period }})</h2>

      <div v-for="block in item.blocks" :key="block.heading" class="block">
        <p>
          <strong v-if="block.heading">{{ block.heading }}</strong>
          <template v-for="line in block.lines" :key="line"> <br />{{ line }} </template>
        </p>
      </div>

      <p v-for="para in item.body" :key="para.slice(0, 24)">{{ para }}</p>

      <p v-if="item.pdf">
        <a :href="asset(item.pdf.href)" target="_blank" rel="noopener">{{ item.pdf.label }}</a>
      </p>
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

/* Plain bold body text, matching how the other pages set their headings. */
.item-title {
  margin: 0 0 0.4em var(--text-inset);
  padding: 2% 0 0;
  border-left: 0;
  font-size: 1em;
  font-weight: bold;
  line-height: var(--lh-body);
}

.block {
  margin-left: 0;
  margin-bottom: 0.5em;
}

a {
  text-decoration: underline;
  font-weight: bold;
}

.prose p {
  max-width: 68ch;
}

@media (max-width: 780px) {
  .item-title {
    margin-left: 0;
  }
}
</style>
