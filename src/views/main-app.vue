<template>
  <section class="main-app">
    <board-nav :boards="boards"></board-nav>
    <board-group></board-group>
    <button @click="$router.push('/')">
      Back to homepage
    </button>
  </section>
</template>

<script>
import boardGroup from '../components/board-group.vue'
import boardNav from '../components/board-nav.vue'
export default {
  components: {
    boardGroup,
    boardNav,
  },
  computed: {
    boards() {
      return this.$store.getters.boards
    },
  },
}
</script>
