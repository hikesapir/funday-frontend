import { createStore } from 'vuex'
import boardStore from './modules/board.store.js'
import userStore from './modules/store.store.js'
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
    loadApp({ dispatch }) {
      // dispatch('loadBoards')
      // dispatch('loadUser')
    },
  },
})

export default store
