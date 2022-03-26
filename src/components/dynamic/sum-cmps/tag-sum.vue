<template>
  <section>
    <div class="tags-sum-preview">
      <span v-for="tag in groupData.tags" :key="tag" class="">
        <div class="tags-display" :style="{ color: tag.color }">
          {{ tag.txt }}
        </div>
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: "tag-sum",
  props: {
    data: Array,
    groupId: String,
  },
  data() {
    return {
      groupData: null,
    };
  },
  created() {
    const groupData = this.data.filter(
      (groupData) => groupData._id === this.groupId
    );
    this.groupData = groupData[0];
  },
  computed: {},
};
</script>
