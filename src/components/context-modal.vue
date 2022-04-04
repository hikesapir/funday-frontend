<template>
  <section
    class="context-modal"
    ref="dropDown"
    tabindex="-1"
    @blur="$emit('closeModal')"
  >
    <button @click="openNewTab">
      Open Board in New Tab
    </button>
    <button @click="renameBoard">Rename Board</button>
    <button @click="starred">
      {{ starTitle }} favorites
    </button>
    <button @click="duplicate">Duplicate Board</button>
    <button @click="remove">Delete</button>
  </section>
</template>

<script>
export default {
  name: 'context-modal',
  props: {
    isStarred: Boolean,
  },
  emits: [
    'openNewTab',
    'remove',
    'starred',
    'renameBoard',
    'duplicate',
  ],

  mounted() {
    this.$refs.dropDown.focus()
  },
  methods: {
    remove() {
      this.$emit('remove')
    },
    openNewTab() {
      this.$emit('openNewTab')
    },
    renameBoard() {
      this.$emit('renameBoard')
    },
    starred() {
      this.$emit('starred')
    },
    duplicate() {
      this.$emit('duplicate')
    },
  },
  computed: {
    starTitle() {
      return this.isStarred ? 'Remove from' : 'Add to'
    },
  },
  unmounted() {},
}
</script>
