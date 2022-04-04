<template>
  <div class="add-task">
    <form @submit.prevent="onSubmit" :style="leftBoxStyle">
      <!-- <div class="task-menu-arrow"></div> -->
      <label>
        <input
          type="text"
          @focus="toggleFocus"
          @blur="onSubmit"
          v-model="task.title"
          placeholder="+ Add task"
          :class="leftBoxStyle"
          :style="{ width: inputWidth }"
        />
      </label>
      <button v-if="isFocused" :class="btnClass">Add</button>
    </form>
    <div class="right-indicator-inner"></div>
  </div>
</template>

<script>
import boardService from "../services/board-service.js";

export default {
  name: "add-task",
  props: {
    groupId: String,
  },
  data() {
    return {
      task: boardService.getEmptyTask(),
      isFocused: false,
    };
  },
  methods: {
    onSubmit() {
      this.isFocused = false;
      if (!this.task.title) return;
      this.$emit("taskAdded", JSON.parse(JSON.stringify(this.task)));
      this.task = boardService.getEmptyTask();
    },
    toggleFocus() {
      this.isFocused = !this.isFocused;
    },
  },
  computed: {
    inputWidth() {
      const isBoardNavOpen = this.$store.getters.boardNav;
      const isUpdateBarOpen = this.$store.getters.isTaskUpdatesOpen;
      if (window.innerWidth > 1450 && !isBoardNavOpen && isUpdateBarOpen)
        return `${1051}px`;
      else if (window.innerWidth > 1450 && !isBoardNavOpen) return `${1671}px`;
      else if (window.innerWidth > 1450 && isUpdateBarOpen) return `${840}px`;
      else return "1441px";
    },
    leftBoxStyle() {
      const group = this.$store.getters.board?.groups.find(
        (group) => group.id === this.groupId
      );
      return {
        "border-left": `7px solid ${group?.style?.color}`,
        opacity: this.isFocused ? 1 : 0.6,
        height: 38 + "px",
      };
    },
    btnClass() {
      return this.isFocused ? "focus" : "";
    },
  },
};
</script>

<style>
.space {
  width: 30px;
}
</style>
