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
    setBoard(state, { board }) {
      state.board = board
    },
    setBoards(state, { boards }) {
      state.boards = boards
    },
  },
  actions: {
    async loadBoard({ commit }, { id }) {
      try {
        const board = await boardService.getById(id)
        commit({ type: 'setBoard', board })
      } catch (err) {
        console.log(
          `BoardsStore: Had problems while loading board- ${id}`
        )
      }
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
