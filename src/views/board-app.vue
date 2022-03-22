<template>
  <div class="board-app-container">
    <div class="open-side-bar">
      <board-nav :boards="boards"></board-nav>
    </div>
    <div class="board-app">
      <section class="board-app">
        <section class="board-app">
          <board-header />
          <board-group></board-group>
          <button @click="$router.push('/')">Back to homepage</button>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import boardGroup from "../components/board-group.vue";
import boardHeader from "../components/board-header.vue";

import boardNav from "../components/board-nav.vue";
export default {
  components: {
    boardGroup,
    boardHeader,
    boardNav,
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },
};
</script>
