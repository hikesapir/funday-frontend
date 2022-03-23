<template>
  <div class="title-picker">
    <div
      class="left-indicator-inner"
      :style="{
        'background-color': labelColor.style.color,
      }"
    ></div>
    <div class="editable-component">
      <div v-if="isEditing" class="edit-title">
        <input
          type="text"
          @keyup.enter="saveTitle"
          @blur="saveTitle"
          v-model="title"
        />
      </div>
      <div v-else class="task-title">
        <span>
          {{ task?.title }}
        </span>
      </div>
    </div>
    <div class="edit-icon">
      <button class="edit-title-btn" @click="editTask">
        Edit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'title-picker',
  props: {
    task: Object,
    groupId: String,
  },
  data() {
    return { isEditing: false, title: '' }
  },
  created() {
    this.title = this.task.title
  },
  computed: {
    labelColor() {
      return this.$store.getters.board?.groups.find(
        (group) => group.id === this.groupId
      )
    },
  },
  methods: {
    editTask() {
      this.isEditing = true
    },
    saveTitle() {
      this.isEditing = false
      this.$emit('update', {
        cmpType: 'title-picker',
        title: this.title,
        task: this.task,
      })
    },
  },
}
</script>
