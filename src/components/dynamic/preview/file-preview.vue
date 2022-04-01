<template>
    <span class="file-preview">
        <img
            @mouseover="isHover = true"
            @mouseleave="isHover = false"
            :src="file"
            alt
            @click="openNewTab(file)"
        />
        <div v-if="isHover" class="context-modal">
            <img :src="file" alt />
        </div>
    </span>
</template>


<script>
export default {
    name: 'file-preview',
    props: { file: String },
    emits: [],
    components: {},
    data() {
        return {
            isHover: false,

        }
    },
    created() {

    },
    mounted() {
    },
    methods: {},
    computed: {
    },
    unmounted() {
    },
}
</script>
