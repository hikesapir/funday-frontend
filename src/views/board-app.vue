<template>
  <div class="board-app-container">
    <div class="open-side-bar">
      <board-nav
        @selectBoard="setBoard"
        :boards="boards"
      ></board-nav>
    </div>
    <div class="board-app">
      <section class="board-app">
        <!-- <section class="board-app"> -->
        <board-header
          :boardDetails="{
            title: board?.title,
            description: board?.description,
          }"
        />
        <board-view-mode />
        <filter-bar />
        <board-group
          v-for="group in board?.groups"
          :group="group"
          :cmpsOrder="board?.cmpsOrder"
          :key="group.id"
        ></board-group>
        <button @click="$router.push('/')">
          Back to homepage
        </button>
        <!-- </section> -->
      </section>
    </div>
  </div>
</template>

<script>
import boardGroup from '../components/board-group.vue'
import boardHeader from '../components/board-header.vue'
import boardViewMode from '../components/board-view-mode.vue'
import filterBar from '../components/filter-bar.vue'
import boardNav from '../components/board-nav.vue'

export default {
  name: 'board-app',
  components: {
    boardGroup,
    boardHeader,
    boardNav,
    boardViewMode,
    filterBar,
  },
  computed: {},
  created() {
    const { id } = this.$route.params
    this.$store.commit({ type: 'loadBoard', id })
  },
  methods: {
    setBoard(boardId) {
      this.$store.commit({ type: 'loadBoard', id: boardId })
    },
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    boards() {
      return this.$store.getters.boards
    },
  },
}
</script>
