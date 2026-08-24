<script setup lang="ts">
import { details, news } from '../content/contact'
import ResponsiveImage from '../components/ResponsiveImage.vue'
</script>

<template>
  <div class="prose">
    <h1 class="sr-only">Contact en nieuws</h1>

    <ul class="details">
      <li v-for="d in details" :key="d.label">
        <strong>{{ d.label }}:</strong>&#32;
        <a v-if="d.href" :href="d.href">{{ d.value }}</a>
        <span v-else>{{ d.value }}</span>
      </li>
    </ul>

    <section class="news">
      <h2 class="news-heading">Nieuws</h2>

      <p v-if="news.past" class="archive-note">
        Deze tentoonstelling vond plaats in november 2020. De informatie hieronder blijft hier als
        archief staan.
      </p>

      <h3 class="news-title">{{ news.title }}</h3>

      <div v-for="block in news.blocks" :key="block.heading" class="block">
        <p>
          <strong v-if="block.heading">{{ block.heading }}</strong>
          <template v-for="line in block.lines" :key="line"> <br />{{ line }} </template>
        </p>
        <p v-if="block.links" class="block-links">
          <template v-for="link in block.links" :key="link.href + link.label">
            <a :href="link.href" target="_blank" rel="noopener">{{ link.label }}</a>
            <br />
          </template>
        </p>
      </div>

      <p v-if="news.flyer" class="flyer">
        <a :href="news.flyerHref" target="_blank" rel="noopener">
          <ResponsiveImage
            :src="news.flyer"
            alt="Flyer voor Tinder Times: Monumenten voor Vluchtigheid, SEXYLAND, november 2020"
            sizes="(max-width: 780px) 60vw, 200px"
          />
        </a>
      </p>

      <p v-for="para in news.body" :key="para.slice(0, 24)">{{ para }}</p>
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

.details {
  list-style: none;
  padding: 0;
  margin: 0 0 3em var(--text-inset);
}

.details li {
  font-weight: bold;
}

.details a {
  font-weight: bold;
}

/* The original set this as plain bold body text, not an <h2> treatment. */
.news-heading {
  margin: 0 0 0.4em var(--text-inset);
  padding: 2% 0 0;
  border-left: 0;
  font-size: 1em;
  font-weight: bold;
  line-height: var(--lh-body);
}

.news-title {
  margin: 0 0 0.4em var(--text-inset);
  padding-top: 2%;
  font-size: 1em;
  font-weight: bold;
  line-height: var(--lh-body);
}

/* Children carry the text inset; the wrapper must not add a second one. */
.block {
  margin-left: 0;
  margin-bottom: 0.5em;
}

.block-links a {
  text-decoration: underline;
  font-weight: bold;
}

/* The original floated the flyer left and let the text wrap around it. */
.flyer {
  float: left;
  width: 200px;
  margin: 0 1.5em 0.5em var(--text-inset);
  padding-top: 2%;
}

.flyer + p {
  padding-top: 2%;
}

.archive-note {
  color: #767676;
}

@media (max-width: 780px) {
  .details,
  .news-heading,
  .news-title {
    margin-left: 0;
  }

  .flyer {
    float: none;
    margin-left: 0;
  }
}
</style>
