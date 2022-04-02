<template>
  <div class="kanban-main">
    <Container
      :drop-placeholder="dropPlaceholderOptions"
      @drop="onDrop"
      class="kanban-view-container"
      orientation="horizontal"
      drag-class="drag-group"
      drag-handle-selector=".k-list-header"
    >
      <Draggable v-for="list in boardByStatus" :key="list.status">
        <div
          class="k-list-header"
          :style="{ 'background-color': list.status.color }"
        >
          {{ list.status.txt || "Empty" }}
        </div>
        <k-task-List :list="list" />
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import kTaskList from "../../components/kanban/k-task-list.vue";
export default {
  name: "kanban",
  components: {
    kTaskList,
    Container,
    Draggable,
  },

  data() {
    return {
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: false,
      },
    };
  },
  methods: {
    onDrop(dropResult) {
      this.$store.dispatch({
        type: "changeOrder",
        dropResult,
        entities: this.boardByStatus,
        entityType: "k-status",
      });
    },
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    kStatusOrder() {
      return this.$store.getters.kStatusOrder;
    },
    boardByStatus() {
      return this.$store.getters.boardByStatus;
    },
    statuses() {
      return this.board.labels.status;
    },
  },
};
</script>
