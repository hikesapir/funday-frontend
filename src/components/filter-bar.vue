<template>
  <section class="filter-bar">
    <div class="new-item-btn-container">
      <button class="new-item-btn new-item">New Item</button>
    <button class="new-item-btn chevron"><fa icon="chevron-down"/></button>
    </div>
    <button><fa icon="magnifying-glass" /> Search</button>
    <button><fa icon="circle-user" /> Person</button>
    <button><fa icon="filter" /> Filter</button>
    <button>Sort</button>
  </section>
</template>

<script>
export default {
  name: "filterBar",

  components: {},
};
</script>
