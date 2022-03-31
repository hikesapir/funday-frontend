<template>
  <section v-if="task" class="task-details">
    <header>
      <button @click="closeTaskDetails"><i class="fa-solid fa-x"></i></button>
      <div class="title-wrapper">
        <div class="title">
          <h2>{{ task.title }}</h2>
        </div>
        <span class="members">
          <span
            class="member-preview"
            v-for="member in task.members"
            :key="member._id"
          >
            <img :src="member.imgUrl" />
          </span>
        </span>
        <span>
          <button>
            <i class="fa-solid fa-ellipsis"></i>
          </button>
        </span>
      </div>
    </header>
    <nav>
      <div class="btn-wrapper">
        <div class="main-btns">
          <button>Updates</button>
          <button>Files</button>
          <button>Activity Log</button>
        </div>
        <button>+ Add View</button>
      </div>
      <div class="spacer"></div>
    </nav>
    <section>
      <!-- {{task.updates}} -->
      <task-update
        v-if="task"
        :taskUpdate="task.updates"
        @updateTask="updateTask"
      />
    </section>
  </section>
</template>

<script>
import boardService from "../services/board-service.js";
import taskUpdate from "../components/pulses/task-update.vue";
import {
  socketService,
  SOCKET_EVENT_UPDATE_ADDED,
} from "../services/socket-service.js";

export default {
  name: "task-details",
  props: [],
  emits: [],
  components: {
    taskUpdate,
  },
  data() {
    return {
      // task: null,
    };
  },
  async created() {
    socketService.on(SOCKET_EVENT_UPDATE_ADDED, this.addUpdate);
    // const { id, groupId, taskId } = this.$route.params;
    // this.task = await boardService.getTaskById(id, groupId, taskId);
  },
  mounted() {},
  methods: {
    addUpdate({ taskId, boardId, groupId, update }) {
      this.$store.commit({
        type: "addUpdate",
        taskId,
        boardId,
        groupId,
        update,
      });
    },
    closeTaskDetails() {
      this.$store.commit({
        type: "setTaskUpdates",
        isOpen: false,
      });
      this.$router.push(`/boards/${this.boardId}`);
    },
    updateTask(update) {
      this.$store.dispatch({
        type: "addUpdate",
        update,
        taskId: this.params.taskId,
        boardId: this.params.id,
        groupId: this.params.groupId,
      });
    },
  },
  computed: {
    boardId() {
      return this.$route.params.id;
    },
    params() {
      return this.$route.params;
    },
    task() {
      return this.$store.getters.taskForDisplay;
    },
  },
  unmounted() {
    socketService.off(SOCKET_EVENT_UPDATE_ADDED, this.addUpdate);
  },
  watch: {
    params: {
      async handler() {
        const { id, groupId, taskId } = this.$route.params;
        if (!taskId) return;
        this.$store.commit({
          type: "setTaskFordisplay",
          id,
          groupId,
          taskId,
        });
        // this.task = this.$store.getters.taskFordisplay;
        // this.task = await boardService.getTaskById(id, groupId, taskId)
      },
      immediate: true,
    },
  },
};
</script>
