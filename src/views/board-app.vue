<template>
  <div class="board-app-container">
    <div class="open-side-bar">
      <board-nav
        @selectBoard="setBoard"
        :boards="boards"
      ></board-nav>
    </div>
    <section class="board-app">
      <board-header
        :boardDetails="{
          title: board?.title,
          description: board?.description,
          isStarred: board?.isStarred,
        }"
        @starred="updateBoard"
      />
      <board-view-mode :boardId="board?._id" />
      <filter-bar />
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import boardHeader from '../components/board-header.vue'
import boardViewMode from '../components/board-view-mode.vue'
import filterBar from '../components/filter-bar.vue'
import boardNav from '../components/board-nav.vue'

export default {
  name: 'board-app',
  components: {
    boardHeader,
    boardNav,
    boardViewMode,
    filterBar,
  },
  computed: {},
  created() {
    const { id } = this.$route.params
    this.$store.dispatch({ type: 'loadBoard', id })
  },
  methods: {
    setBoard(boardId) {
      this.$store.commit({ type: 'loadBoard', id: boardId })
    },
    updateBoard(type) {
      if (type === 'star') {
        this.board.isStarred = !this.board.isStarred
      }
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board,
      })
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
