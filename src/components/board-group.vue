<template>
  <section class="board-group">
    <div class="table-head">
      <span class="drag-handle">
        <i class="fa-solid fa-grip-vertical"></i>
      </span>

      <div
        class="th-title title-picker-col"
        :style="{ color: group.style?.color }"
      >
        {{ group.title }}
      </div>

      <Container
        lock-axis="x"
        orientation="horizontal"
        @drop="onDrop($event, 'cmps')"
        drag-handle-selector=".cols-drag-handle"
        class="title-head"
      >
        <Draggable
          v-for="cmp in cmps"
          :class="cmp.cmpName + '-col' + ' cols-drag-handle title-head'"
          :key="cmp.cmpName"
        >
          {{ cmp.preName }}
        </Draggable>
      </Container>
    </div>

    <Container
      v-if="group?.tasks"
      @drop="onDrop($event, 'task')"
      drag-handle-selector=".task-drag-handle"
    >
      <Draggable v-for="task in group?.tasks" :key="task.id">
        <task-preview :task="task" :groupId="group.id" />
      </Draggable>
    </Container>

    <add-task :groupId="group.id" @taskAdded="addTask" />
  </section>
</template>

<script>
import taskPreview from "./task-preview.vue";
import { Container, Draggable } from "vue3-smooth-dnd";

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
    Container,
    Draggable,
  },
  computed: {
    cmps() {
      const cmps = this.$store.getters.board.cmpsOrder;
      cmps.unshift();
      return cmps;
    },
    cmpsArr() {
      return this.$store.getters.board.cmpsOrder;
    },
  },
  // },
  methods: {
    addTask(task) {
      this.$store.dispatch({
        type: "saveTask",
        task,
        groupId: this.group.id,
      });
    },

    onDrop(dropResult, element) {
      var currEntities = null;
      if (element === "cmps") currEntities = this.cmpsArr;
      else if (element === "task")
        currEntities = { groupId: this.group.id, tasks: this.group.tasks };

      this.$store.dispatch({
        type: "changeOrderGroups",
        dropResult,
        entities: currEntities,
        entityType: "cmpsOrder",
        element,
      });
    },

    // onDrop(dragResult) {
    //   this.$store.dispatch({
    //     type: "applyDrag",
    //     tasksOrder: this.group.tasks,
    //     dragResult,
    //     groupId: this.group.id,
    //   });
    // },
  },
};
</script>
