<template>
  <section class="board-nav">
    <h3>Workspace</h3>
    <ul>
      <li><button>Add</button></li>
      <li><button>Filters</button></li>
      <li><button>Search</button></li>
    </ul>
    <hr />
    <div class="curr-workspace"></div>
    <ul>
      <li v-for="board in boards" :key="board._id">
        {{ board.title }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'board-nav',
  props: {
    boards: Object,
  },
}
</script>
