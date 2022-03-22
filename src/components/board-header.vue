<template>
    <header class="board-header">
        <div class="up-haeder">
            <div>
                <h1>board name</h1>
                <p>
                    <fa icon="circle-info" />
                </p>
                <p>
                    <fa icon="star" />
                </p>
            </div>
            <div>
                <p>board member</p>
                <p>
                    <fa icon="user-plus" />invite/3
                </p>
                <p> <fa icon="chart-line" /> activity</p>
                <button>
                    <fa icon="plus" />Add to board
                </button>
            </div>
        </div>
        <div>
            <p>Description</p>
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
