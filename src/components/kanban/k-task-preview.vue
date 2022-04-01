<template>
  <div class="k-tast-preview">
    <div class="task-body">
      <pre>{{ task.title }}</pre>
      <div class="k-task-card">
        <div>
          <tag-picker :task="task" :groupId="task.groupId" />
          <timeline-picker :task="task" :groupId="task.groupId" />
        </div>
        <div>
          <member-picker :task="task" />
          <priority-picker
            class="k-priority-card"
            :groupId="task.groupId"
            :task="task"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import priorityPicker from "../dynamic/priority-picker.vue";
import memberPicker from "../dynamic/member-picker.vue";
import timelinePicker from "../dynamic/timeline-picker.vue";
import tagPicker from "../dynamic/tag-picker.vue";
export default {
  name: "k-tast-preview",
  props: {
    task: Object,
  },
  components: {
    priorityPicker,
    memberPicker,
    tagPicker,
    timelinePicker,
  },
};
</script>
