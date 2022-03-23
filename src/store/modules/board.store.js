// import authService from '../../services/auth.service.js'
import boardService from '../../services/board-service.js'

export default {
  state: {
    // user: userService.getLoggedInUser(),
    boards: null,
    board: null,
  },
  getters: {
    boards({ boards }) {
      return boards
    },
    board({ board }) {
      return board
    },
  },
  mutations: {
    loadBoard(state, { id }) {
      const board = state.boards.find(
        (board) => board._id === id
      )
      if (board) state.board = board
      else
        console.log(
          'Board store could not load board- ' + id
        )
    },
    setBoards(state, { boards }) {
      state.boards = boards
    },
    addTask(state, { groupIdx, savedTask }) {
      state.board.groups[groupIdx].tasks.push(savedTask)
    },
  },
  actions: {
    async saveTask({ commit, state }, { groupId, task }) {
      var savedTask = null
      const idx = state.board.groups.findIndex(
        (group) => group.id === groupId
      )
      if (idx !== -1) {
        savedTask = await boardService.saveTask(
          state.board._id,
          groupId,
          task
        )
      }
      console.log('savedTask', savedTask)
      commit({
        type: 'addTask',
        groupIdx: idx,
        savedTask,
      })
      // group.tasks.push(savedTask)
    },
    async loadBoards({ commit }) {
      try {
        const boards = await boardService.query()
        commit({ type: 'setBoards', boards })
      } catch (err) {
        console.log(
          'BoardsStore: Had problems while loading the boards'
        )
      }
    },
  },
}
