<template>
    <header class="board-header">
        <div class="up-haeder">
            <div class="board-name">
                <h1>{{boardDetails.title}}</h1>
                <button class="info">
                    <span>
                        <fa icon="circle-info" />
                    </span>
                </button>
                <button class="star">
                    <span>
                        <fa icon="star" />
                    </span>
                </button>
            </div>
            <div class="board-header-right">
                <button>
                    <p>Board member</p>
                </button>
                <button>
                    <fa icon="user-plus" />Invite/3
                </button>
                <button>
                    <fa icon="chart-line" />Activity
                </button>
                <button class="btn">
                    <fa icon="plus" />
                    <span> Add to board</span>
                </button>
                <button>
                    <span>
                        <fa icon="ellipsis" />
                    </span>
                </button>
            </div>
        </div>
        <div class="description-line">
            <span class="text-content">{{boardDetails.description}}</span>
        </div>
    </header>
</template>


<script>
export default {
    name: 'board-header',
    props: {
        boardDetails: Object
    },
    emits: [],
    components: {},
    data() {
        return {}
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
