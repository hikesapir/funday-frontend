<template>
  <section class="board-view-mode">
    <hr />
    <span>board view mode: </span>
    <router-link to="/"><fa icon="table-cells" />Main Table</router-link> |
    <router-link to="/"><fa icon="chart-simple" />Charts</router-link> |
    <router-link to="/">Kanban</router-link> |
    <hr />
  </section>
</template>

<script>
export default {
  name: "board-view-mode",

  components: {},
};
</script>
