<template>
  <section class="home-page">
    <!-- <router-link class="white-link" to="/users/login">Login</router-link> -->
    <header>
      <div class="logo-container">
        <img class="home-page-logo" src="../assets/favicon.png" />
        <span class="logo">Funday<label>.com</label></span>
      </div>
      <div class="nav-home-page">
        <div class="left-nav">
          <div class="about">
            The Team
            <svg
              width="7"
              height="6"
              viewBox="0 0 7 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="link-item-with-menu-icon"
            >
              <path
                d="M6 3.071l-2.5 2-2.5-2"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path stroke="#000" stroke-linecap="round" d="M3.5.5v4"></path>
            </svg>
          </div>
          <div class="about">
            Features
            <svg
              width="7"
              height="6"
              viewBox="0 0 7 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="link-item-with-menu-icon"
            >
              <path
                d="M6 3.071l-2.5 2-2.5-2"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path stroke="#000" stroke-linecap="round" d="M3.5.5v4"></path>
            </svg>
          </div>
          <div class="about">
            Features
            <svg
              width="7"
              height="6"
              viewBox="0 0 7 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="link-item-with-menu-icon"
            >
              <path
                d="M6 3.071l-2.5 2-2.5-2"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path stroke="#000" stroke-linecap="round" d="M3.5.5v4"></path>
            </svg>
          </div>
        </div>
        <div class="right-nav">
          <div class="about">Pricing</div>
          <div class="about">Log in</div>
          <div class="about">Sign in</div>
          <button class="get-start">Get Started</button>
        </div>
      </div>
    </header>

    <!-- <div class="main-home-page"> -->
    <!-- <h1>Welcome to Funday</h1>
      <h2>Your project management tool</h2>
      <button @click="$router.push(`/boards/${getFirstBoardId}`)">
        Go to board
      </button> -->

    <!-- </div> -->
  </section>
</template>

<script>
export default {
  name: "home-page",
  computed: {
    getFirstBoardId() {
      return this.$store.getters.boards[0]._id;
    },
  },
};
</script>
