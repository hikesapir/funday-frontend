<template>
  <div class="timeline-picker">
    <label
      @mouseover="toggleContent"
      @mouseleave="toggleContent"
      class="timeline"
      :style="labelColor"
      >{{ content }}
      <el-date-picker
        class="datepicker-container"
        v-model="range"
        @change="setTimeline"
        type="daterange"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'timeline-picker',
  props: {
    task: Object,
    groupId: String,
  },
  data() {
    return {
      range: '',
      isHovering: false,
      monthNames: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    }
  },
  methods: {
    setTimeline() {
      const timeline = {
        start: this.range[0].getTime(),
        end: this.range[1].getTime(),
      }
      if (timeline.start > timeline.end) return
      this.range = ''
      this.$emit('update', {
        cmpType: 'timeline-picker',
        timeline,
        task: this.task,
      })
    },
    toggleContent() {
      this.isHovering = !this.isHovering
    },
    getTime(startTime, endTime) {
      startTime = new Date(startTime)
      endTime = new Date(endTime)
      var startMonth = startTime.getMonth()
      var endMonth = endTime.getMonth()
      var startDay = startTime.getDate()
      var endDay = endTime.getDate()
      return { startMonth, endMonth, startDay, endDay }
    },
    calcTimeProgress(startTime, endTime) {
      const now = Date.now()
      const tillNow = now - startTime
      const total = endTime - startTime
      if (total < 1000 * 60 * 60 * 24 && total > 0)
        return progress
      else if (total === 0) return 100
      return (tillNow / total) * 100
    },
  },
  computed: {
    content() {
      var startTime = this.task?.timeline.start
      var endTime = this.task?.timeline.end
      if (this.isHovering) {
        const time = endTime - startTime
        if (!time) return 'Set Dates'
        const daysLeft = (
          time /
          (1000 * 60 * 60 * 24)
        ).toFixed(0)
        return `${daysLeft}d`
      } else {
        if (!startTime && !endTime) return '-'
        const { startMonth, endMonth, startDay, endDay } =
          this.getTime(startTime, endTime)
        if (startMonth === endMonth)
          return `${this.monthNames[startMonth]} ${startDay} - ${endDay}`
        return `${this.monthNames[startMonth]} ${startDay} - ${this.monthNames[endMonth]} ${endDay}`
      }
    },
    labelColor() {
      const group = this.$store.getters.board?.groups.find(
        (group) => group.id === this.groupId
      )
      var startTime = this.task?.timeline.start
      var endTime = this.task?.timeline.end
      if (!startTime && !endTime)
        return { 'background-color': '#ababab' }
      const progress = this.calcTimeProgress(
        startTime,
        endTime
      )
      if (group?.style) {
        return {
          background: `linear-gradient(to right, ${group?.style.color} ${progress}%, #333 ${progress}%`,
        }
      }
      return { 'background-color': '#333' }
    },
  },
}
</script>

<style>
.datepicker-container {
  visibility: hidden;
}
</style>
