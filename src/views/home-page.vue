<template>
  <section class="home-page">
    <h1>Welcome to Funday, your project management tool</h1>
    <button @click="$router.push('/boards/b101')">Go to board</button>
  </section>
</template>

<script>
export default {
  name: "home-page",
};
</script>
