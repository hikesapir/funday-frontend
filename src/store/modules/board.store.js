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
  },
  actions: {
    async saveTask({ board }, { groupId, task }) {
      const group = board.groups.find(
        (group) => group.id === groupId
      )
      if (group) {
        const savedTask = await boardService.saveTask(
          groupId
        )
      }
      group.tasks.push(savedTask)
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
