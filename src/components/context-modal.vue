<template>
   <section class="context-modal">
       <button>Open Board in New Tab</button>
       <button>Rename Board</button>
       <button>Add to favorites</button>
       <button>Duplicate Board</button>
       <button @click="remove">Delete</button>
   </section>
</template>


<script>

export default {
    name: 'context-modal',
    props: {
    },
    emits: [,'remove'],
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
        remove(){
            this.$emit('remove')
        }
    },
    computed: {

    },
    unmounted() {
    },
}
</script>
