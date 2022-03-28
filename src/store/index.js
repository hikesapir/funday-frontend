import { createStore } from 'vuex'
import boardStore from './modules/board.store.js'
import userStore from './modules/user.store.js'

const store = createStore({
  strict: true,
  state() {
    return {}
  },
  getters: {},
  mutations: {},
  modules: {
    boardStore,
    userStore,
  },
  actions: {
    async loadApp({ dispatch }) {
      await dispatch('loadBoards')
      // dispatch('loadUser')
    },
  },
})

export default store
