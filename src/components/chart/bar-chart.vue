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
        title: '',
        series: [
          {
            type: 'column',
            data: this.data,
          },
        ],
        xAxis: {
          categories: this.members(),
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
  methods: {
    members() {
      const members = []
      this.data.forEach(memberData => {
        members.push(memberData.name)
      });
      return members
    }
  },
  computed: {

  },
}
</script>
