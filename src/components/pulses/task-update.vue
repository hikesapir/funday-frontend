<template>
  <section class="task-update">
    <div class="input-warpper">
      <div
        class="input"
        contenteditable="true"
        data-ph="Write an update..."
        ref="contect"
      ></div>
      <div class="btn-container">
        <button @click="postUpdate">Update</button>
      </div>
    </div>
    <section class="update-container">
      <update-preview
        v-for="update in taskUpdate"
        :key="update.id"
        :update="update"
      />
    </section>
  </section>
</template>

<script>
import userService from "../../services/user-service.js";
import updatePreview from "./update-preview.vue";
export default {
  name: "task-update",
  props: {
    taskUpdate: Array,
  },
  emits: ["updateTask"],
  components: {
    updatePreview,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    postUpdate() {
      if (!this.$refs.contect.innerText) return;
      let update = {
        from: userService.getLoggedinUser(),
        txt: this.$refs.contect.innerText,
      };
      this.$emit("updateTask", update);
      this.$refs.contect.innerText = "";
    },
  },
  computed: {},
  unmounted() {},
};
</script>

<style>
[contentEditable="true"]:empty:not(:focus):before {
  content: attr(data-ph);
}
</style>
