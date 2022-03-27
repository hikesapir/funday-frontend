<template>
    <section class="task-details">
        <!-- {{ task }} -->
        <header>
            <button @click="this.$router.push(`/boards/${boardId}`)">X</button>
            <div class="title-wrapper">
                <div class="title">
                    <h2>{{ task.title }}</h2>
                </div>
                <span class="members">
                    <span class="member-preview" v-for="member in task.members" :key="member._id">
                        <img :src="member.imgUrl" />
                    </span>
                </span>
                <span>
                    <button>
                        <i class="fa-solid fa-ellipsis"></i>
                    </button>
                </span>
            </div>
        </header>
        <nav>
            <div class="btn-wrapper">
                <div class="main-btns">
                    <button>Updates</button>
                    <button>Files</button>
                    <button>Activity Log</button>
                </div>
                <button>+ Add View</button>
            </div>
            <div class="spacer"></div>
        </nav>
        <section>
            <!-- {{task.updates}} -->
            <task-update :taskUpdate="task.updates" />
        </section>
    </section>
</template>


<script>
import boardService from '../services/board-service.js'
import taskUpdate from '../components/pulses/task-update.vue'

export default {
    name: 'task-details',
    props: [],
    emits: [],
    components: {
        taskUpdate,
    },
    data() {
        return {
            task: null,
        }
    },
    async created() {
        console.log('cearte', this.$route.params);
        const { id, groupId, taskId } = this.$route.params
        this.task = await boardService.getTaskById(id, groupId, taskId)
    },
    mounted() {
    },
    methods: {},
    computed: {
        boardId() {
            return this.$route.params.id
        }
    },
    unmounted() {
    },
}
</script>
