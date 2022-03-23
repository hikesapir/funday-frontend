<template>
  <div class="title-picker">
    <div
      class="left-indicator-inner"
      :style="{ 'background-color': labelColor.style.color }"
    ></div>
    <div class="task-title">{{ task?.title }}</div>
  </div>
</template>

<script>
export default {
  name: "title-picker",
  props: {
    task: Object,
    groupId: String,
  },
  computed: {
    labelColor() {
      return this.$store.getters.board?.groups.find(
        (group) => group.id === this.groupId
      );
    },
  },
};
</script>
