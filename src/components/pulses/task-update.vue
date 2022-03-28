<template>
    <section class="task-update">
        <div class="input-warpper">
            <input type="text" placeholder="Write an uptade..." />
        </div>
        <section class="update-container">
            <update-preview v-for="update in taskUpdate" :key="update.id" :update="update" />
        </section>
    </section>
</template>


<script>
import updatePreview from "./update-preview.vue"
export default {
    name: 'task-update',
    props: {
        taskUpdate: Array
    },
    emits: [],
    components: {
        updatePreview,
    },
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
