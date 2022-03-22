<template>
  <section class="task-preview">
    <component
      class="task-column"
      :is="task.type"
      :task="task"
      @update="updateTask"
    ></component>
  </section>
</template>

<script>
import taskPreview from './task-preview.vue'
export default {
  name: 'task-preview',
  props: {
    task: Object,
  },
  data() {
    return {}
  },
  components: {
    taskPreview,
  },
  methods: {
    updateTask(task) {
      console.log('task', task)
    },
  },
}
</script>
