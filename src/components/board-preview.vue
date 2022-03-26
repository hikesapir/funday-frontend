<template>
  <li v-if="board" class="board-preview" @mouseover="isHover = true" @mouseleave="isHover = false">
    <label v-if="changeName">
      <input
        @keyup.enter="updateBoard"
        @blur="updateBoard"
        type="text"
        v-model="newTitle"
        autofocus
      />
    </label>
    <div v-else class="bord-title" @click="selectBoard">
      <span>{{ board.title }}</span>
      <button @click.stop="openModal = !openModal" v-if="isHover || openModal">
        <i class="fa-solid fa-ellipsis"></i>
      </button>
    </div>
  </li>
  <div class="relative">
    <context-modal
      v-if="openModal"
      @remove="remove"
      @openNewTab="openNewTab"
      @renameBoard="renameBoard"
      @starred="starred"
      @duplicate="duplicate"
    />
  </div>
  <!-- tabindex="0"
  @blur="openModal = false"-->
</template>

<script>
import contextModal from './context-modal.vue'
export default {
  name: 'board-preview',
  props: {
    board: Object,
  },
  emits: [],
  components: {
    contextModal,
  },
  data() {
    return {
      isHover: false,
      openModal: false,
      changeName: false,
      newTitle: '',
    }
  },
  created() { },
  mounted() { },
  methods: {
    remove() {
      this.$store.dispatch({
        type: 'removeBoard',
        boardId: this.board._id,
      })
      this.openModal = false
    },
    openNewTab() {
      window.open(
        window.location.origin +
        `/#/boards/${this.board._id}`
      )
      this.openModal = false
    },
    renameBoard() {
      console.log('got it');
      this.newTitle = this.board.title
      this.changeName = true
      this.openModal = false
    },
    updateBoard() {
      const board = JSON.parse(JSON.stringify(this.board))
      board.title = this.newTitle
      this.$store.dispatch({
        type: 'saveBoard',
        board,
      })
      this.changeName = false
      this.openModal = false

    },
    starred() {
      const board = JSON.parse(JSON.stringify(this.board))
      board.isStarred = !board.isStarred
      this.$store.dispatch({
        type: 'saveBoard',
        board,
      })
      this.openModal = false

    },
    duplicate() {
      const newBoard = JSON.parse(
        JSON.stringify(this.board)
      )
      newBoard.title = newBoard.title + ' -copy'
      newBoard._id = null
      this.$store.dispatch({
        type: 'saveBoard',
        board: newBoard,
      })
      this.openModal = false

    },
    selectBoard() {
      this.$router.push(`/boards/${this.board._id}`)
    },
  },
  computed: {},
  unmounted() { },
}
</script>
