<template>
  <div class="chart-view-container">
    <h1>Charts</h1>
    <bar-chart
      v-if="statusChart"
      :data="statusChart"
      :categories="statuses"
    />
  </div>
</template>

<script>
import barChart from '../../components/chart/bar-chart.vue'
export default {
  name: 'chart-view',
  components: {
    barChart,
  },
  computed: {
    statusChart() {
      const statusMapCount =
        this.$store.getters.chartData?.statusMapCount
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
