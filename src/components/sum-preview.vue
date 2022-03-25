<template>
  <section class="sum-preview">
    <pre> {{ boardMapByGroup }}</pre>
  </section>
</template>

<script>
export default {
  name: "sum-preview",
  props: {
    groupId: String,
  },
  data() {
    return {};
  },
  computed: {
    boardMapByGroup() {
      return this.$store.getters.boardData.boardMapByGroups;
    },
  },

  methods: {},
};
</script>
