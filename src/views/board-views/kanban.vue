<template>
  <div class="kanban-view-container">
    <div v-for="status in statuses" :key="status">
      <div class="k-list-header" :style="{ 'background-color': status.color }">
        {{ status.txt || "Empty" }}
      </div>
      <k-task-List :list="tasksForDisplay[status.id]" />
    </div>
  </div>
</template>

<script>
import kTaskList from "../../components/kanban/k-task-list.vue";
export default {
  name: "kanban",
  components: {
    kTaskList,
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    tasksForDisplay() {
      const boardMapByStatus = { s000: [], s001: [], s002: [], s003: [] };
      const board = JSON.parse(JSON.stringify(this.board));
      board.groups.map((group) => {
        group.tasks.forEach((task) => {
          task.groupId = group.id;
          boardMapByStatus[task.status].push(task);
          console.log(task);
        });
      });
      return boardMapByStatus;
    },
    statuses() {
      return this.board.labels.status;
    },
  },
};
</script>
