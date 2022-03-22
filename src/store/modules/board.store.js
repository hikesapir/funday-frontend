// import authService from '../../services/auth.service.js'
import boardService from '../../services/board-service.js'

export default {
  state: {
    // user: userService.getLoggedInUser(),
    boards: [],
  },
  getters: {
    boards({ boards }) {
      return boards
    },
  },
  mutations: {
    async loadBoards(state) {
      try {
        const boards = await boardService.query()
        state.boards = boards
      } catch (err) {
        console.log(
          'BoardsStore: Had problems while loading the boards'
        )
      }
    },
  },
  actions: {
    loadApp({ commit }) {
      commit('loadBoards')
    },
    async setBoard({ commit }, { id }) {
      const board = await boardService.getById(id)
    },
  },
}
