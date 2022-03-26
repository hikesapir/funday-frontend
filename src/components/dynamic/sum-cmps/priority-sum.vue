<template>
  <section class="priority-sum">
    <div
      v-for="priority in priorityMapBy"
      :key="priority"
      class="priority-sum-display"
    >
      <div
        class="priority-sum-display"
        :style="{
          'background-color': priority.style.color,
          width: (priority.count / prioritiesSum) * 124 + 'px',
        }"
      ></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "priority-sum",
  props: {
    data: Array,
    groupId: String,
  },
  data() {
    return {
      priorityMapBy: null,
      groupData: null,
      priorities: this.$store.getters.board.labels.priority,
    };
  },
  created() {
    const groupData = this.data.filter(
      (groupData) => groupData._id === this.groupId
    );
    this.groupData = groupData[0];
    this.createMap();
  },
  computed: {
    prioritiesMap() {
      return this.groupData.priority;
    },
    prioritiesSum() {
      let sum = 0;
      for (const p in this.prioritiesMap) {
        sum += this.prioritiesMap[p];
      }
      return sum;
    },
  },
  methods: {
    createMap() {
      let currGroup = {};
      for (const p in this.prioritiesMap) {
        currGroup[p] = {
          count: this.prioritiesMap[p],
          style: this.priorities.find((pri) => pri.id === p),
        };
      }
      // console.log(currGroup, "curr");
      this.priorityMapBy = currGroup;
      return currGroup;
    },
  },
};
</script>
