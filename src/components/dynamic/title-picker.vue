<template>
  <div class="title-picker">
    <p class="task-title">{{ task?.title }}</p>
  </div>
</template>

<script>
export default {
  name: 'title-picker',
  props: {
    task: Object,
  },
}
</script>
