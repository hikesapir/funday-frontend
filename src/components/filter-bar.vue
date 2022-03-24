<template>
  <section class="filter-bar">
    <div class="new-item-btn-container">
      <button class="new-item-btn new-item">New Item</button>
      <button class="new-item-btn chevron">
        <i class="fa-solid fa-chevron-down"></i>
      </button>
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
    <button @click="openPersonModal = !openPersonModal">
      <i class="fa-solid fa-circle-user"></i>Person
    </button>
    <div class="relative">
      <section v-if="openPersonModal" class="context-modal"  tabindex="0" @blur="openPersonModal = false">
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
      <!-- <pre>{{filterBy}}</pre> -->
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
    }
  },
  components: {},
  methods: {
    search() {
      const filterBy = JSON.parse(JSON.stringify(this.filterBy))
      this.$store.commit({ type: 'onSetFilter', filterBy })
    },
  },
  computed: {
    isSearching() {
      return this.filterBy.txt ? true : false
    }
  },
}
</script>
