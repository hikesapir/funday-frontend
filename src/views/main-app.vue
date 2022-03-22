<template>
  <section class="main-app">
    <board-group></board-group>
    <button @click="$router.push('/')">
      Back to homepage
    </button>
  </section>
</template>

<script>
import boardGroup from '../components/board-group.vue'
export default {
  components: {
    boardGroup,
  },
}
</script>
