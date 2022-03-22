<template>
    <header class="board-header">
        <div class="up-haeder">
            <div class="board-name">
                <h1>board name</h1>
                <p>
                    <fa icon="circle-info" />
                </p>
                <p>
                    <fa icon="fa-regular fa-user-secret" />
                </p>
            </div>
            <div class="board-header-right">
                <p>board member</p>
                <p>
                    <fa icon="user-plus" />invite/3
                </p>
                <p>
                    <fa icon="chart-line" />activity
                </p>
                <button>
                    <fa icon="plus" />Add to board
                </button>
                <span>
                    <fa icon="ellipsis" />
                </span>
            </div>
        </div>
        <div class="description-line">
            <span class="text-content">Description</span>
        </div>
    </header>
</template>


<script>
export default {
    name: 'board-header',
    props: [],
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
