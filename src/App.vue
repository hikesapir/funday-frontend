<template>
  <router-view></router-view>
</template>
<script>
export default {
  components: {},
  created() {
    this.$store.dispatch('loadApp')
  },
}
</script>
