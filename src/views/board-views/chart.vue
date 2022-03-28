<template>
  <div class="chart-view-container">
    <h1>Charts</h1>
    <div class="grid-layout">
      <bar-chart
        v-if="statusChart"
        :data="statusChart"
        :categories="statuses"
      />
    </div>
  </div>
</template>

<script>
import barChart from '../../components/chart/bar-chart.vue'
export default {
  name: 'chart-view',
  data() {
    return {}
  },
  components: {
    barChart,
  },
  computed: {
    charts() {
      console.log(
        'this.$store.getters.board?.charts',
        this.$store.getters.board?.charts
      )
      return this.$store.getters.board?.charts
    },
    statusChart() {
      const statusMapCount =
        this.$store.getters.boardData?.statusMapCount
      const statuses =
        this.$store.getters.board?.labels.status

      if (!statuses || !statusMapCount) return
      var data = []
      for (var key in statusMapCount) {
        const status = statuses.find(
          (status) => status.id === key
        )
        if (status.txt) {
          const statusData = {
            y: statusMapCount[key],
            color: status.color,
            name: status.txt,
          }
          data.push(statusData)
        }
      }
      console.log('data', data)
      return data
    },
    statuses() {
      const statuses = JSON.parse(
        JSON.stringify(
          this.$store.getters.board?.labels.status
        )
      )
      return statuses.map((s) => {
        if (!s.txt) return
        return s.txt
      })
    },
  },
}
</script>
