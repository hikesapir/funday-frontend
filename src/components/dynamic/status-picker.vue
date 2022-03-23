<template>
  <div class="status-picker-col" :style="style">
    {{ txt }}
  </div>
</template>

<script>
export default {
  name: 'status-picker',
  props: {
    task: Object,
  },
  data() {
    return {
      statuses: this.$store.getters.board?.labels.status,
    }
  },
  methods: {
    getStatus() {
      return this.statuses.find(
        (status) => status.id === this.task?.status
      )
    },
  },
  computed: {
    txt() {
      const status = this.getStatus()
      return status.txt
    },
    style() {
      const status = this.getStatus()
      return {
        backgroundColor: status?.color,
        color: 'white',
      }
    },
  },
}
</script>
