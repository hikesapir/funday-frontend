<template>
  <section class="status-sum">
    <div
      v-for="status in groupStatusData"
      :key="status"
      class="status-sum-display"
    >
      <div
        class="status-sum-display"
        :style="{
          'background-color': status.style.color,
          width: (status.count / statusesSum) * 124 + 'px',
        }"
      ></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'status-sum',
  props: {
    data: Array,
    groupId: String,
  },
  data() {
    return {
      statuses: this.$store.getters.board.labels.status,
    }
  },

  computed: {
    groupData() {
      const groupData = this.data.find(
        (groupData) => groupData._id === this.groupId
      )
      return groupData
    },

    groupStatusData() {
      let currGroup = {}
      const groupData = this.groupData.groupStatusCount
      for (const key in groupData) {
        currGroup[key] = {
          count: groupData[key],
          style: this.statuses.find(
            (pri) => pri.id === key
          ),
        }
      }
      return currGroup
    },

    statusesSum() {
      let sum = 0
      const statusMapCount = this.groupData.groupStatusCount
      for (const p in statusMapCount) {
        sum += statusMapCount[p]
      }
      return sum
    },
  },
}
</script>
