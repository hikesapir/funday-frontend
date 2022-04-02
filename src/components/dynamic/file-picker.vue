<template>
  <div class="filer-picker" @mouseover="mouseOver" @mouseleave="mouseLeave">
    <span class="btn" v-if="isHover" :class="haveSome">
      <fa icon="circle-plus" @click.stop="openModal" />
    </span>
    <div v-show="isModalOpen" ref="contextModal" class="context-modal">
      <div class="show-files" v-for="(file, idx) in files" :key="file">
        <span>
          <img :src="file" />
        </span>
        <i @click="removeFormTask(idx)" class="fa-solid fa-circle-xmark"></i>
      </div>
      <div class="spacer"></div>
      <label class="upload-select">
        Upload File
        <input type="file" @change="handleFile" hidden />
      </label>
    </div>
    <file-preview v-for="file in task.files" :key="file" :file="file" />
  </div>
</template>

<script>
import { uploadFile } from '../../services/files-upload-service.js';
import filePreview from '../dynamic/preview/file-preview.vue';

export default {
  name: 'file-picker',
  props: {
    task: Object,
    groupId: String,
  },
  components: {
    filePreview,
  },
  data() {
    return {
      isModalOpen: false,
      isHover: false,
      val: null,

    }
  },
  
  methods: {
    openModal() {
      this.isModalOpen = true;
      document.body.addEventListener("click", this.isClosingModal);
    },
    closeModal() {
      this.isModalOpen = false;
      document.body.removeEventListener("click", this.isClosingModal);
    },
    isClosingModal(e) {
      e.stopPropagation();
      if (!this.$refs.contextModal.contains(e.target)) this.closeModal();
    },
    openNewTab(file) {
      window.open(
        file
      )
      this.openModal = false
    },
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
      this.onUploadFile(file); // send the file to upload it
    },
    async onUploadFile(file) {
      const res = await uploadFile(file);
      const files = JSON.parse(JSON.stringify(this.task.files))
      files.push(res)
      this.$emit("update", {
        cmpType: `file-picker`,
        files,
        task: this.task,
      });
      // this.$emit('save', res.url);
      // this.isLoading = false;
    },
    removeFormTask(idx) {
      const files = JSON.parse(JSON.stringify(this.task.files))
      files.splice(idx, 1)
      this.$emit("update", {
        cmpType: `file-picker`,
        files,
        task: this.task,
      });
    }

  },
  computed: {
    files() {
      return this.task.files;
    },
    haveSome() {
      return (this.task.files.length) ? 'haveSome' : '';
    },
  }

}
</script>
