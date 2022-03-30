<template>
  <div class="chart-view-container">
    <h1>Charts</h1>
    <div class="grid-layout">
      <div>
        <bar-chart v-if="statusChart" :data="taskForMemberMap" />
      </div>
      <div>
        <pie-chart v-if="statusChart" :data="statusChart" :categories="statuses" />
      </div>
    </div>
  </div>
</template>

<script>
import barChart from '../../components/chart/bar-chart.vue'
import pieChart from '../../components/chart/pie-chart.vue'
import { utilService } from '../../services/util-service'

export default {
  name: 'chart-view',
  data() {
    return {}
  },
  components: {
    barChart,
    pieChart
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
    taskForMemberMap() {
      const tasksForMemberMap = this.$store.getters.boardData?.tasksForMemberMap
      const map = []
      for (var key in tasksForMemberMap) {
        map.push({ y: tasksForMemberMap[key], color: utilService.getRandomColor(), name: key })
      }
      // // console.log(this.$store.getters.board.members);
      return map
    },
  },

}
</script>

<style>
.chart-view-container {
  padding: 20px;
}
.grid-layout {
  display: flex;
  width: calc(100vw - 590px);
}
</style>