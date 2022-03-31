<template>
  <section class="tag-picker-col">
    <div @click.stop="openModal" class="add-tag">
      <fa icon="circle-plus" />
    </div>
    <div
      v-for="tag in tagsForDisplay"
      :key="tag.txt"
      class="tag-picker-val"
      :style="{ color: tag.color }"
    >
      <span class="tag-text"> #{{ tag.txt }}</span>
    </div>

    <div v-if="!isMoreThanThree" class="small-number">
      +{{ task.tags.length - 2 }}
    </div>
    <div
      v-show="isModalOpen"
      ref="tagModal"
      class="tag-modal"
    >
      <div class="add-tags">
        <input
          type="text"
          placeholder="Add tags"
          @input="filterTags"
          v-model="newTag"
        />
      </div>
      <ul class="tag-search-list">
        <li
          v-for="tag in tags"
          :key="tag.txt"
          @click="addTag(tag.txt)"
          class="tag-search-item"
          @mouseover="toggleHoverTag(tag.txt)"
          @mouseleave="toggleHoverTag()"
          :style="{
            color:
              isHoverATag === tag.txt ? 'white' : tag.color,
          }"
        >
          #{{ tag.txt }}
        </li>
      </ul>
      <button @click="addNewTag" class="btn">
        + Create new tag
      </button>
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
      isModalOpen: false,
      isHoverATag: false,
      filterBy: {
        txt: '',
      },
      newTag: '',
    }
  },
  computed: {
    isMoreThanThree() {
      return this.task.tags.length < 3
    },
    tagsForDisplay() {
      if (this.task.tags.length >= 3) {
        return this.task.tags.slice(0, 2)
      } else return this.task.tags
    },
    boardTags() {
      let groups = JSON.parse(
        JSON.stringify(
          this.$store.getters.boardData.boardMapByGroups
        )
      )
      const boardTags = groups.reduce((acc, group) => {
        group.tags.forEach((tag) => {
          if (!acc.some((tag) => tag.txt === tag))
            acc.push(tag)
        })
        return acc
      }, [])
      return boardTags
    },
    tags() {
      var boardTags = this.boardTags
      if (!this.filterBy.txt)
        return boardTags.length > 5
          ? boardTags.slice(0, 5)
          : boardTags
      else {
        const regex = new RegExp(this.filterBy.txt, 'i')
        boardTags = boardTags.filter((tag) =>
          regex.test(tag.txt)
        )
      }
      return boardTags.length > 5
        ? boardTags.slice(0, 5)
        : boardTags
    },
  },
  methods: {
    addNewTag() {
      if (!this.newTag) return
      this.$emit('update', {
        cmpType: `tag-picker`,
        val: this.newTag,
        task: this.task,
      })
      this.isModalOpen = false
    },
    filterTags() {
      this.filterBy.txt = this.newTag
    },
    addTag(tag) {
      this.$emit('update', {
        cmpType: `tag-picker`,
        val: tag,
        task: this.task,
      })
      this.isModalOpen = false
    },
    toggleHoverTag(tag = null) {
      this.isHoverATag = tag
    },
    openModal() {
      this.isModalOpen = true
      document.body.addEventListener(
        'click',
        this.isClosingModal
      )
    },
    closeModal() {
      this.isModalOpen = false
      document.body.removeEventListener(
        'click',
        this.isClosingModal
      )
    },
    isClosingModal(e) {
      e.stopPropagation()
      if (!this.$refs.tagModal?.contains(e.target))
        this.closeModal()
    },
  },
}
</script>
