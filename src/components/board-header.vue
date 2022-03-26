<template>
  <header class="board-header">
    <div class="up-header">
      <div class="board-name">
        <div class="editable-header">
          <h1
            v-if="!renameBoard"
            @click="renameBoard = true"
          >
            {{ boardDetails.title }}
          </h1>
          <h1
            v-show="renameBoard"
            contenteditable="true"
            ref="boardTitle"
            @blur="onUpdate"
            @keyup.enter="onUpdate"
          >
            {{ boardDetails.title }}
          </h1>
        </div>
        <div>
          <button
            :title="descriptionTitle + ' board description'"
            @click="isDescriptionOpen = !isDescriptionOpen"
            class="info"
          >
            <span>
              <i class="fa-solid fa-circle-info"></i>
            </span>
          </button>
          <button
            :title="starTitle + ' favorites'"
            @click="starred"
            class="star"
          >
            <span>
              <i
                v-if="boardDetails.isStarred"
                class="fa-solid fa-star"
              ></i>
              <i v-else class="fa-regular fa-star"></i>
            </span>
          </button>
        </div>
      </div>
      <div class="board-header-right">
        <button>
          <p>Board member</p>
        </button>
        <button>
          <i class="fa-solid fa-user-plus"></i>Invite/3
        </button>
        <button>
          <i class="fa-solid fa-chart-line"></i>Activity
        </button>
        <button class="btn">
          <i class="fa-solid fa-plus"></i>
          <span>Add to board</span>
        </button>
        <button>
          <span>
            <i class="fa-solid fa-ellipsis"></i>
          </span>
        </button>
      </div>
    </div>
    <div class="description-line">
      <span
        v-if="isDescriptionOpen && !isEditDesc"
        @click="isEditDesc = true"
        class="text-content"
        >{{ boardDetails.description }}</span
      >
      <span
        v-show="isEditDesc && isDescriptionOpen"
        contenteditable="true"
        ref="boardDescription"
        @blur="onUpdate"
        @keyup.enter="onUpdate"
        >{{ boardDetails.description }}</span
      >
    </div>
  </header>
</template>

<script>
export default {
  name: 'board-header',
  props: {
    boardDetails: Object,
  },
  emits: ['updateBoard'],
  components: {},
  data() {
    return {
      isDescriptionOpen: true,
      renameBoard: false,
      isEditDesc: false,
    }
  },
  created() {},
  mounted() {},
  methods: {
    starred() {
      this.$emit('updateBoard', 'star')
    },
    renameTitle() {
      this.renameBoard = !this.renameBoard
      this.isEditDesc = false
    },
    renameDesc() {
      this.isEditDesc = !this.isEditDesc
      this.renameBoard = false
    },
    onUpdate() {
      const boardDetails = JSON.parse(
        JSON.stringify(this.boardDetails)
      )
      boardDetails.title = this.$refs.boardTitle.innerText
      boardDetails.description =
        this.$refs.boardDescription.innerText
      this.renameBoard = false
      this.isEditDesc = false

      this.$emit('updateBoard', boardDetails)
    },
  },
  computed: {
    descriptionTitle() {
      return this.isDescriptionOpen ? 'Hide' : 'Show'
    },
    starTitle() {
      return this.boardDetails.isStarred
        ? 'Remove from'
        : 'Add to'
    },
  },
  unmounted() {},
}
</script>
