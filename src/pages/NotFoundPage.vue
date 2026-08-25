<template>
  <div class="prose">
    <h1>Pagina niet gevonden / Page not found</h1>
    <p lang="nl">
      Deze pagina bestaat niet (meer). Ga naar de
      <RouterLink to="/">homepage</RouterLink> of bekijk het
      <RouterLink to="/werken">werk</RouterLink>.
    </p>
    <p lang="en">
      This page does not exist (any more). Go to the
      <RouterLink to="/en">English homepage</RouterLink> or view the
      <RouterLink to="/en/works">work</RouterLink>.
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
