<template>
  <div
    class="status-picker-col"
    :style="style"
    data-toggle="s-dropdown"
    @click="isDropOpen = !isDropOpen"
  >
    {{ txt }}
    <div v-if="isDropOpen">
      <drop-down
        :labels="statuses"
        @update="updateTask"
        role="menu"
        :aria-labelledby="'menu-s' + task.id"
        tabindex="-1"
        type="status"
        @blur="isDropOpen = false"
      />
    </div>
  </div>
</template>

<script>
import dropDown from './drop-down.vue'
export default {
  components: { dropDown },
  name: 'status-picker',
  props: {
    task: Object,
  },
  data() {
    return {
      isDropOpen: false,
      statuses: this.$store.getters.board?.labels.status,
    }
  },

  methods: {
    updateTask(val) {
      this.isDropOpen = false
      this.$emit('update', {
        cmpType: `status-picker`,
        val,
        task: this.task,
      })
    },
  },
  computed: {
    txt() {
      const { status } = this.$store.getters.board?.labels
      const currStatus = status?.find(
        (s) => s.id === this.task.status
      )
      return currStatus.txt
    },
    style() {
      const { status } = this.$store.getters.board?.labels
      const currStyle = status?.find(
        (s) => s.id === this.task.status
      )
      return {
        backgroundColor: currStyle.color,
        color: 'white',
      }
    },
  },
}
</script>
