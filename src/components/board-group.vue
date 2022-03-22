<template>
  <section class="board-group">
    <task-preview
      v-for="task in group?.tasks"
      :key="task.id"
    ></task-preview>
  </section>
</template>

<script>
import taskPreview from './task-preview.vue'
export default {
  name: 'board-group',
  props: {
    group: Object,
  },
  components: {
    taskPreview,
  },
}
</script>
