<template>
  <section>
    <div class="tags-sum-preview">
      <div class="tags-container">
        <span v-for="tag in tagsForDisplay" :key="tag" class="">
          <span class="tags-display" :style="{ color: tag.color }">
            #{{ tag.txt }}
          </span>
        </span>
        <div v-if="!isMoreThanThree" class="small-number">
          +{{ groupData.tags.length - 2 }}
        </div>
      </div>
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
    return {};
  },

  computed: {
    isMoreThanThree() {
      return this.groupData.tags.length < 3;
    },
    tagsForDisplay() {
      if (this.groupData.tags.length >= 3) {
        return this.groupData.tags.slice(0, 2);
      } else return this.groupData.tags;
    },
    groupData() {
      const groupData = this.data.find(
        (groupData) => groupData.id === this.groupId
      );
      return groupData;
    },
  },
};
</script>
