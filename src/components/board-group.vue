<template>
  <section class="board-group">
    <div class="table-head" style="cursor: default">
      <div
        class="th-title title-picker-col"
        :style="{ color: group.style?.color }"
      >
        <span class="drag-handle" style="cursor: grab">
          <i class="fa-solid fa-grip-vertical"></i>
        </span>
        {{ group.title }}
      </div>

      <Container
        orientation="horizontal"
        @drop="onDrop($event, 'cmpsOrder')"
        drag-handle-selector=".cols-drag-handle"
        drag-class="drag-cols"
      >
        <!-- class="title-head" -->
        <Draggable
          v-for="cmp in cmps"
          :class="
            cmp.cmpName + '-col' + ' cols-drag-handle'
          "
          :key="cmp.cmpName"
        >
          <!-- <i class="fa-solid fa-grip-vertical"></i> -->
          {{ cmp.preName }}
        </Draggable>
      </Container>
    </div>

    <Container
      v-if="group?.tasks"
      @drop="onDrop($event, 'tasks')"
      group-name="board-tasks"
      :get-child-payload="getChildPayload"
      drag-handle-selector=".task-drag-handle"
      drag-class="drag-task"
    >
      <Draggable
        v-for="task in group?.tasks"
        :key="task.id"
      >
        <task-preview :task="task" :groupId="group.id" />
      </Draggable>
    </Container>

    <add-task :groupId="group.id" @taskAdded="addTask" />
    <sum-preview :groupId="group.id" />
  </section>
</template>

<script>
import taskPreview from './task-preview.vue'
import sumPreview from './sum-preview.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'

import addTask from './add-task.vue'
export default {
  name: 'board-group',
  props: {
    group: Object,
    cmpsOrder: Array,
  },
  components: {
    taskPreview,
    sumPreview,
    addTask,
    Container,
    Draggable,
  },
  computed: {
    cmps() {
      const cmps = this.$store.getters.board.cmpsOrder
      cmps.unshift()
      return cmps
    },
  },
  // },
  methods: {
    addTask(task) {
      this.$store.dispatch({
        type: 'saveTask',
        task,
        groupId: this.group.id,
      })
    },
    getChildPayload(idx) {
      return this.group.tasks[idx]
    },
    onDrop(dropResult, entityType) {
      var entities = null
      if (entityType === 'cmpsOrder')
        entities = this.$store.getters.board.cmpsOrder
      else if (entityType === 'tasks')
        entities = {
          groupId: this.group.id,
          tasks: this.group.tasks,
        }
      this.$store.dispatch({
        type: 'changeOrder',
        dropResult,
        entities,
        entityType,
      })
    },
  },
}
</script>
