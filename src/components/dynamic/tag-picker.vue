<template>
  <div class="tag-picker">
    <div class="add-tag"><fa icon="circle-plus" /></div>
    <div
      v-for="tag in task.tags"
      :key="tag"
      class="tag-picker-val"
      :style="{ color: tag.color }"
    >
      #{{ tag.txt }}
    </div>
  </div>
</template>

<script>
export default {
  name: "tag-picker",
  props: {
    task: Object,
  },
  data() {
    return {
      tags: this.$store.getters.board,
    };
  },
  computed: {
    style() {
      console.log(this.tags);
      // console.log(this.statuses);
      // return this.statuses.find((status) => status.id === this.task.status);
    },
  },
};
</script>
