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
      const statusMap =
        this.$store.getters.chartData?.statusMapCount

      const statuses =
        this.$store.getters.board?.labels.status

      if (!statuses || !statusMap) return
      var data = []
      for (var key in statusMap) {
        data = statuses.map((status) => {
          if (!status.txt) return
          return {
            y: statusMap[key],
            color: status.color,
            name: status.txt,
          }
        })
      }
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
