<template>
    <li v-if="board" class="board-preview" @mouseover="mouseOver" @mouseleave="mouseLeve">
        <div class="bord-title" @click="selectBoard(board._id)">
            <span>{{ board.title }}</span>
            <button @click="openModal = !openModal" v-if="isHover || openModal">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
        </div>
    </li>
    <context-modal v-if="openModal" @remove="remove" />
</template>


<script>
import contextModal from "./context-modal.vue"
export default {
    name: 'board-preview',
    props: {
        board: Object
    },
    emits: [],
    components: {
        contextModal,
    },
    data() {
        return {
            isHover: false,
            openModal: false,
        }
    },
    created() {

    },
    mounted() {
    },
    methods: {
        mouseOver() {
            this.isHover = true
        },
        mouseLeve() {
            this.isHover = false
        },
        remove() {
            // this.$emit('remove', this.board._id)
            this.$store.dispatch({ type: 'removeBoard', boardId: this.board._id})

            // console.log(this.board._id);
        }

    },
    computed: {

    },
    unmounted() {
    },
}
</script>
