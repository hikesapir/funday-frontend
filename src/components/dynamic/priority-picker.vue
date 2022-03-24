<template>
  <div
    :style="getStyle"
    class="priority-picker-col priority"
    data-toggle="p-dropdown"
    @click="isDropOpen = !isDropOpen"
    tabindex="-1"
  >
    {{ txt }}
    <div v-if="isDropOpen">
      <drop-down
        :labels="priorities"
        @update="updateTask"
        role="menu"
        :aria-labelledby="'menu-p' + task.id"
        tabindex="-1"
        @blur="isDropOpen = false"
        type="status"
      />
    </div>
  </div>
</template>

<script>
import dropDown from './drop-down.vue'
export default {
  components: { dropDown },
  name: 'priority-picker',
  props: {
    task: Object,
  },
  data() {
    return {
      isDropOpen: false,
      priorities: this.$store.getters.board.labels.priority,
      selectedPriority: '',
    }
  },
  created() {
    this.selectedPriority = this.priorities.find(
      (priority) => priority.id === this.task.priority
    )
  },
  methods: {
    updateTask(val) {
      this.isDropOpen = false

      this.$emit('update', {
        cmpType: `priority-picker`,
        val,
        task: this.task,
      })
    },
  },
  computed: {
    txt() {
      const { priority } = this.$store.getters.board?.labels
      const currPriority = priority?.find(
        (s) => s.id === this.task.priority
      )
      return currPriority.txt
    },
    getStyle() {
      const { priority } = this.$store.getters.board?.labels
      const currPriority = priority?.find(
        (s) => s.id === this.task.priority
      )
      return {
        backgroundColor: currPriority?.color,
        color: 'white',
      }
    },
  },
}
</script>
