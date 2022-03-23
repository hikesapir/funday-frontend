<template>
  <div class="title-picker">
    <div class="left-indicator-inner"></div>
    <div class="task-title">{{ task?.title }}</div>
  </div>
</template>

<script>
export default {
  name: "title-picker",
  props: {
    task: Object,
  },
};
</script>
