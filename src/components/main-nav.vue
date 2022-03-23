<template>
  <section class="main-nav">
    <nav class="upper-nav">
      <div class="logo" @click="$router.push('/')">
        <img src="../assets/logo.png" alt />
      </div>
      <span title="Workspace">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8>
          <path
            fill="currentColor"
            d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"
          />
        </svg>
      </span>
      <span title="Notifications">
        <fa icon="bell" />
      </span>
      <span title="Inbox">
        <fa icon="inbox" />
      </span>
      <span title="My Work">
        <fa icon="calendar-check" />
      </span>
    </nav>
    <nav class="lower-nav">
      <span title="Apps">
        <fa icon="puzzle-piece" />
      </span>
      <span title="Invite Members">
        <fa icon="user-plus" />
      </span>
      <span title="Search Everthing">
        <fa icon="magnifying-glass" />
      </span>
      <span title="Help">
        <fa icon="question" />
      </span>
      <span >
        <fa icon="user" />
      </span>

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
