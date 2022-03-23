<template>
  <div>
    <div class="status-picker-col" style="background-color: black">
      {{ task.status }}
    </div>
  </div>
</template>

<script>
export default {
  name: "status-picker",
  props: {
    task: Object,
  },
  name: "status-picker",
};
</script>
