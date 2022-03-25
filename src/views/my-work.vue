<template>
    <section class="my-work">
        <h1>My Work</h1>

        <div class="spacer"></div>

        <div class="search">
            <input id="search" type="text" placeholder="Search" />
            <label for="search">
                <i class="fa-solid fa-magnifying-glass"></i>
            </label>
        </div>

        <div class="content">
            <div class="table-wrapper" v-for="title in titles" :key="title">
                    <div class="haeder-wrapper flex">
                <div class="title-col-my-work">
                    <h2>{{ title }}</h2>
                </div>
                    <div v-for="title in headerTitle" :key="title" :class="title + '-col-my-work'"><span>{{title}}</span></div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
export default {
    name: 'my-work',
    props: [],
    emits: [],
    components: {},
    data() {
        return {
            titles: ['Overdue', 'Today', 'This week', 'Next week', 'Later', 'Without date'],
            headerTitle: ['Board', 'Group', 'People', 'Date','Status']
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
