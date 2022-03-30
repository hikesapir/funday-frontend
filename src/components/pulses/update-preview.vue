<template>
  <div class="update-preview">
    <div class="post-header">
      <span class="member-img">
        <img :src="update.byMember.imgUrl" />
      </span>
      <div class="title">{{ update.byMember.fullname }}</div>
      <div class="action">
        <div class="time">
          <i class="fa-regular fa-clock"></i>
          {{ time }}
        </div>
        <div class="icons">
          <i class="fa-regular fa-bell"></i>
          <i class="fa-solid fa-caret-down"></i>
        </div>
      </div>
    </div>
    <div class="content">
      <p>{{ update.txt }}</p>
    </div>
    <div class="actions">
      <div class="like">
        <button>
          <i class="fa-regular fa-thumbs-up"></i>
          <span>Like</span>
        </button>
      </div>
      <div class="reply">
        <button>
          <i class="fa-solid fa-reply"></i>
          <span>Reply</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "update-preview",
  props: { update: Object },
  emits: [],
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {
    time() {
      const timeNow = Date.now();
      const millSec = timeNow - this.update.createdAt;
      const min = Math.floor(millSec / 60000);
      const hours = Math.floor(min / 60);
      const days = Math.floor(hours / 24);
      const date = new Date(this.update.createdAt);
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const year = date.getFullYear();
      const dateToDisplay = `${day}.${month}.${year}`;
      if (min < 60) return min + "m";
      else if (hours < 24) return hours + "h";
      else if (days < 30) return days + "d";
      else return "At " + dateToDisplay;
    },
  },
  unmounted() {},
};
</script>
