export default {
  state: {
    priorityData: null,
    statusData: null,
  },
  getters: {
    statusData({ statusData }) {
      const data = statusData.map((s) => {
        return {
          color: s.color,
          name: s.txt,
        }
      })
      return statusData
    },
  },
  mutations: {},
  actions: {
    async loadCharts({ commit, rootGetters }) {
      try {
        console.log('rootGetters.board', rootGetters)
      } catch (err) {
        console.log(
          'ChartStore: Had problems while loading the charts'
        )
      }
    },
  },
}
