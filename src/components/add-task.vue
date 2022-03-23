<template>
  <div class="add-task">
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        v-model="task.title"
        placeholder="+ Add task"
      />
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import boardService from '../services/board-service.js'

export default {
  name: 'add-task',
  data() {
    return {
      task: boardService.getEmptyTask(),
    }
  },
  methods: {
    onSubmit() {
      this.$emit('taskAdded', this.task)
      this.task = ''
    },
  },
}
</script>
