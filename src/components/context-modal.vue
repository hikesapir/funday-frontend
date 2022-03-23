<template>
    <section class="context-modal">
        <button @click="openNewTab">Open Board in New Tab</button>
        <button @click="renameBoard">Rename Board</button>
        <button @click="staerred">Add to favorites</button>
        <button>Duplicate Board</button>
        <button @click="remove">Delete</button>
    </section>
</template>


<script>

export default {
    name: 'context-modal',
    props: {
    },
    emits: ['openNewTab', 'remove'],
    components: {},
    data() {
        return {
        }
    },
    created() {

    },
    mounted() {
    },
    methods: {
        remove() {
            this.$emit('remove')
        },
        openNewTab() {
            this.$emit('openNewTab')

        },
        renameBoard() {
            this.$emit('renameBoard')
        },
        starred() {
            console.log('star');
            this.$emit('starred')
        }
    },
    computed: {

    },
    unmounted() {
    },
}
</script>
