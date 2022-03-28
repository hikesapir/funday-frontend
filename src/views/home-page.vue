<template>
  <section class="home-page">
    <div class="main-home-page">
      <img class="home-page-logo" src="../assets/favicon.png" alt />
      <h1>Welcome to Funday</h1>
      <h2>Your project management tool</h2>
      <button @click="$router.push('/boards/b101')">Go to board</button>
      <router-link class="white-link" to="/users/login">Login</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "home-page",
};
</script>
