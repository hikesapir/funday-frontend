<template>
  <section class="task-preview">
    <div v-if="task">
      <component
        class="task-column"
        :is="task.type"
        :task="task"
        @update="updateTask"
      ></component>
    </div>
  </section>
</template>

<script>
export default {
  name: 'task-preview',
  props: {
    task: Object,
  },
  data() {
    return {}
  },
  methods: {
    updateTask(task) {
      console.log('task', task)
    },
  },
}
</script>
