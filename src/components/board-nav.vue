<template>
  <section class="board-nav">
    <p>Workspace</p>
    <div class="workspace-dropdwon">
      <h2>Main workspace</h2>
      <fa icon="chevron-down"/>
    </div>
    <ul>
      <li>
        <button>
          <fa icon="plus" />Add
        </button>
      </li>
      <li>
        <button>
          <fa icon="filter" />Filters
        </button>
      </li>
      <li>
        <button>
          <fa icon="magnifying-glass" />Search
        </button>
      </li>
    </ul>
    <div class="spacer"></div>
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
