<template>
  <section class="sum-preview">
    <component
      v-for="cmp in cmpsOrder"
      :class="cmp + '-sum'"
      :is="cmp"
      :key="cmp"
      :data="boardData"
      :groupId="groupId"
    ></component>
  </section>
</template>

<script>
import fileSum from "./dynamic/sum-cmps/file-sum.vue";
import membersSum from "./dynamic/sum-cmps/member-sum.vue";
import prioritySum from "./dynamic/sum-cmps/priority-sum.vue";
import statusSum from "./dynamic/sum-cmps/status-sum.vue";
import tagsSum from "./dynamic/sum-cmps/tags-sum.vue";
import timelineSum from "./dynamic/sum-cmps/timeline-sum.vue";

export default {
  name: "sum-preview",
  props: {
    groupId: String,
  },
  data() {
    return {};
  },
  components: {
    fileSum,
    membersSum,
    prioritySum,
    statusSum,
    tagsSum,
    timelineSum,
  },
  methods: {},
  computed: {
    cmpsOrder() {
      return [
        "file-sum",
        "members-sum",
        "priority-sum",
        "status-sum",
        "tags-sum",
        "timeline-sum",
      ];
    },
    boardData() {
      const { boardMapByGroups } = this.$store.getters.boardData;
      return boardMapByGroups;
    },
  },
};
</script>
