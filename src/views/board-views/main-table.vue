<template>
<<<<<<< HEAD
  <div v-if="board" class="main-table">
    <Container v-if="board?.groups" @drop="onDrop" drag-handle-selector=".drag-handle">
      <Draggable v-for="group in board?.groups" :key="group.id">
=======
  <div class="main-table">
    <Container
      v-if="board?.groups"
      @drop="onDrop"
      orientation="vertical"
      drag-handle-selector=".drag-handle"
    >
      <Draggable
        v-for="group in board?.groups"
        :key="group.id"
      >
>>>>>>> a59c44c65d4d23db062b7d7e3c815af2fa1b95a0
        <board-group
          :group="JSON.parse(JSON.stringify(group))"
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
  props: {
    board: Object
  },
  components: {
    Container,
    Draggable,
    boardGroup,
  },
  computed: {
  },
  methods: {
    onDrop(dropResult) {
      this.$store.dispatch({
        type: 'changeOrder',
        dropResult,
        entities: this.board.groups,
        entityType: 'groups',
      })
    },
  },
}
</script>
