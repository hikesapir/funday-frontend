<template>
  <section class="status-sum">
    <div v-for="status in statusMapBy" :key="status" class="status-sum-display">
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
  name: "status-sum",
  props: {
    data: Array,
    groupId: String,
  },
  data() {
    return {
      statusMapBy: null,
      // groupData: null,
      statuses: this.$store.getters.board.labels.status,
    };
  },
  created() {
    // const groupData = this.data.filter(
    //   (groupData) => groupData._id === this.groupId
    // );
    // this.groupData = groupData[0];
    this.createMap();
  },
  computed: {
    groupData() {
      const groupData = this.data.filter(
        (groupData) => groupData._id === this.groupId
      );
      return groupData[0];
    },
    statusesMap() {
      return this.groupData.groupStatusCount;
    },
    statusesSum() {
      let sum = 0;
      for (const p in this.statusesMap) {
        sum += this.statusesMap[p];
      }
      return sum;
    },
  },
  methods: {
    createMap() {
      let currGroup = {};
      for (const p in this.statusesMap) {
        currGroup[p] = {
          count: this.statusesMap[p],
          style: this.statuses.find((pri) => pri.id === p),
        };
      }
      // console.log(currGroup, "curr");
      this.statusMapBy = currGroup;
      return currGroup;
    },
  },
};
</script>
