<template>
  <section class="board-group">
    <task-preview :task="task"></task-preview>
  </section>
</template>

<script>
import taskPreview from './task-preview.vue'
export default {
  name: 'board-group',
  props: {
    task: Object,
  },
  components: {
    taskPreview,
  },
}
</script>
