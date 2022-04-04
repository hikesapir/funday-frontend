<template>
  <section class="board-view-mode" :style="addMargin">
    <router-link :to="'/boards/' + boardId">
      <div class="space-btn">
        <span>
          <i class="fa-solid fa-table-cells"></i>
        </span>
        <span>Main Table</span>
      </div>
    </router-link>
    <router-link :to="'/boards/' + boardId + '/kanban'">
      <div class="space-btn">
        <span class="upsidedwon">
          <i class="fa-solid fa-chart-simple"></i>
        </span>
        <span>Kanban</span>
      </div>
    </router-link>
    <router-link :to="'/boards/' + boardId + '/chart'">
      <div class="space-btn">
        <span>
          <i class="fa-solid fa-chart-pie"></i>
        </span>
        <span>Charts</span>
      </div>
    </router-link>

    <router-link :to="'/'">
      <div class="space-btn">
        <span>More</span>
        <span>
          <i class="fa-solid fa-chevron-down"></i>
        </span>
      </div>
    </router-link>
    <div class="spacer"></div>
  </section>
</template>

<script>
export default {
  name: "board-view-mode",
  props: {
    boardId: String,
  },
  computed: {
    addMargin() {
      if (this.isTaskUpdatesOpen) return { "margin-right": -700 + "px" };
    },
    isTaskUpdatesOpen() {
      return this.$store.getters.isTaskUpdatesOpen;
    },
  },
};
</script>
