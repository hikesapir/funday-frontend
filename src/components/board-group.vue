<template>
  <section class="board-group">
    <div class="table-head-wrapper">
      <div
        class="table-head relative"
        style="cursor: default"
      >
        <div
          class="th-title title-picker-col"
          :style="{ color: group.style?.color }"
          @mouseover="isHover = true"
          @mouseleave="isHover = false"
        >
          <div
            class="group-menu-open"
            @click="toggleGroupContext"
            track-by="$index"
            @mouseover="isHoverGroupMenu = true"
            @mouseleave="isHoverGroupMenu = false"
          >
            <span>
              <i
                class="fa-solid fa-circle-chevron-down"
              ></i>
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
          <span
            contenteditable="true"
            class="editable-cmp group-title title-picker-col"
            @keyup.enter="updateGroup"
            @blur="updateGroup"
            ref="editableSpan"
            >{{ group.title }}</span
          >
        </div>
        <section v-show="openContext" class="context-modal">
          <button
            @click="
              ;(changeName = true), (openContext = false)
            "
          >
            Rename Group
          </button>
          <button @click="openPallete">Change color</button>
          <button @click="remove">Delete</button>
        </section>
        <div
          v-if="isPalleteOpen"
          class="group-color-pallete"
        >
          <a
            v-for="color in colors"
            :key="color"
            @click="setColor(color)"
            class="group-color-item"
            :style="{ 'background-color': color }"
          ></a>
        </div>
        <div
          v-show="!isDraggingGroups"
          class="group-cmp-columns"
        >
          <Container
            orientation="horizontal"
            @drop="onDrop($event, 'cmpsOrder')"
            drag-handle-selector=".cols-drag-handle"
            drag-class="drag-cols"
            :drop-placeholder="dropPlaceholderOptions"
          >
            <Draggable
              v-for="cmp in cmps"
              :class="cmp.cmpName + '-col'"
              :key="cmp.cmpName"
            >
              <div
                :class="['th-header', cmp.cmpName + '-col']"
              >
                <i
                  v-if="cmp.cmpName !== 'title-picker'"
                  class="cols-drag-handle fa-solid fa-grip-vertical"
                ></i>
                <span
                  v-if="cmp.cmpName !== 'title-picker'"
                  @click="setSortBy(cmp.cmpName)"
                  class="sort-col-btn"
                >
                  <i class="fa fa-sort-desc desc-icon"></i>
                  <i class="fa fa-sort-asc asc-icon"></i>
                </span>
                <span class="cmp-title">
                  <span
                    @click="editCmpTitle(cmp.preName)"
                    v-if="!isEditing(cmp.preName)"
                    >{{ cmp.preName }}</span
                  >
                  <span v-show="isEditing(cmp.preName)">
                    <input
                      type="text"
                      @keyup.enter="
                        saveCmpTitle(cmp.preName)
                      "
                      @blur="saveCmpTitle(cmp.preName)"
                      v-model="newCmpTitle"
                    />
                  </span>
                </span>
              </div>
            </Draggable>
          </Container>
        </div>
      </div>
    </div>

    <div v-show="!isDraggingGroups" class="group-tasks">
      <Container
        v-if="group?.tasks"
        @drop="onDrop($event, 'tasks', groupIdx)"
        group-name="board-tasks"
        orientation="vertical"
        :get-child-payload="getChildPayload"
        drag-handle-selector=".task-drag-handle"
        drag-class="drag-task"
        :drop-placeholder="dropPlaceholderOptions"
      >
        <Draggable
          v-for="task in group?.tasks"
          :key="task.id"
        >
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

import {
  socketService,
  SOCKET_EMIT_TASK_ADD,
} from '../services/socket-service.js'

export default {
  name: 'board-group',
  props: {
    group: Object,
    cmpsOrder: Array,
    groupIdx: Number,
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
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: false,
      },
      isHover: false,
      isHoverGroupMenu: false,
      openContext: false,
      changeName: false,
      prevCmpTitle: false,
      newCmpTitle: '',
      isPalleteOpen: false,
      colors: [
        'rgb(3, 127, 76)',
        'rgb(0, 200, 117)',
        'rgb(156, 211, 38)',
        'rgb(202, 182, 65)',
        'rgb(255, 203, 0)',
        'rgb(120, 75, 209)',
        'rgb(162, 93, 220)',
        'rgb(0, 134, 192)',
        'rgb(87, 155, 252)',
        'rgb(187, 51, 84)',
        'rgb(226, 68, 92)',
        'rgb(255, 21, 138)',
        'rgb(255, 90, 196)',
        'rgb(255, 100, 46)',
        'rgb(253, 171, 61)',
        'rgb(127, 83, 71)',
        'rgb(196, 196, 196)',
        'rgb(128, 128, 128)',
      ],
    }
  },
  computed: {
    sortBy() {
      return this.$store.getters.sortBy
    },
    cmps() {
      const cmps = this.$store.getters.board.cmpsOrder
      return cmps
    },
    isDraggingGroups() {
      return this.$store.getters.groupDragMode
    },
  },
  methods: {
    toggleGroupContext() {
      this.openContext = !this.openContext

      // setTimeout(() => this.$refs.groupContext.focus(), 0)
    },
    setColor(color) {
      this.isPalleteOpen = false
      this.$store.dispatch({
        type: 'changeGroupColor',
        groupId: this.group.id,
        color,
      })
    },
    openPallete() {
      this.isPalleteOpen = true
      this.openContext = false
    },
    setSortBy(sortBy) {
      this.$store.commit({ type: 'setSortBy', sortBy })
    },
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
    saveCmpTitle(cmpName) {
      if (cmpName === this.newCmpTitle) {
        this.newCmpTitle = ''
        this.prevCmpTitle = ''
        return
      }
      this.$store.dispatch({
        type: 'saveCmpTitle',
        prevCmpTitle: this.prevCmpTitle,
        newCmpTitle: this.newCmpTitle,
      })
      this.newCmpTitle = ''
      this.prevCmpTitle = ''
    },
    isEditing(cmp) {
      return this.prevCmpTitle === cmp && cmp
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
    onDrop(dropResult, entityType, idx) {
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
      const prevGroupTitle =
        this.$refs.editableSpan.innerText
      if (group.title === prevGroupTitle) return
      group.title = prevGroupTitle
      this.$store.dispatch({
        type: 'saveGroup',
        group,
      })
      this.changeName = false
    },
  },
}
</script>
