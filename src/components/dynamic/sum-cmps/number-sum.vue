<template>
  <section class="number-sum relative">
    <div class="number-sum-display" @click.stop="openModal">
      {{ displayMode.charAt(0).toUpperCase() + displayMode.slice(1) }}:
      {{ displayNumbersBy }}
    </div>
    <div v-show="isModalOpen" class="context-modal">
      <div class="title">Display:</div>
      <button @click="changeDisplay('sum')">Sum</button>
      <button @click="changeDisplay('average')">Average</button>
      <button @click="changeDisplay('median')">Median</button>
      <button @click="changeDisplay('min')">Min</button>
      <button @click="changeDisplay('max')">Max</button>
      <button @click="changeDisplay('count')">Count</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    data: Array,
    groupId: String,
  },
  data() {
    return {
      isModalOpen: false,
      displayMode: "count",
    };
  },
  computed: {
    groupData() {
      const groupData = this.data.find(
        (groupData) => groupData.id === this.groupId
      );
      return groupData;
    },
    displayNumbersBy() {
      let count = this.groupData.numbers.length;
      let sum = this.groupData.numbers.reduce((pre, curr) => pre + curr, 0);
      const median = (arr) => {
        const mid = Math.floor(arr.length / 2),
          nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0
          ? nums[mid]
          : (nums[mid - 1] + nums[mid]) / 2;
      };

      if (this.displayMode === "count") return count;
      else if (this.displayMode === "sum") {
        return sum;
      } else if (this.displayMode === "average") return sum / count;
      else if (this.displayMode === "min")
        return Math.min(...this.groupData.numbers);
      else if (this.displayMode === "max")
        return Math.max(...this.groupData.numbers);
      else if (this.displayMode === "median")
        return median(this.groupData.numbers);
    },
  },
  methods: {
    openModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    changeDisplay(val = "count") {
      this.displayMode = val;
      this.isModalOpen = !this.isModalOpen;
    },
  },
};
</script>
