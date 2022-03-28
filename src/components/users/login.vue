<template>
  <section class="login">
    <article>
      <div class="login-container">
        <form @submit.prevent="login">
          <h1>Welcome to Funday.com</h1>

          <h3>Get started - it's free. No credit card needed.</h3>

          <input
            type="text"
            v-model="user.username"
            placeholder="Enter username"
          />
          <input
            type="password"
            v-model="user.password"
            placeholder="Enter password"
          />
          <button @click="login">Login</button>
        </form>
        <div class="pic"></div>
      </div>
    </article>
  </section>
  <pre style="color: white"></pre>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {},
  methods: {
    login() {
      this.$store.dispatch({
        type: "login",
        user: JSON.parse(JSON.stringify(this.user)),
      });
    },
    logout() {
      this.$store.dispatch({
        type: "logout",
        user: JSON.parse(JSON.stringify(this.user)),
      });
    },
  },
};
</script>
