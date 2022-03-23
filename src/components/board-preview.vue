<template>
    <li class="board-preview" @mouseover="mouseOver"  @mouseleave="mouseLeve" >
        <div class="bord-title" @click="selectBoard(board._id)">
            <span>{{ board.title }}</span>
            <button v-if="isHover">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
        </div>
    </li>
</template>


<script>
export default {
    name: 'board-preview',
    props: {
        board: Object
    },
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
    methods: {
        mouseOver() {
            this.isHover = true
        },
        mouseLeve() {
            this.isHover = false
        },

    },
    computed: {

    },
    unmounted() {
    },
}
</script>
