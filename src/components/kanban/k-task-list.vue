<template>
  <section class="k-task-list">
    <Container
      @drop="onDrop($event, 'k-tasks')"
      group-name="statusList"
      orientation="vertical"
      :get-child-payload="getChildPayload"
      drag-handle-selector=".k-task-drag-handle"
      drag-class="drag-task"
      :drop-placeholder="dropPlaceholderOptions"
    >
      <Draggable v-for="task in list.tasks" :key="task.id">
        <k-task-preview
          class="k-task-drag-handle"
          :task="task"
        />
      </Draggable>
    </Container>
  </section>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import kTaskPreview from './k-task-preview.vue'
export default {
  name: 'k-task-list',
  props: {
    list: Object,
  },
  components: {
    kTaskPreview,
    Container,
    Draggable,
  },
  data() {
    return {
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: false,
      },
    }
  },
  created() {},
  methods: {
    getChildPayload(idx) {
      return this.list.tasks[idx]
    },
    async onDrop(dropResult, entityType) {
      // if (
      //   dropResult.addedIndex &&
      //   !dropResult.removedIndex
      // ) {
      //   const data = {
      //     groupId: dropResult.payload.groupId,
      //     cmpType: 'status-picker',
      //     task: dropResult.payload,
      //     val: this.list.status.id,
      //   }

      //   await this.$store.dispatch({
      //     type: 'updateTask',
      //     data,
      //   })
      // }
      var entities = {
        status: this.list.status,
        tasks: this.list.tasks,
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
