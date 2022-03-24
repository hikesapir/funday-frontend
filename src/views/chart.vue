<template>
  <div class="chart-view-container">
    <div class="open-side-bar">
      <board-nav
        @selectBoard="setBoard"
        :boards="boards"
      ></board-nav>
    </div>
    <!-- <div class="chart-view"> -->
    <section class="chart-view">
      <!-- <section class="chart-view"> -->
      <board-header
        :boardDetails="{
          title: board?.title,
          description: board?.description,
          isStarred: board?.isStarred,
        }"
        @starred="updateBoard"
      />
      <board-view-mode />
      <filter-bar />
    </section>
  </div>
</template>

<script>
export default {
  name: 'board-app',
}
</script>
