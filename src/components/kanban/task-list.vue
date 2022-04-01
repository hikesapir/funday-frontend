<template>
  <div class="task-list-container">
    <Container>
      <Draggable>
        <!-- <span>{{ statusTxt }}</span> -->
        <!-- <task
          v-for="task in tasks"
          :key="task.id + +'k'"
          :task="task"
        /> -->
      </Draggable>
    </Container>
  </div>
</template>
<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import kTaskPreview from './k-task-preview.vue'
export default {
  name: 'task-list',
  prop: {
    statusTxt: String,
  },
  components: {
    kTaskPreview,
    Container,
    Draggable,
  },
  created() {},
  computed: {
    tasks() {
      // return this.group?.tasks
    },
  },
}
</script>
