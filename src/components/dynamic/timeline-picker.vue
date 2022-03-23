<template>
  <div class="timeline-pick">
    <form @submit.prevent="setTimeline">
      <label
        @mouseover="toggleContent"
        @mouseleave="toggleContent"
        class="timeline"
        :style="labelColor"
        >{{ content }}
        <input type="date" hidden />
      </label>
    </form>
  </div>
</template>

<script>
export default {
  name: 'timeline-picker',
  props: {
    task: Object,
  },
  data() {
    return {
      timeline: {
        start: '',
        end: '',
      },
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
    toggleContent() {
      this.isHovering = !this.isHovering
    },
    getTime(startTime, endTime) {
      startTime = new Date(startTime)
      endTime = new Date(endTime)
      var startMonth = startTime.getMonth()
      var endMonth = endTime.getMonth()
      var startDay = startTime.getDay()
      var endDay = endTime.getDay()
      return { startMonth, endMonth, startDay, endDay }
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
      const group = this.$store.board?.groups.find(
        (group) => group.id === this.groupId
      )
      if (group) {
        return { 'background-color': group.style.color }
      }
      return { 'background-color': '#333' }
    },
  },
}
</script>
