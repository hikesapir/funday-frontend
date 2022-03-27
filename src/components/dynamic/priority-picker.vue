<template>
  <div class="wrapper">
    <div
      :style="getStyle"
      class="priority-picker-col priority relative"
      data-toggle="p-dropdown"
      @click="toggleDropDown"
      tabindex="-1"
    >
      {{ txt }}
    </div>
    <div v-show="isDropOpen">
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
