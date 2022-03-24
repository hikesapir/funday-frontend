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
          @input="onSearch"
          @blur="openSearching = false"
          v-model="filterBy.txt"
          placeholder="Search"
          type="text"
        />
      </div>
    </div>
    <button>
      <i class="fa-solid fa-circle-user"></i>Person
    </button>
    <button>
      <i class="fa-solid fa-filter"></i>Filter
    </button>
    <button>Sort</button>
  </section>
</template>

<script>
export default {
  name: 'filterBar',
  data() {
    return {
      filterBy: {
        txt: '',
      },
      openSearching: false,
    }
  },
  components: {},
  methods: {
    onSearch() {
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
