<template>
  <section class="users">
    <router-link to="/users/login">Login</router-link> |
    <router-link to="/users/signup">Sign up</router-link>
    <router-view />
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
