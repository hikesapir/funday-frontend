<template>
  <section class="main-app">
    <board-nav :boards="boards"></board-nav>
    <section class="board-app">
      <board-header />
      <board-group></board-group>
      <button @click="$router.push('/')">
        Back to homepage
      </button>
    </section>
  </section>
</template>

<script>
import boardGroup from '../components/board-group.vue'
import boardHeader from '../components/board-header.vue'

import boardNav from '../components/board-nav.vue'
export default {
  components: {
    boardGroup,
    boardHeader,
    boardNav,
  },
  computed: {
    boards() {
      return this.$store.getters.boards
    },
  },
}
</script>
