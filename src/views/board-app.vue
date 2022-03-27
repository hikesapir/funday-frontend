<template>
  <div class="board-app-container">
    <div class="open-side-bar">
      <board-nav :boards="boards"></board-nav>
    </div>
    <section class="board-app">
      <div class="bord-header-wrapper">
        <board-header
          :boardDetails="{
            title: board?.title,
            description: board?.description,
            isStarred: board?.isStarred,
          }"
          @updateBoard="updateBoard"
        />
        <board-view-mode :boardId="board?._id" />
        <filter-bar :board="board" />
      </div>
      <router-view :board="board" v-if="!isLoading"></router-view>
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
  emits: [],
  computed: {},
  created() {
  },
  methods: {
    setBoard(boardId) {
      this.$store.commit({ type: 'loadBoard', id: boardId })
    },
    updateBoard(type) {
      const board = JSON.parse(
        JSON.stringify(this.$store.getters.board)
      )
      if (type === 'star') {
        board.isStarred = !board.isStarred
      } else {
        if (type.title) board.title = type.title
        if (type.description)
          board.description = type.description
      }
      this.$store.dispatch({
        type: 'saveBoard',
        board,
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
    id() {
      return this.$route.params.id
    },
    isLoading() {
      return this.$store.getters.isLoading
    }
  },
  watch: {
    id: {
      handler() {
        this.$store.dispatch({ type: 'loadBoard', id: this.id })
      },
      immediate: true
    }
  },

}
</script>
