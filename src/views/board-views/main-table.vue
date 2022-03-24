<template>
  <div class="main-table">
    <Container
      v-if="board?.groups"
      @drop="onDrop"
      drag-handle-selector=".drag-handle"
    >
      <Draggable
        v-for="group in board?.groups"
        :key="group.id"
      >
        <board-group
          :group="group"
          :cmpsOrder="board?.cmpsOrder"
          :key="group.id"
        ></board-group>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import boardGroup from '../../components/board-group.vue'

export default {
  name: 'main-table',
  props: {},
  components: {
    Container,
    Draggable,
    boardGroup,
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
  },
  methods: {
    onDrop(dropResult) {
      this.$store.dispatch({
        type: 'changeOrderGroups',
        dropResult,
        entities: this.board.groups,
        entityType: 'groups',
      })
    },
  },
}
</script>
