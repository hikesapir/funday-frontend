<template>
  <div @mouseover="mouseOver" @mouseleave="mouseLeave" class="filer-picker">
    <label class="btn" v-if="isHover">
      <fa icon="circle-plus" />
      <input type="file" @change="handleFile" hidden />
    </label>
    <span v-for="file in task.files" :key="file" class="file-preview">
      <img :src="file" alt />
    </span>
  </div>
</template>

<script>
import { uploadFile } from '../../services/files-upload-service.js';

export default {
  name: 'file-picker',
  props: {
    task: Object,
    groupId: String,
  },
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
    handleFile(ev) {
      //added to determine if its change from input or drop , and gets the file
      let file;
      if (ev.type === 'change') file = ev.target.files[0];
      else if (ev.type === 'drop') file = ev.dataTransfer.files[0];
      console.log('ev', ev);
      this.onUploadFile(file); // send the file to upload it
    },
    async onUploadFile(file) {
      console.log(file);
      const res = await uploadFile(file);
      const files = JSON.parse(JSON.stringify(this.task.files))
      files.push(res.url)
      // console.log(this.task);
      this.$emit("update", {
        cmpType: `file-picker`,
        files,
        task: this.task,
      });
      // this.$emit('save', res.url);
      // this.isLoading = false;
    },
  }

}
</script>
