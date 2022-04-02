<template>
  <div class="number-picker container">
    <div
      class="number-picker task-drag-handle"
      @mouseover="hoverEdit = true"
      @mouseout="hoverEdit = false"
      @click="isEditing = true"
    >
      <span class="btn" v-if="hoverEdit && !task.number">
        <fa icon="circle-plus" @click.stop="openModal" />
        <i class="fa-solid fa-input-numeric"></i>
      </span>
      <div class="editable-component">
        <div v-show="isEditing" class="edit-number">
          <input
            type="number"
            @keyup.enter="saveNumber"
            @blur="saveNumber"
            v-model="number"
            ref="input"
            class="edit-number input"
          />
        </div>
        <div v-show="!isEditing" class="task-number">
          <span
            @click.stop="toggleEditTask"
            :style="{
              border: hoverEdit ? '1px solid #c4c4c4' : 'none',
              padding: hoverEdit ? '3px' : 'none',
            }"
          >
            {{ task?.number }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "number-picker",
  props: {
    task: Object,
    groupId: String,
    isHover: Boolean,
    boardId: String,
  },
  data() {
    return {
      isEditing: false,
      number: "",
      hoverEdit: false,
      hover: false,
      openModal: false,
    };
  },
  created() {
    this.number = this.task.number;
  },
  computed: {},
  methods: {
    toggleEditTask() {
      this.isEditing = !this.isEditing;
      setTimeout(() => this.$refs.input.focus(), 0);
    },
    saveNumber() {
      this.isEditing = false;
      this.$emit("update", {
        cmpType: "number-picker",
        number: this.number,
        task: this.task,
      });
    },
  },
};
</script>
