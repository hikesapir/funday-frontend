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
      <input type="text" v-model="newBoard.title" autofocus />
    </label>
    <div class="btn-container">
      <button @click="colseModal">Cancel</button>
      <button class="save" @click="saveBoard">Create Board</button>
    </div>
  </div>

  <section v-if="isNavOpen" class="board-nav">
    <span class="title">Workspace</span>
    <div class="workspace-dropdwon">
      <div class="workspace-title">
        <div class="connected-user">M</div>
        <div class="main-workspace-title">Main workspace</div>
      </div>
      <i class="fa-solid fa-chevron-down"></i>
    </div>
    <ul>
      <li>
        <button @click="cearteBoard" class="main-nav-btn">
          <i class="fa-solid fa-plus"></i>Add
        </button>
      </li>
      <li>
        <button class="main-nav-btn">
          <i class="fa-solid fa-filter"></i>Filters
        </button>
      </li>
      <li>
        <button class="main-nav-btn">
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
import boardService from "../services/board-service.js";
import boardPreview from "./board-preview.vue";
export default {
  name: "board-nav",
  props: {
    boards: Object,
  },
  emits: [],
  data() {
    return {
      isNavOpen: true,
      newBoard: null,
    };
  },
  components: {
    boardPreview,
  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
    cearteBoard() {
      this.newBoard = boardService.getEmptyBoard();
      this.$store.commit({ type: "setOpenModal", boolean: true });
    },
    colseModal() {
      this.$store.commit({ type: "setOpenModal", boolean: false });
    },
    saveBoard() {
      this.$store.dispatch({ type: "saveBoard", board: this.newBoard });
      this.$store.commit({ type: "setOpenModal", boolean: false });
      this.boardTitle = "New Board";
    },
  },
  computed: {
    isModalOpen() {
      return this.$store.getters.isModalOpen;
    },
  },
};
</script>
