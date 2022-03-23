<template>
  <section class="board-group">
    <div class="table-head">
      <div class="th-title title-picker-col">
        {{ group.title }}
      </div>
      <div v-for="cmp in cmps" :class="cmp.cmpName + '-col'" :key="cmp.cmpName">
        {{ cmp.preName }}
      </div>
    </div>
    <task-preview
      v-for="task in group?.tasks"
      :key="task.id"
      :task="task"
      :groupId="group.id"
    />
    <add-task @taskAdded="addTask"></add-task>
  </section>
</template>

<script>
import taskPreview from "./task-preview.vue";
import addTask from "./add-task.vue";
export default {
  name: "board-group",
  props: {
    group: Object,
    cmpsOrder: Array,
  },
  components: {
    taskPreview,
    addTask,
  },
  computed: {
    cmps() {
      const cmps = this.$store.getters.board.cmpsOrder;
      cmps.unshift();
      return cmps;
    },
  },
  methods: {
    addTask(task) {
      this.$store.dispatch({
        type: "saveTask",
        task,
        groupId: this.group.id,
      });
    },
  },
};
</script>
