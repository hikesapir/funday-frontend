<template>
  <section class="board-view-mode">
    <!-- <span>board view mode: </span> -->
    <button>
      <i class="fa-solid fa-table-cells"></i>Main Table
    </button>
    <button>
      <i class="fa-solid fa-chart-pie"></i>Charts
    </button>
    <button>
      <span class="upsidedwon">
        <i class="fa-solid fa-chart-simple"></i>
      </span>
      Kanban
    </button> |
    <button>
      <span>more</span>
      <i class="fa-solid fa-chevron-down"></i>
    </button>
    <div class="spacer"></div>
  </section>
</template>

<script>
export default {
  name: "board-view-mode",

  components: {},
};
</script>
