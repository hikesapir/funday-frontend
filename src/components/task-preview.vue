<template>
  <section class="task-preview">
    <component
      class="task-column"
      v-for="cmp in cmpsOrder"
      :is="cmp"
      :key="cmp"
      :task="task"
      @update="updateTask"
    ></component>
  </section>
</template>

<script>
import filePicker from './dynamic/file-picker.vue'
import memberPicker from './dynamic/member-picker.vue'
import statusPicker from './dynamic/status-picker.vue'
import tagPicker from './dynamic/tag-picker.vue'
import timelinePicker from './dynamic/timeline-picker.vue'
import priorityPicker from './dynamic/priority-picker.vue'
import titlePicker from './dynamic/title-picker.vue'

export default {
  name: 'task-preview',
  props: {
    task: Object,
  },
  data() {
    return {}
  },
  components: {
    filePicker,
    memberPicker,
    statusPicker,
    priorityPicker,
    tagPicker,
    timelinePicker,
    titlePicker,
  },
  methods: {
    updateTask(task) {
      console.log('task', task)
    },
  },
  computed: {
    cmpsOrder() {
      return this.$store.getters.board.cmpsOrder
    },
  },
}
</script>
