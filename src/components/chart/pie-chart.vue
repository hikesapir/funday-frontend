<template>
  <Chart :options="chartOptions" />
</template>

<script>
import { Chart } from 'highcharts-vue'

export default {
  name: 'pie-chart',
  props: { data: Object, categories: Object },
  components: {
    Chart,
  },
  data() {
    return {
      chartOptions: {
        title: '',
        series: [
          {
            type: 'pie',
            data: this.data,
          },
        ],
        xAxis: {
          categories: this.categories,
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Count',
          },
        },
      },
    }
  },
  created() { },
}
</script>
