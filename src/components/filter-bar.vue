<template>
  <section class="filter-bar">
    <div class="new-item-btn-container">
      <button class="new-item-btn new-item" @click="addNewItem">New Item</button>
      <div class="relative">
        <button class="new-item-btn chevron" @click="openItemModal = !openItemModal">
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <section v-if="openItemModal" class="context-modal item-modal">
          <button @click="addGroup">New group of Items</button>
        </section>
      </div>
    </div>
    <div class="search">
      <button v-if="!openSearching" @click="openSearching = true">
        <i class="fa-solid fa-magnifying-glass"></i>Search
      </button>
      <div v-else>
        <input
          @input="search"
          @blur="openSearching = false"
          v-model="filterBy.txt"
          placeholder="Search"
          type="text"
        />
      </div>
    </div>
    <div class="relative">
      <button v-if="filterBy.member" class="search-btn" @click="clearSearchMember">
        <img :src="currMember.imgUrl" /> Persons
        <i class="fa-solid fa-circle-xmark"></i>
      </button>
      <button v-else @click="openPersonModal = !openPersonModal">
        <i class="fa-solid fa-circle-user"></i>Person
      </button>

      <section
        v-if="openPersonModal"
        class="context-modal"
        tabindex="0"
        @blur="openPersonModal = false"
      >
        <h2>Quick person filter</h2>
        <div class="spacer"></div>
        <div class="flex members">
          <label v-for="member in board?.members" :key="member">
            <input
              @change="search"
              type="radio"
              :value="member._id"
              v-model="filterBy.member"
              hidden
            />
            <img :src="member.imgUrl" :class="{ active: filterBy.member === member._id }" />
          </label>
        </div>
      </section>
    </div>

    <button>
      <i class="fa-solid fa-filter"></i>Filter
    </button>
    <button>Sort</button>
  </section>
</template>

<script>
export default {
  name: 'filterBar',
  props: {
    board: Object
  },
  data() {
    return {
      filterBy: {
        txt: '',
        member: ''
      },
      openSearching: false,
      openPersonModal: false,
      openItemModal: false,
    }
  },
  components: {},
  methods: {
    search() {
      const filterBy = JSON.parse(JSON.stringify(this.filterBy))
      this.$store.commit({ type: 'onSetFilter', filterBy })
    },
    clearSearchMember() {
      this.filterBy.member = ''
      this.search()
    },
    addGroup() {
      this.$store.dispatch({ type: 'saveGroup' })
      this.openItemModal = false
    },
    addNewItem() {
      this.$store.dispatch('addItem')
    }
  },
  computed: {
    isSearching() {
      return this.filterBy.txt ? true : false
    },
    currMember() {
      if (this.filterBy.member) {
        return this.board.members.find(member => member._id === this.filterBy.member)
      }
    }
  },
}
</script>
