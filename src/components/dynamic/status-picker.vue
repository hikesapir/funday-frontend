<template>
  <div class="status-picker-col" :style="style" @click="toggleDropDown">
    {{ txt }}
    <div v-if="isDropOpen">
      <drop-down :labels="statuses" @update="updateTask" type="status" />
    </div>
  </div>
</template>

<script>
import dropDown from "./drop-down.vue";
export default {
  components: { dropDown },
  name: "status-picker",
  props: {
    task: Object,
  },
  data() {
    return {
      isDropOpen: false,
      statuses: this.$store.getters.board?.labels.status,
    };
  },
  methods: {
    updateTask(val) {
      this.$emit("update", {
        cmpType: `status-picker`,
        val,
        task: this.task,
      });
    },
    toggleDropDown() {
      console.log(this.isDropOpen);
      this.isDropOpen = !this.isDropOpen;
    },
    getStatus() {
      return this.statuses.find((status) => status.id === this.task?.status);
    },
  },
  computed: {
    txt() {
      const status = this.getStatus();
      return status?.txt;
    },
    style() {
      const status = this.getStatus();
      return {
        backgroundColor: status?.color,
        color: "white",
      };
    },
  },
};
</script>
