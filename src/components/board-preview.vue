<template>
  <li
    v-if="board"
    class="board-preview"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    :class="active"
  >
    <label v-if="changeName">
      <input
        @keyup.enter="updateBoard"
        @blur="updateBoard"
        type="text"
        v-model="newTitle"
        autofocus
        class="change-name-input"
      />
    </label>
    <div v-else class="bord-title" @click="selectBoard">
      <div class="space-btn">
        <span class="align-center">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            width="19"
            height="19"
            aria-hidden="true"
            aria-label="Public board"
            class="icon_component"
          >
            <path
              d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <div class="ellipsis">{{ board.title }}</div>
      </div>
      <button
        @click.stop="toggleModal"
        v-if="isHover || openModal"
      >
        <i class="fa-solid fa-ellipsis"></i>
      </button>
    </div>
    <div
      class="relative"
      tabindex="-1"
      @blur="openModal = false"
      :ref="'ctxModal' + idx"
      v-show="openModal"
    >
      <context-modal
        :isStarred="board.isStarred"
        @remove="remove"
        @openNewTab="openNewTab"
        @renameBoard="renameBoard"
        @starred="starred"
        @duplicate="duplicate"
      />
    </div>
  </li>
</template>

<script>
import contextModal from './context-modal.vue'
export default {
  name: 'board-preview',
  props: {
    board: Object,
    idx: Number,
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
  created() {
    document.title = this.board.title
  },
  mounted() {},
  methods: {
    toggleModal() {
      this.openModal = true
      const modal = 'ctxModal' + this.idx
      setTimeout(() => this.$refs[modal].focus(), 0)
    },
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
      this.board._id
      const idx = this.$store.getters.boards.findIndex(
        (board) => board._id === this.board._id
      )
      document.title = this.$store.getters.boards[idx].title
    },
  },
  computed: {
    active() {
      return this.$route.params.id === this.board._id
        ? 'act'
        : ''
    },
  },
  unmounted() {},
}
</script>

<style>
.board-preview.act {
  background-color: #cce5ff;
  border-radius: 4px;
  border: 1px solid transparent;
}
</style>
