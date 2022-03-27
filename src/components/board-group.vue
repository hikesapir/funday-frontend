<template>
  <section class="board-group">
    <div class="table-head relative" style="cursor: default">
      <div
        class="th-title title-picker-col"
        :style="{ color: group.style?.color }"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
      >
        <div
          class="group-menu-open"
          @click="openContext = !openContext"
          track-by="$index"
          @mouseover="isHoverGroupMenu = true"
          @mouseleave="isHoverGroupMenu = false"
        >
          <span>
            <i class="fa-solid fa-circle-chevron-down"></i>
          </span>
        </div>
        <span
          v-if="isHover"
          class="drag-handle"
          @mousedown="startDragGroupsMode()"
          style="cursor: move"
        >
          <i class="fa-solid fa-grip-vertical"></i>
        </span>
        <span v-if="!changeName" @click="toggleChangeNameMode" class="group-title">{{ group.title }}</span>
        <span
          v-else
          contenteditable="true"
          class="editable-cmp"
          @keyup.enter="updateGroup"
          @blur="updateGroup"
          ref="editableSpan"
        >{{ group.title }}</span>
      </div>
      <section v-if="openContext" class="context-modal">
        <button
          @click="
            ; (changeName = true), (openContext = false)
          "
        >Rename Group</button>
        <button @click="remove">Delete</button>
      </section>
      <div v-show="!isDraggingGroups" class="group-cmp-columns">
        <Container
          orientation="horizontal"
          @drop="onDrop($event, 'cmpsOrder')"
          drag-handle-selector=".cols-drag-handle"
          drag-class="drag-cols"
        >
          <Draggable v-for="cmp in cmps" :class="cmp.cmpName + '-col'" :key="cmp.cmpName">
            <div class="group-th">
              <i
                v-if="cmp.cmpName !== 'title-picker'"
                class="cols-drag-handle fa-solid fa-grip-vertical"
              ></i>
              <span class="cmp-title">
                <span
                  @click="editCmpTitle(cmp.preName)"
                  v-if="!isEditing(cmp.preName)"
                >{{ cmp.preName }}</span>
                <span v-show="isEditing(cmp.preName)">
                  <input
                    type="text"
                    @blur="saveCmpTitle"
                    @keyup.enter="saveCmpTitle"
                    v-model="newCmpTitle"
                  />
                </span>
              </span>
            </div>
          </Draggable>
        </Container>
      </div>
    </div>
    <div v-show="!isDraggingGroups" class="group-tasks">
      <Container
        v-if="group?.tasks"
        @drop="onDrop($event, 'tasks')"
        group-name="board-tasks"
        orientation="vertical"
        :get-child-payload="getChildPayload"
        drag-handle-selector=".task-drag-handle"
        drag-class="drag-task"
      >
        <Draggable v-for="task in group?.tasks" :key="task.id">
          <task-preview :task="task" :groupId="group.id" />
        </Draggable>
      </Container>

      <add-task :groupId="group.id" @taskAdded="addTask" />
      <sum-preview :groupId="group.id" />
    </div>
  </section>
</template>

<script>
import taskPreview from './task-preview.vue'
import sumPreview from './sum-preview.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'

import addTask from './add-task.vue'
export default {
  name: 'board-group',
  props: {
    group: Object,
    cmpsOrder: Array,
  },
  components: {
    taskPreview,
    sumPreview,
    addTask,
    Container,
    Draggable,
  },
  data() {
    return {
      isHover: false,
      isHoverGroupMenu: false,
      openContext: false,
      changeName: false,
      prevCmpTitle: false,
      newCmpTitle: '',
    }
  },
  computed: {
    cmps() {
      const cmps = this.$store.getters.board.cmpsOrder
      cmps.unshift()
      return cmps
    },
    isDraggingGroups() {
      return this.$store.getters.groupDragMode
    },
    // groupMenuStyle() {
    //   return {
    //     color: this.isHoverGroupMenu
    //       ? this.group.style?.color
    //       : '#f6f7fb',
    //     outline: this.isHoverGroupMenu
    //       ? `2px solid ${this.group.style?.color}`
    //       : 'none',
    //   }
    // },
  },
  methods: {
    mouseUp() {
      this.$store.commit('toggleGroupDragMode', false)
      window.removeEventListener('mouseup', this.mouseUp)
    },
    startDragGroupsMode() {
      this.$store.commit('toggleGroupDragMode', true)
      window.addEventListener('mouseup', this.mouseUp)
    },
    editCmpTitle(cmp) {
      this.prevCmpTitle = cmp
      this.newCmpTitle = cmp
    },
    saveCmpTitle() {
      this.$store.dispatch({
        type: 'saveCmpTitle',
        prevCmpTitle: this.prevCmpTitle,
        newCmpTitle: this.newCmpTitle,
      })
      this.prevCmpTitle = ''
      this.newCmpTitle = ''
    },
    isEditing(cmp) {
      return this.prevCmpTitle === cmp && cmp
    },
    toggleChangeNameMode() {
      this.changeName = !this.changeName
    },
    addTask(task) {
      this.$store.dispatch({
        type: 'saveTask',
        task,
        groupId: this.group.id,
      })
    },
    getChildPayload(idx) {
      return this.group.tasks[idx]
    },
    onDrop(dropResult, entityType) {
      var entities = null
      if (entityType === 'cmpsOrder')
        entities = this.$store.getters.board.cmpsOrder
      else if (entityType === 'tasks')
        entities = {
          groupId: this.group.id,
          tasks: this.group.tasks,
        }
      this.$store.dispatch({
        type: 'changeOrder',
        dropResult,
        entities,
        entityType,
      })
    },
    remove() {
      this.$store.dispatch({
        type: 'removeGroup',
        id: this.group.id,
      })
    },
    updateGroup() {
      const group = JSON.parse(JSON.stringify(this.group))
      group.title = this.$refs.editableSpan.innerText
      console.log('group.title', group.title)
      this.$store.dispatch({
        type: 'saveGroup',
        group,
      })
      this.changeName = false
    },
  },
}
</script>
