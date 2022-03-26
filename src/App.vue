<template>
  <div v-if="isModalOpen" @click="closeModal" class="modal-background">
    <!-- f -->
  </div>
  <section class="app-container">
    <main-nav></main-nav>
    <router-view></router-view>
  </section>
</template>
<script>
import { faL } from '@fortawesome/free-solid-svg-icons'
import mainNav from './components/main-nav.vue'
export default {
  components: {
    mainNav,
  },
  data() {
    return {
    }
  },
  created() {
    this.$store.dispatch('loadApp')
  },
  methods: {
    closeModal() {
      this.$store.commit({ type: 'setOpenModal', boolean: false })
    }
  },
  computed: {
    isModalOpen() {
      return this.$store.getters.isModalOpen
    }
  }
}
</script>
