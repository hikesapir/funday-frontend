<template>
  <!-- <i
    class="collapse-icon fa fa-angle-right"
    :class="isNavOpen ? 'pinned' : ''"
    @click="toggleNav"
  ></i> -->
  <section v-if="isNavOpen" class="board-nav">
    <span>Workspace</span>
    <div class="workspace-dropdwon">
      <h2>Main workspace</h2>
      <i class="fa-solid fa-chevron-down"></i>
    </div>
    <ul>
      <li>
        <button><i class="fa-solid fa-plus"></i>Add</button>
      </li>
      <li>
        <button>
          <i class="fa-solid fa-filter"></i>Filters
        </button>
      </li>
      <li>
        <button>
          <i class="fa-solid fa-magnifying-glass"></i>Search
        </button>
      </li>
    </ul>
    <div class="spacer"></div>
    <div class="curr-workspace"></div>
    <ul>
      <board-preview
        v-for="board in boards"
        :key="board._id"
        :board="board"
      />
    </ul>
  </section>
</template>

<script>
import boardPreview from './board-preview.vue'
export default {
  name: 'board-nav',
  props: {
    boards: Object,
  },
  data() {
    return {
      isNavOpen: true,
    }
  },
  emits: [],
  components: {
    boardPreview,
  },

  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen
    },
  },
}
</script>
