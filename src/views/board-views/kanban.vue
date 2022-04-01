<template>
  <div class="kanban-view-container">
    Kanban
    <div v-if="board" class="main-kanban-wrapper">
      <!-- <Container
        orientation="horizontal"
        drag-class="drag-list"
        drag-handle-selector=".drag-list-handle"
      > -->
      <div
        class="kanban-list"
        v-for="status in board?.labels.status"
        :key="status.txt + 'k'"
      >
        <!-- <Draggable> -->
        <pre>

          {{ status.txt }}
        </pre>
        <task-list statusTxt="status" />
        <!-- </Draggable> -->
      </div>
      <!-- </Container> -->
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import taskList from '../../components/kanban/task-list.vue'
export default {
  name: 'main-table',
  components: {
    taskList,
    Container,
    Draggable,
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
  },
}
</script>
