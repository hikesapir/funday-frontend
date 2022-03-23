<template>
  <div class="priority-picker-col">{{ getPriority }}</div>
</template>

<script>
export default {
  name: 'priority-picker',
  props: {
    task: Object,
  },
  data() {
    return {
      prioritys: this.$store.getters.board.labels.priority

    }
  },
  computed: {
    getPriority() {
      return this.prioritys.find(priority => priority.id === this.task.priority)
    }
  },
}
</script>
