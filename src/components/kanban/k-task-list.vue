<template>
  <section class="k-task-list">
    <k-task-preview v-for="task in list" :key="task.id" :task="task" />
  </section>
</template>

<script>
import kTaskPreview from "./k-task-preview.vue";
export default {
  name: "k-task-list",
  props: {
    list: Array,
  },
  components: {
    kTaskPreview,
  },
  created() {},
  computed: {},
};
</script>
