<template>
  <section class="board-view-mode">
    <router-link :to="'/boards/' + boardId">
      <i class="fa-solid fa-table-cells"></i>Main Table
    </router-link>
    <router-link :to="'/boards/' + boardId + '/chart'">
      <i class="fa-solid fa-chart-pie"></i>Charts
    </router-link>
    <router-link :to="'/boards/' + boardId">
      <span class="upsidedwon">
        <i class="fa-solid fa-chart-simple"></i>
      </span>
      Kanban
    </router-link>
    <router-link :to="'/boards/' + boardId">
      <span>more</span>
      <i class="fa-solid fa-chevron-down"></i>
    </router-link>
    <div class="spacer"></div>
  </section>
</template>

<script>
export default {
  name: 'board-view-mode',
  props: {
    boardId: String,
  },
}
</script>
