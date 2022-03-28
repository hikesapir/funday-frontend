<template>
  <div class="wrapper">
    <div
      :style="getStyle"
      class="priority-picker-col priority relative"
      @click="toggleDropDown"
    >
      {{ txt }}
    </div>
    <div v-if="isDropOpen" class="relative">
      <drop-down
        :labels="priorities"
        @update="updateTask"
        @closeModal="isDropOpen = false"
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
    groupId: String,
  },
  data() {
    return {
      isDropOpen: false,
      priorities: this.$store.getters.board.labels.priority,
    }
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
    toggleDropDown() {
      this.isDropOpen = !this.isDropOpen
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
      const currPriority = priority?.find((s) => {
        return s.id === this.task.priority
      })
      const style = {
        backgroundColor: currPriority?.color,
        color: 'white',
      }
      return style
    },
  },
}
</script>
