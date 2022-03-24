<template>
  <div
    :style="getStyle"
    class="priority-picker-col priority"
    @click="toggleDropDown"
    tabindex="0"
    @blur="toggleDropDown"
  >
    {{ selectedPriorty?.txt }}
    <div v-if="isDropOpen">
      <drop-down
        :labels="prioritys"
        @update="updateTask"
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
      prioritys: this.$store.getters.board.labels.priority,
      selectedPriorty: '',
    }
  },
  created() {
    this.selectedPriorty = this.prioritys.find(
      (priority) => priority.id === this.task.priority
    )
  },
  methods: {
    updateTask(val) {
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
    getStyle() {
      return {
        backgroundColor: this.selectedPriorty?.color,
        color: 'white',
      }
    },
  },
}
</script>
