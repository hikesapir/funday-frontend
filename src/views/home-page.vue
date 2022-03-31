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
            <!-- <svg
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
            </svg> -->
          </div>
          <div class="about">Features</div>
          <div class="about">Dashboard</div>
        </div>
        <div class="right-nav">
          <div class="about">Pricing</div>
          <div class="about" @click="$router.push(`/users/login`)">Log in</div>
          <div class="about" @click="$router.push(`/users/signup`)">
            Sign up
          </div>
          <div
            class="start-btn"
            @click="$router.push(`/boards/${getFirstBoardId}`)"
          >
            See Demo
          </div>
        </div>
      </div>
    </header>

    <div class="main-content">
      <div v-for="n in 15" :key="n">
        <div class="universe-star shining" :style="getRandomPosition()"></div>
      </div>
      <div v-for="n in 10" :key="n">
        <div
          class="universe-star shining-delay"
          :style="getRandomPosition()"
        ></div>
      </div>
      <div class="universe-star left"></div>
      <div class="universe-star right"></div>
      <div class="big-txt">A platform built for a</div>
      <div class="big-txt">new way of working</div>
      <div class="medium-txt">
        What would you like to manage with Funday.com Work OS?
      </div>

      <div class="falling-star"></div>
      <div
        class="start-btn"
        @click="$router.push(`/boards/${getFirstBoardId}`)"
      >
        See Demo
      </div>

      <div class="gradient-homepage-bcg"></div>
    </div>

    <div class="main-pic">
      <img
        src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured%20images/Home%20Page%20-%202022%20Rebrand/first_fold/image.png"
      />
    </div>
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
import { utilService } from "../services/util-service.js";

export default {
  name: "home-page",
  computed: {
    getFirstBoardId() {
      return this.$store.getters.boards[0]._id;
    },
  },
  methods: {
    getRandomPosition() {
      return {
        top: 80 + utilService.getRandomInt(50, 1060) + "px",
        left: 70 + utilService.getRandomInt(20, 1805) + "px",
      };
    },
  },
};
// };
</script>
