<template>
  <section class="board-group">
    <task-preview></task-preview>
  </section>
</template>

<script>
import taskPreview from './task-preview.vue'
export default {
  name: 'board-group',
  components: {
    taskPreview,
  },
}
</script>
