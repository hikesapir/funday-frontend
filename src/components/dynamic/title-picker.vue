<template>
  <div class="title-picker task-drag-handle">
    <div
      class="left-indicator-inner"
      :style="{
        'background-color': labelColor.style.color,
      }"
    ></div>
    <div class="editable-component">
      <div v-show="isEditing" class="edit-title">
        <input
          type="text"
          @keyup.enter="saveTitle"
          @blur="saveTitle"
          v-model="title"
          ref="input"
        />
      </div>
      <div v-show="!isEditing" class="task-title">
        <span>
          {{ task?.title }}
        </span>
      </div>
    </div>
    <div class="edit-icon" tabindex="0" @blur="toggleEditTask">
      <button class="edit-title-btn" @click="toggleEditTask">Edit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "title-picker",
  props: {
    task: Object,
    groupId: String,
  },
  data() {
    return { isEditing: false, title: "" };
  },
  created() {
    this.title = this.task.title;
  },
  computed: {
    labelColor() {
      return this.$store.getters.board?.groups.find(
        (group) => group.id === this.groupId
      );
    },
  },
  methods: {
    toggleEditTask() {
      this.isEditing = !this.isEditing;
      setTimeout(() => this.$refs.input.focus(), 0);
    },
    saveTitle() {
      this.isEditing = false;
      this.$emit("update", {
        cmpType: "title-picker",
        title: this.title,
        task: this.task,
      });
    },
  },
};
</script>
