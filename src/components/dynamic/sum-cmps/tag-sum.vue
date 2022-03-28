<template>
  <section>
    <div class="tags-sum-preview">
      <span
        v-for="tag in groupData.tags"
        :key="tag"
        class=""
      >
        <span
          class="tags-display"
          :style="{ color: tag.color }"
        >
          {{ tag.txt }}
        </span>
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'tag-sum',
  props: {
    data: Array,
    groupId: String,
  },
  data() {
    return {
      // groupData: null,
    }
  },

  computed: {
    groupData() {
      const groupData = this.data.find(
        (groupData) => groupData.id === this.groupId
      )
      return groupData
    },
  },
}
</script>
