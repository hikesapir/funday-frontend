<template>
  <section class="board-nav">
    <span>Workspace</span>
    <div class="workspace-dropdwon">
      <h2>Main workspace</h2>
      <fa icon="chevron-down" />
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
      <board-preview v-for="board in boards" :key="board._id" :board="board"/>
    </ul>
  </section>
</template>

<script>
import boardPreview from "./board-preview.vue";
export default {
  name: 'board-nav',
  props: {
    boards: Object,
  },
  emits: [],
  components: {
    boardPreview,
  },
  methods: {
    selectBoard(boardId) {
      console.log(boardId);
      // this.$emit('selectBoard', boardId)
    },

  },
}
</script>
