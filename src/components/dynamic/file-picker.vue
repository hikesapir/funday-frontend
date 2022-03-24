<template>
  <div @mouseover="mouseOver" @mouseleave="mouseLeave" class="filer-picker">
    <label class="btn" v-if="isHover">
      <fa icon="circle-plus" />
      <input type="file" @change="test" hidden/>
    </label>
  </div>
</template>

<script>
export default {
  name: 'file-picker',
  data() {
    return {
      isHover: false,
      val: null
    }
  },

  methods: {
    mouseOver() {
      this.isHover = true
    },
    mouseLeave() {
      this.isHover = false
    },
    test(e){
      console.log('im defined');
      console.log(e);
    }
  }

}
</script>
