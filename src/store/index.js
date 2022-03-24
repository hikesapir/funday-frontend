import { createStore } from 'vuex'
import boardStore from './modules/board.store.js'
import chartStore from './modules/chart.store.js'
// import userStore from './modules/user.store.js'
const store = createStore({
  strict: true,
  state() {
    return {}
  },
  getters: {},
  mutations: {},
  modules: {
    boardStore,
    chartStore,
    // userStore,
  },
  actions: {
    loadApp({ dispatch }) {
      dispatch('loadBoards')
      dispatch('loadCharts')
      // dispatch('loadUser')
    },
  },
})

export default store
