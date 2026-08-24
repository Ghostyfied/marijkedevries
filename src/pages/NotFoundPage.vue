<template>
  <div class="prose">
    <h1>Pagina niet gevonden</h1>
    <p>
      Deze pagina bestaat niet (meer). Ga naar de
      <RouterLink to="/">homepage</RouterLink> of bekijk het
      <RouterLink to="/werken">werk</RouterLink>.
    </p>
  </div>
</template>

<style scoped>
h1 {
  margin: 0 0 0.4em var(--text-inset);
  padding-top: 2%;
  font-size: 1em;
  font-weight: bold;
  line-height: var(--lh-body);
}

@media (max-width: 780px) {
  h1 {
    margin-left: 0;
  }
}
</style>
