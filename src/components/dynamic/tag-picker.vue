<template>
  <section class="tag-picker">
    <div @click="toggleModal" class="add-tag">
      <fa icon="circle-plus" />
    </div>
    <div
      v-for="tag in task.tags"
      :key="tag"
      class="tag-picker-val"
      :style="{ color: tag.color }"
    >
      #{{ tag.txt }}
    </div>
    <div v-if="isModalOpen" class="tag-modal">
      <div class="add-tags">
        <input
          type="text"
          placeholder="Add tags"
          v-model="newTag"
        />
      </div>
      <ul class="tag-search-list">
        <li
          v-for="tag in groupTags"
          :key="tag.txt"
          class="tag-search-item"
          @mouseover="toggleHoverTag(tag.txt)"
          @mouseleave="toggleHoverTag()"
          :style="{
            color:
              isHoverATag === tag.txt ? 'white' : tag.color,
          }"
        >
          {{ tag.txt }}
        </li>
      </ul>
      <button class="btn">+ Create new tag</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'tag-picker',
  props: {
    task: Object,
    groupId: String,
  },
  data() {
    return {
      tags: this.$store.getters.board,
      isModalOpen: false,
      isHoverATag: false,
      newTag: '',
    }
  },
  computed: {
    groupTags() {
      let groups = JSON.parse(
        JSON.stringify(
          this.$store.getters.boardData.boardMapByGroups
        )
      )
      const groupTags = groups.reduce((acc, group) => {
        if (group.id === this.groupId) {
          acc.push(...group.tags)
        }
        return acc
      }, [])
      return groupTags
    },
  },
  methods: {
    toggleHoverTag(tag = null) {
      this.isHoverATag = tag
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen
    },
  },
}
</script>
