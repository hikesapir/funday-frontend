<template>
  <div v-if="isModalOpen" @click="closeModal" class="modal-background"></div>
  <section class="app-container">
    <router-view></router-view>
    <div v-if="isLoading" class="loadig">
      <img src="./img/loading.svg" alt />
    </div>
  </section>
</template>
<script>
import { faL } from "@fortawesome/free-solid-svg-icons";
import mainNav from "./components/main-nav.vue";
export default {
  components: {
    mainNav,
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("loadApp");

  },
  methods: {
    closeModal() {
      this.$store.commit({ type: "setOpenModal", boolean: false });
    },
  },
  computed: {
    isModalOpen() {
      return this.$store.getters.isModalOpen;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
};
</script>
