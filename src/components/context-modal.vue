<template>
    <section class="context-modal">
        <button @click="openNewTab">Open Board in New Tab</button>
        <button @click="renameBoard">Rename Board</button>
        <button @click="starred">Add to favorites</button>
        <button @click="duplicate">Duplicate Board</button>
        <button @click="remove">Delete</button>
    </section>
</template>


<script>

export default {
    name: 'context-modal',
    props: {
    },
    emits: ['openNewTab', 'remove', 'starred', 'renameBoard', 'duplicate'],
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
            this.$emit('starred')
        },
        duplicate() {
            this.$emit('duplicate')

        }
    },
    computed: {

    },
    unmounted() {
    },
}
</script>
