<template>
  <section class="board-view-mode">
    <!-- <span>board view mode: </span> -->
    <button>
      <fa icon="table-cells" />Main Table
    </button>
    <button>
      <fa icon="chart-simple" />Charts
    </button>
    <button>Kanban</button> |
    <button>
      <span>more</span>
      <fa icon="chevron-down" />
    </button>
  </section>
</template>

<script>
export default {
  name: "board-view-mode",

  components: {},
};
</script>
