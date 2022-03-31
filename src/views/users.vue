<template>
  <section class="users">
    <div class="background-blur">
      <router-link to="/users/login">Login</router-link> |
      <router-link to="/users/signup">Sign up</router-link>
      <router-view />
    </div>
  </section>
  <pre style="color: white"></pre>
</template>

<script>
export default {
  name: "users",
  components: {},
  data() {
    return {};
  },

  computed: {},
  methods: {},
};
</script>
