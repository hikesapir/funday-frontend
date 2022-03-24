<template>
  <Chart :options="chartOptions" />
</template>

<script>
import { Chart } from 'highcharts-vue'

export default {
  name: 'bar-chart',
  props: { data: Object },
  components: {
    Chart,
  },
  data() {
    return {
      chartOptions: {
        series: [
          {
            data: [1, 2, 3], // sample data
          },
        ],
      },
    }
  },
  created() {},
}
</script>
