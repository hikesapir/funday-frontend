<template>
  <section>
    <div class="timeline-sum">
      <label
        @mouseover="toggleContent"
        @mouseleave="toggleContent"
        class="timeline"
        :style="labelColor"
      >
        {{ content }}
      </label>
    </div>
  </section>
</template>

<script>
export default {
  name: 'timeline-sum',
  props: {
    data: Array,
    groupId: String,
  },
  data() {
    return {
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

  computed: {
    groupData() {
      const groupData = this.data.find(
        (groupData) => groupData.id === this.groupId
      )
      return groupData
    },
    labelColor() {
      const group = this.$store.getters.board?.groups.find(
        (group) => group.id === this.groupId
      )
      var startTime = this.groupData?.timeline.start
      var endTime = this.groupData?.timeline.end
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
    content() {
      var startTime = +this.groupData.timeline.start
      var endTime = +this.groupData.timeline.end
      if (this.isHovering) {
        const time = endTime - startTime
        console.log(time, 'time')
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
  },
  methods: {
    calcTimeProgress(startTime, endTime) {
      const now = Date.now()
      const tillNow = now - startTime
      const total = endTime - startTime
      if (total < 1000 * 60 * 60 * 24 && total > 0)
        return progress
      else if (total === 0) return 100
      return (tillNow / total) * 100
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
    toggleContent() {
      this.isHovering = !this.isHovering
    },
  },
}
</script>
