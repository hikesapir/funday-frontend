<template>
  <section class="main-table">
    <div v-if="board" class="main-table-container">
      <Container
        :drop-placeholder="dropPlaceholderOptions"
        v-if="board?.groups"
        @drop="onDrop"
        orientation="vertical"
        drag-class="drag-group"
        drag-handle-selector=".drag-handle"
      >
        <Draggable
          v-for="(group, idx) in board?.groups"
          :key="group.id"
          style="
             {
              overflow: 'unset';
            }
          "
        >
          <board-group
            :group="JSON.parse(JSON.stringify(group))"
            :cmpsOrder="board?.cmpsOrder"
            :groupIdx="idx"
            :key="group.id"
          ></board-group>
        </Draggable>
      </Container>
    </div>
    <router-view />
    <!-- <router-view v-slot="{ Component }">
      <transition name="slide">
        <component :is="Component" />
      </transition>
    </router-view> -->
  </section>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import boardGroup from "../../components/board-group.vue";

export default {
  name: "main-table",
  props: {
    board: Object,
  },
  components: {
    Container,
    Draggable,
    boardGroup,
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
  computed: {
    isDraggingGroups() {
      return this.$store.getters.groupDragMode;
    },
  },
  methods: {
    onDrop(dropResult) {
      this.$store.dispatch({
        type: "changeOrder",
        dropResult,
        entities: this.board.groups,
        entityType: "groups",
      });
    },
  },
};
</script>
