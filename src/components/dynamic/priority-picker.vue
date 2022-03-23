<template>
  <div :style="getStyle" class="priority-picker-col">
    {{ selectedPriorty?.txt }}
  </div>
  <!-- {{ selectedPriorty }} -->
</template>

<script>
export default {
  name: 'priority-picker',
  props: {
    task: Object,
  },
  data() {
    return {
      prioritys: this.$store.getters.board.labels.priority,
      selectedPriorty: '',
    }
  },
  created() {
    this.selectedPriorty = this.prioritys.find(
      (priority) => priority.id === this.task.priority
    )
  },
  computed: {
    getStyle() {
      return {
        backgroundColor: this.selectedPriorty?.color,
        color: 'white'
      }
    },
  },
}
</script>
