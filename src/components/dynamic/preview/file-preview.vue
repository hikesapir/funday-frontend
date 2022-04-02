<template>
    <span class="file-preview" @click="isModalOpen = true">
        <img
            @mouseover="isHover = true"
            @mouseleave="isHover = false"
            :src="file"
            alt
            @click="openNewTab(file)"
        />
        <div v-if="isHover" class="context-modal">
            <img
                :src="file"
                alt="http://res.cloudinary.com/mistertoysss/image/upload/v1648842217/noimg_djbu0w.png"
            />
        </div>
    </span>
    <div class="modal-background" v-if="isModalOpen" @click="isModalOpen = false">
        <img
            @click.stop
            :src="file"
            alt="http://res.cloudinary.com/mistertoysss/image/upload/v1648842217/noimg_djbu0w.png"
        />
    </div>
</template>


<script>
import { utilService } from "../../../services/util-service";
export default {
    name: 'file-preview',
    props: { file: String },
    emits: [],
    components: {},
    data() {
        return {
            isHover: false,
            isModalOpen: false

        }
    },
    created() {
        this.hoverTrue = utilService.debounce(this.isHoverTrue, 800);
        this.hoverFalse = utilService.debounce(this.isHoverFalse, 2000);
    },
    mounted() {

    },
    methods: {
        isHoverTrue() {
            this.isHover = true
            // this.hoverFalse();
        },
        isHoverFalse() {
            this.isHover = false
        }
    },
    computed: {
    },
    unmounted() {
    },
}
</script>
