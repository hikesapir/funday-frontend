<template>
    <header class="board-header">
        <div class="up-haeder">
            <div class="board-name">
                <h1>{{ boardDetails.title }}</h1>
                <div>
                    <button
                        :title="descriptionTitle + ' board description'"
                        @click="isDescriptionOpen = !isDescriptionOpen"
                        class="info"
                    >
                        <span>
                            <i class="fa-solid fa-circle-info"></i>
                        </span>
                    </button>
                    <button :title="starTitle + ' favorites'" @click="staerred" class="star">
                        <span>
                            <i v-if="boardDetails.isStarred" class="fa-solid fa-star"></i>
                            <i v-else class="fa-regular fa-star"></i>
                        </span>
                    </button>
                </div>
            </div>
            <div class="board-header-right">
                <button>
                    <p>Board member</p>
                </button>
                <button>
                    <i class="fa-solid fa-user-plus"></i>Invite/3
                </button>
                <button>
                    <i class="fa-solid fa-chart-line"></i>Activity
                </button>
                <button class="btn">
                    <i class="fa-solid fa-plus"></i>
                    <span>Add to board</span>
                </button>
                <button>
                    <span>
                        <i class="fa-solid fa-ellipsis"></i>
                    </span>
                </button>
            </div>
        </div>
        <div class="description-line">
            <span v-if="isDescriptionOpen" class="text-content">{{ boardDetails.description }}</span>
        </div>
    </header>
</template>


<script>
export default {
    name: 'board-header',
    props: {
        boardDetails: Object
    },
    emits: ['starred'],
    components: {},
    data() {
        return {
            isDescriptionOpen: true,
        }
    },
    created() {

    },
    mounted() {
    },
    methods: {
        staerred() {
            this.$emit('starred', 'star')
        }
    },
    computed: {
        descriptionTitle() {
            return this.isDescriptionOpen ? 'Hide' : 'Show'
        },
        starTitle() {
            return this.boardDetails.isStarred ? 'Remove from' : 'Add to'
        }
    },
    unmounted() {
    },
}
</script>
