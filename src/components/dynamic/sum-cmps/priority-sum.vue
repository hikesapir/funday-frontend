<template>
  <section class="priority-sum">
    <div
      v-for="priority in groupPrioritiesData"
      :key="priority"
      class="priority-sum-display"
    >
      <div
        class="priority-sum-display"
        :style="{
          'background-color': priority.style.color,
          width:
            (priority.count / prioritiesSum) * 124 + 'px',
        }"
      ></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'priority-sum',
  props: {
    data: Array,
    groupId: String,
  },
  data() {
    return {
      priorities: this.$store.getters.board.labels.priority,
    }
  },
  computed: {
    prioritiesMap() {
      const groupData = this.data.find(
        (groupData) => groupData._id === this.groupId
      )
      return groupData.priority
    },
    groupPrioritiesData() {
      let currGroup = {}
      const groupData = this.prioritiesMap
      for (const key in groupData) {
        currGroup[key] = {
          count: groupData[key],
          style: this.priorities.find(
            (pri) => pri.id === key
          ),
        }
      }
      return currGroup
    },
    prioritiesSum() {
      let sum = 0
      const prioritiesMap = this.prioritiesMap
      for (const p in prioritiesMap) {
        sum += prioritiesMap[p]
      }
      return sum
    },
  },
}
</script>
