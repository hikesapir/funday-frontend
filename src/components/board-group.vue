<template>
  <section class="board-group">
    <div class="table-head">
      <div class="th-title">{{group.title}}</div>
      <div v-for="cmp in cmpsOrder" :class="cmp+'-col'" :key="cmp.cmpName">{{cmp.preName}}</div>
    </div>
    <task-preview v-for="task in group?.tasks" :key="task.id" :task="task" :cmps="group.cmpsOrder"></task-preview>
  </section>
</template>

<script>
import taskPreview from './task-preview.vue'
export default {
  name: 'board-group',
  props: {
    group: Object,
    cmpsOrder: Array
  },
  components: {
    taskPreview,
  },
}
</script>
