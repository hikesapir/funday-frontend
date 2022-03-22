<template>
  <section class="main-nav">
    <nav class="upper-nav">
      <div class="logo">LOGO</div>
      <router-link to="/">Workspaces</router-link>
      <router-link to="/">Notification</router-link>
      <router-link to="/">Inbox</router-link>
      <router-link to="/">My work</router-link>
    </nav>
    <nav class="lower-nav">
      <router-link to="/">Apps</router-link>
      <router-link to="/">Invite Members</router-link>
      <router-link to="/">Search everthing</router-link>
      <router-link to="/">Help</router-link>
      <div class="avatar"><img src="" /></div>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'main-nav',
  props: {
    boards: Object,
  },
}
</script>
