<template>
  <section class="number-sum">
    <div class="number-sum-display" @click.stop="openModal">
      {{ groupData.numbers.length }}
    </div>
  </section>
  <div v-show="isModalOpen" class="context-modal">
    <div>Function:</div>
    <button>None</button>
    <button>Sum</button>
    <button>Average</button>
    <button>Median</button>
    <button>Min</button>
    <button>Max</button>
    <button>Count</button>
  </div>
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
      displayMode: null,
    };
  },
  computed: {
    groupData() {
      const groupData = this.data.find(
        (groupData) => groupData.id === this.groupId
      );
      return groupData;
    },
  },
  methods: {
    openModal() {
      this.isModalOpen = !this.isModalOpen;
    },
  },
};
</script>
