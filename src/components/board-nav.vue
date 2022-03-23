<template>
  <section class="board-nav">
    <p>Workspace</p>
    <div class="workspace-dropdwon">
      <fa icon="plus" />
      <h2>Main workspace</h2>
    </div>
    <ul>
      <li>
        <button>Add</button>
      </li>
      <li>
        <button>Filters</button>
      </li>
      <li>
        <button>Search</button>
      </li>
    </ul>
    <hr />
    <div class="curr-workspace"></div>
    <ul>
      <li v-for="board in boards" :key="board._id">
        <div class="bord-title" @click="selectBoard(board._id)">
          <span>{{ board.title }}</span>
        </div>
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
  emits: [],
  methods: {
    selectBoard(boardId) {
      console.log(boardId);
      // this.$emit('selectBoard', boardId)
    },

  },
}
</script>
