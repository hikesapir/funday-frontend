<template>
  <div class="chart-view-container">
    <h1>Charts</h1>
    <bar-chart />
  </div>
</template>

<script>
import barChart from '../../components/chart/bar-chart.vue'
export default {
  name: 'chart-view',
  components: {
    barChart,
  },
}
</script>
