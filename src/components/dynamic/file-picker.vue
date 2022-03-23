<template>
  <div @mouseover="mouseOver" @mouseleave="mouseLeve" class="filer-picker">
    <button v-if="isHover">
      <fa icon="circle-plus" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'file-picker',
  data() {
    return {
      isHover: false,
    }
  },

  methods: {
    mouseOver() {
      this.isHover = true
    },
    mouseLeve() {
      this.isHover = false
    },
  }

}
</script>
