<template>
  <div
    class="task-and-side-indicator"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <div
      v-if="isHover || openModal"
      class="task-menu-arrow"
      @click="openModal = !openModal"
    >
      <i class="fa-solid fa-caret-down"></i>
      <div v-if="openModal" class="context-modal">
        <button @click="deleteTask(groupId, task.id)">
          <i class="fa-regular fa-trash-can"></i>Delete
        </button>
      </div>
    </div>
    <section class="task-preview">
      <component
        v-for="cmp in cmpsOrder"
        :class="cmp.cmpName + '-col'"
        :is="cmp.cmpName"
        :key="cmp"
        :task="task"
        :groupId="groupId"
        @update="updateTask"
      ></component>
    </section>
    <div class="right-indicator-inner"></div>
  </div>
</template>

<script>
import filePicker from "./dynamic/file-picker.vue";
import memberPicker from "./dynamic/member-picker.vue";
import statusPicker from "./dynamic/status-picker.vue";
import tagPicker from "./dynamic/tag-picker.vue";
import timelinePicker from "./dynamic/timeline-picker.vue";
import priorityPicker from "./dynamic/priority-picker.vue";
import titlePicker from "./dynamic/title-picker.vue";

export default {
  name: "task-preview",
  props: {
    groupId: String,
    task: Object,
  },
  data() {
    return {
      isHover: false,
      openModal: false,
    };
  },
  components: {
    filePicker,
    memberPicker,
    statusPicker,
    priorityPicker,
    tagPicker,
    timelinePicker,
    titlePicker,
  },
  methods: {
    updateTask(data) {
      data.groupId = this.groupId;
      this.$store.dispatch({ type: "updateTask", data });
    },
    deleteTask(groupId, taskId) {
      this.$store.dispatch({ type: "removeTask", groupId, taskId });
    },
  },
  computed: {
    cmpsOrder() {
      return this.$store.getters.board.cmpsOrder;
    },
  },
};
</script>
