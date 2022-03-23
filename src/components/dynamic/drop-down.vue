<template>
  <div class="drop-down">
    <!-- <div class="dots"> -->
    <div class="dots active">
      <!-- <div class="dot"></div> -->
      <!-- <div class="dot"></div> -->
      <!-- <div class="shadow cut"></div> -->
      <div class="container cut">
        <div class="drop cut2"></div>
      </div>
      <div class="list">
        <ul>
          <li>Mark as read</li>
          <li>Flag as important</li>
          <li>Save for later</li>
          <li>Move to trash</li>
          <li>Mark as spam</li>
        </ul>
      </div>
      <!-- <div class="dot"></div> -->
    </div>
    <div
      class="cursor"
      onclick="document.querySelector('.dots').classList.toggle('active');"
    ></div>
  </div>
</template>

<script>
export default {
  name: "drop-down",
  props: {
    labels: Object,
  },
  data() {
    return {
      statuses: this.$store.getters.board?.labels.status,
    };
  },
  methods: {
    // getStatus() {
    //   return this.statuses.find((status) => status.id === this.task?.status);
    // },
  },
  computed: {
    // txt() {
    //   const status = this.getStatus();
    //   return status.txt;
    // },
    // style() {
    //   const status = this.getStatus();
    //   return {
    //     backgroundColor: status?.color,
    //     color: "white",
    //   };
    // },
  },
};
</script>
