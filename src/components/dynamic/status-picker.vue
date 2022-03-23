<template>
  <div>
    <div
      class="status-picker-col"
      :style="{ 'background-color': style.color, color: 'white' }"
    >
      {{ style.txt }}
    </div>
  </div>
</template>

<script>
export default {
  name: "status-picker",
  props: {
    task: Object,
  },
  data() {
    return {
      statuses: this.$store.getters.board?.labels.status,
    };
  },
  computed: {
    style() {
      return this.statuses.find((status) => status.id === this.task.status);
    },
  },
};
</script>
