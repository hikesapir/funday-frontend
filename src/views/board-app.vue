<template>
  <div class="board-app-container">
    <div class="open-side-bar">
      <board-nav @selectBoard="setBoard" :boards="boards"></board-nav>
    </div>
    <!-- <div class="board-app"> -->
      <section class="board-app">
        <!-- <section class="board-app"> -->
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

        <Container v-if="board?.groups" @drop="onDrop" drag-handle-selector=".drag-handle">
          <Draggable v-for="group in board?.groups" :key="group.id">
            <board-group :group="group" :cmpsOrder="board?.cmpsOrder" :key="group.id"></board-group>
          </Draggable>
        </Container>
        <!-- </section> -->
      </section>
    <!-- </div> -->
  </div>
</template>

<script>
import boardGroup from '../components/board-group.vue'
import boardHeader from '../components/board-header.vue'
import boardViewMode from '../components/board-view-mode.vue'
import filterBar from '../components/filter-bar.vue'
import boardNav from '../components/board-nav.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
  name: 'board-app',
  components: {
    boardGroup,
    boardHeader,
    boardNav,
    boardViewMode,
    filterBar,
    Container,
    Draggable
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
    updateBoard(type) {
      if (type === 'star') {
        this.board.isStarred = !this.board.isStarred
        console.log(this.board);
      }
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
    },
        onDrop(dropResult) {
      console.log(dropResult);
      this.$store.dispatch({
        type: 'changeOrderGroups',
        dropResult,
        entities: this.board.groups,
        entityType: 'groups',
      })
    }

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
