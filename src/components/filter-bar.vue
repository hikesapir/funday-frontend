<template>
  <section class="filter-bar">
    <div class="new-item-btn-container">
      <button class="new-item-btn new-item">
        New Item
      </button>
      <button class="new-item-btn chevron">
        <fa icon="chevron-down" />
      </button>
    </div>
    <div class="search">
      <button
        v-if="!isSearching"
        @click="isSearching = true"
      >
        <fa icon="magnifying-glass" />
        Search
      </button>
      <form v-else @submit.prevent="onSearch">
        <input
          @blur="isSearching = false"
          v-model="filterBy.txt"
          placeholder="Search"
          type="text"
        />
      </form>
    </div>
    <button><fa icon="circle-user" /> Person</button>
    <button><fa icon="filter" /> Filter</button>
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
