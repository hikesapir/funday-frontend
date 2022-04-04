<template>
  <section
    class="context-modal"
    ref="dropDown"
    tabindex="-1"
    @blur="$emit('closeModal')"
  >
    <a @click="openNewTab"> Open Board in New Tab </a>
    <a @click="renameBoard">Rename Board</a>
    <a @click="starred"> {{ starTitle }} favorites </a>
    <a @click="duplicate">Duplicate Board</a>
    <a @click="remove">Delete</a>
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
