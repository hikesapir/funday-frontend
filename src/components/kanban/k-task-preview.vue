<template>
  <div class="k-tast-preview">
    <div class="task-body">
      <div class="k-task-title">
        <div class="word-size ellipsis">
          {{ task.title }}
        </div>
        <priority-picker
          class="k-priority-card"
          :groupId="task.groupId"
          :task="task"
        />
      </div>
      <div class="k-task-card">
        <timeline-picker
          :task="task"
          :groupId="task.groupId"
        />
        <member-picker :task="task" />
      </div>
    </div>
  </div>
</template>
<script>
import priorityPicker from '../dynamic/priority-picker.vue'
import memberPicker from '../dynamic/member-picker.vue'
import timelinePicker from '../dynamic/timeline-picker.vue'
import tagPicker from '../dynamic/tag-picker.vue'
export default {
  name: 'k-tast-preview',
  props: {
    task: Object,
  },
  components: {
    priorityPicker,
    memberPicker,
    tagPicker,
    timelinePicker,
  },
}
</script>
