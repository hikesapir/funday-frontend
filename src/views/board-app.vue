<template>
  <main-nav></main-nav>
  <div class="open-side-bar">
    <div
      @click="changeModalStatus"
      class="open-nav-btn"
      :class="{ open: isOpen, close: !isOpen }"
    >
      <i class="fa-solid fa-angle-right"></i>
    </div>
    <div
      class="board-navi"
      :class="{ open: isOpen, close: !isOpen }"
    >
      <board-nav v-if="isOpen" :boards="boards"></board-nav>
    </div>
  </div>
  <div
    :class="[
      'board-app-container',
      isUpdatesOpen ? 'margin' : '',
    ]"
  >
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
      <router-view
        :board="board"
        v-if="!isLoading"
      ></router-view>
    </section>
  </div>
</template>

<script>
import {
  socketService,
  SOCKET_EMIT_BOARD_WATCH,
  SOCKET_EVENT_TASK_ADDED,
  SOCKET_EVENT_TASK_REMOVED,
  SOCKET_EVENT_CMPS_ORDER_EDITED,
  SOCKET_EVENT_UPDATE_ADDED,
  SOCKET_EVENT_GROUPS_ORDER_EDITED,
  SOCKET_EVENT_BOARD_SEVED,
  SOCKET_EVENT_TASKS_ORDER_EDITED,
} from '../services/socket-service.js'
import boardHeader from '../components/board-header.vue'
import boardViewMode from '../components/board-view-mode.vue'
import filterBar from '../components/filter-bar.vue'
import boardNav from '../components/board-nav.vue'
import mainNav from '../components/main-nav.vue'

export default {
  name: 'board-app',
  components: {
    boardHeader,
    boardNav,
    boardViewMode,
    filterBar,
    mainNav,
  },
  created() {
    this.$store.dispatch('setUser')
    socketService.on('task-updated', ({ groupId, task }) =>
      this.$store.commit({
        type: 'updateTask',
        groupId,
        updatedTask: task,
      })
    )
    socketService.on(
      SOCKET_EVENT_TASK_ADDED,
      ({ groupIdx, task }) =>
        this.$store.commit({
          type: 'addTask',
          groupIdx,
          savedTask: task,
        })
    )
    socketService.on(
      SOCKET_EVENT_TASK_REMOVED,
      ({ groupIdx, taskIdx }) =>
        this.$store.commit({
          type: 'removeTask',
          groupIdx,
          taskIdx,
        })
    )
    socketService.on(
      SOCKET_EVENT_CMPS_ORDER_EDITED,
      (newOrder) =>
        this.$store.commit({
          type: 'setCmpsOrder',
          newOrder,
        })
    )
    socketService.on(
      SOCKET_EVENT_GROUPS_ORDER_EDITED,
      (newOrder) => {
        this.$store.commit({
          type: 'setGroupsOrder',
          newOrder,
        })
      }
    )
    socketService.on(SOCKET_EVENT_BOARD_SEVED, (board) => {
      this.$store.commit({ type: 'loadBoard', board })
    })
    socketService.on(
      SOCKET_EVENT_TASKS_ORDER_EDITED,
      ({ result, idx }) => {
        this.$store.commit({
          type: 'setTasksOrder',
          result,
          idx,
        })
      }
    )
    socketService.on(
      SOCKET_EVENT_UPDATE_ADDED,
      ({ taskId, boardId, groupId, update }) => {
        this.$store.commit({
          type: 'addUpdate',
          taskId,
          boardId,
          groupId,
          update,
        })
      }
    )
  },
  data() {
    return {
      // isOpen: true,
    }
  },
  unmounted() {
    socketService.off(SOCKET_EVENT_UPDATE_ADDED)
  },
  methods: {
    changeModalStatus() {
      // this.isOpen = !this.isOpen
      // this.$store.getters.boardNav
      this.$store.commit('toggleBoardNav')
    },
    setBoard(boardId) {
      this.$store.commit({ type: 'loadBoard', id: boardId })
      socketService.emit(SOCKET_EMIT_BOARD_WATCH, this.id)
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
    isOpen() {
      return this.$store.getters.boardNav
    },
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
    },
    isUpdatesOpen() {
      return this.$store.getters.isTaskUpdatesOpen
    },
  },
  watch: {
    id: {
      handler() {
        this.$store.dispatch({
          type: 'loadBoard',
          id: this.id,
        })
        socketService.emit(SOCKET_EMIT_BOARD_WATCH, this.id)
      },
      immediate: true,
    },
  },
}
</script>
