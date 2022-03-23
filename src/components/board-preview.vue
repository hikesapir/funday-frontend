<template>
    <li v-if="board" class="board-preview" @mouseover="mouseOver" @mouseleave="mouseLeve">
        <form v-if="chengeName">
            <input @keyup.enter="updateBoard" @blur="updateBoard" type="text" v-model="board.title" />
        </form>
        <div v-else class="bord-title">
            <span>{{ board.title }}</span>
            <button @click="openModal = !openModal" v-if="isHover || openModal">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
        </div>
    </li>
    <context-modal
        v-if="openModal"
        @remove="remove"
        @openNewTab="openNewTab"
        @renameBoard="renameBoard"
    />
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
            chengeName: false
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
            this.$store.dispatch({ type: 'removeBoard', boardId: this.board._id })
            this.openModal = false
        },
        openNewTab() {
            window.open(window.location.origin + `/#/boards/${this.board._id}`);
            this.openModal = false

        },
        renameBoard() {
            this.chengeName = true
            this.openModal = false
        },
        updateBoard() {
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.chengeName = false
        },
        starred() {
            this.board.isStarred = !this.board.isStarred
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
        }


    },
    computed: {

    },
    unmounted() {
    },
}
</script>
