<template>
  <section class="filter-bar">
    <div class="new-item-btn-container">
      <button class="new-item-btn new-item">New Item</button>
      <button class="new-item-btn chevron">
        <i class="fa-solid fa-chevron-down"></i>
      </button>
    </div>
    <div class="search">
      <button v-if="!isSearching" @click="isSearching = true">
        <i class="fa-solid fa-magnifying-glass"></i>Search
      </button>
      <form v-else @submit.prevent="onSearch">
        <input @blur="isSearching = false" v-model="filterBy.txt" placeholder="Search" type="text" />
      </form>
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
      isSearching: false,
    }
  },
  components: {},
  methods: {
    onSearch() {
      this.isSearching = false
      if (!this.filterBy.txt) return
      const filterBy = JSON.parse(
        JSON.stringify(this.filterBy)
      )
      this.$store.dispatch({
        type: 'onSetFilter',
        filterBy,
      })
    },
  },
}
</script>
