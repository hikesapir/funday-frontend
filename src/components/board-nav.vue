<template>
  <!-- <i
    class="collapse-icon fa fa-angle-right"
    :class="isNavOpen ? 'pinned' : ''"
    @click="toggleNav"
  ></i>-->
  <div v-if="isModalOpen" class="cearte-board-modal context-modal">
    <button class="close" @click="colseModal">X</button>
    <h1 class="title">Create board</h1>
    <label class="input-wrapper">
      <span class="lable">Board name</span>
      <input type="text" v-model="boardTitle" autofocus />
    </label>
    <div class="btn-container">
      <button @click="colseModal">Cancel</button>
      <button class="save" @click="saveBoard">Create Board</button>
    </div>
  </div>

  <section v-if="isNavOpen" class="board-nav">
    <span>Workspace</span>
    <div class="workspace-dropdwon">
      <h2>Main workspace</h2>
      <i class="fa-solid fa-chevron-down"></i>
    </div>
    <ul>
      <li>
        <button @click="cearteBoard">
          <i class="fa-solid fa-plus"></i>Add
        </button>
      </li>
      <li>
        <button>
          <i class="fa-solid fa-filter"></i>Filters
        </button>
      </li>
      <li>
        <button>
          <i class="fa-solid fa-magnifying-glass"></i>Search
        </button>
      </li>
    </ul>
    <div class="spacer"></div>
    <div class="curr-workspace"></div>
    <ul>
      <board-preview v-for="board in boards" :key="board._id" :board="board" />
    </ul>
  </section>
</template>

<script>
import boardPreview from './board-preview.vue'
export default {
  name: 'board-nav',
  props: {
    boards: Object,
  },
  emits: [],
  data() {
    return {
      isNavOpen: true,
      boardTitle: 'New Board',
    }
  },
  components: {
    boardPreview,
  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen
    },
    cearteBoard() {
      this.$store.commit({ type: 'setOpenModal', boolean: true })
    },
    colseModal() {
      this.$store.commit({ type: 'setOpenModal', boolean: false })
    },
    saveBoard() {
      console.log(this.boardTitle);
      this.$store.commit({ type: 'setOpenModal', boolean: false })
      this.boardTitle = 'New Board'
    }
  },
  computed: {
    isModalOpen() {
      return this.$store.getters.isModalOpen
    }
  }
}
</script>
