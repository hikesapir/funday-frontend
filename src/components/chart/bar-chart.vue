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
            type: 'column',
            data: [
              { y: 4, color: '#333', name: 'Achieved' },
              {
                y: 12,
                color: '#229922',
                name: 'In Progress',
              },
              { y: 1, color: '#336699', name: 'Stuck' },
            ],
          },
        ],
        // xAxis: {
        //   categories: ['Done', 'Delay', 'Stuck'],
        // },
        yAxis: {
          min: 0,
          title: {
            text: 'Count',
          },
        },
      },
    }
  },
  created() {
    const data = this.$store.getters.statusData
  },
}
</script>
