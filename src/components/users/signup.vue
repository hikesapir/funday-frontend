<template>
  <section class="sign-up">
    <article>
      <div class="login-container">
        <form @submit.prevent="signup">
          <h1>Lets start...</h1>

          <h3>it's free. No credit card needed.</h3>

          <input
            type="text"
            v-model="newUser.fullname"
            placeholder="Enter fullname"
          />
          <input
            type="text"
            v-model="newUser.username"
            placeholder="Enter username"
          />
          <input
            type="password"
            v-model="newUser.password"
            placeholder="Enter password"
          />
          <button @click="signup">Signup</button>
        </form>
        <div class="pic"></div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: "sign-up",
  components: {},
  data() {
    return {
      newUser: {
        fullname: "",
        username: "",
        password: "",
      },
    };
  },

  computed: {},
  methods: {
    signup() {
      console.log(this.newUser);
      this.$store.dispatch({
        type: "signup",
        newuser: JSON.parse(JSON.stringify(this.newUser)),
      });
      this.newUser = {
        fullname: "",
        username: "",
        password: "",
      };
    },
  },
};
</script>
