<template>
  <div class="wrapper">
    <div
      class="status-picker-col status relative"
      :style="style"
      @click="toggleModal"
    >
      <img
        v-if="isAchieved"
        class="confetti"
        src="https://sunday-app-pro.herokuapp.com/img/done.900c9a2e.gif"
      />
      <p>{{ txt }}</p>
    </div>
    <div v-if="isDropOpen" class="relative">
      <drop-down
        :labels="statuses"
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
  name: 'status-picker',
  props: {
    task: Object,
  },
  data() {
    return {
      isDropOpen: false,
      statuses: this.$store.getters.board?.labels.status,
      isAchieved: false,
    }
  },

  methods: {
    updateTask(val) {
      this.isDropOpen = false
      if (val === 's001') {
        this.isAchieved = true
        setTimeout(() => (this.isAchieved = false), 2000)
      }
      this.$emit('update', {
        cmpType: `status-picker`,
        val,
        task: this.task,
      })
    },
    toggleModal() {
      this.isDropOpen = !this.isDropOpen
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
