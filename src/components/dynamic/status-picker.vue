<template>
  <div>
    <div class="status-picker-col" :style="{ 'background-color': style.color }">
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
    // getStatus() {
    //   this.
    // },
    style() {
      // console.log(this.statuses);
      return this.statuses.find((status) => status.id === this.task.status);
    },
  },
};
</script>
