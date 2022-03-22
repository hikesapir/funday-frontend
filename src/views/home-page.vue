<template>
    <board-header />
  <section class="home-page">
    <h1>Welcome to Funday, your project management tool</h1>
    <button @click="$router.push('/boards/s456s1')">Go to board</button>
  </section>
</template>

<script>
import boardHeader from "../components/board-header.vue"
export default {
  name: 'home-page',
  components: {
    boardHeader,
  },
}
</script>
