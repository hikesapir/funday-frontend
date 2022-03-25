<template>
  <div class="add-task">
    <div
      class="left-indicator-inner"
      :style="leftBoxStyle"
    ></div>
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        @focus="toggleFocus"
        @blur="onSubmit"
        v-model="task.title"
        placeholder="+ Add task"
      />
      <button :class="btnClass">Add</button>
    </form>
  </div>
</template>

<script>
import boardService from '../services/board-service.js'

export default {
  name: 'add-task',
  props: {
    groupId: String,
  },
  data() {
    return {
      task: boardService.getEmptyTask(),
      isFocused: false,
    }
  },
  methods: {
    onSubmit() {
      this.isFocused = false
      if (!this.task.title) return
      this.$emit(
        'taskAdded',
        JSON.parse(JSON.stringify(this.task))
      )
      this.task = boardService.getEmptyTask()
    },
    toggleFocus() {
      this.isFocused = !this.isFocused
    },
  },
  computed: {
    leftBoxStyle() {
      const group = this.$store.getters.board?.groups.find(
        (group) => group.id === this.groupId
      )
      return {
        'background-color': group?.style?.color,
        opacity: this.isFocused ? 1 : 0.6,
      }
    },
    btnClass() {
      return this.isFocused ? 'focus' : ''
    },
  },
}
</script>
