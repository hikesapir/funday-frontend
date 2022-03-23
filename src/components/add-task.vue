<template>
  <div class="add-task">
    <div
      class="left-indicator-inner"
      :style="leftBoxStyle"
    ></div>
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        @focus="toggleFocues"
        @blur="toggleFocues"
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
      this.$emit(
        'taskAdded',
        JSON.parse(JSON.stringify(this.task))
      )
      this.task = boardService.getEmptyTask()
    },
    toggleFocues() {
      this.isFocused = !this.isFocused
    },
  },
  computed: {
    leftBoxStyle() {
      const group = this.$store.getters.board?.groups.find(
        (group) => group.id === this.groupId
      )
      console.log('group?.style.color', group?.style.color)
      return {
        'background-color': group?.style.color,
        opacity: 0.6,
      }
    },
    btnClass() {
      console.log('this.isFocused', this.isFocused)
      return this.isFocused ? 'focus' : ''
    },
  },
}
</script>
