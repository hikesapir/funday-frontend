<template>
  <section class="task-update">
    <div class="activity-filter">
      <div class="btn-container">
        <button>Filter</button>
      </div>
    </div>
    <ul class="update-container">
      <li v-for="activity in activities" :key="activity.id">
        <span class="activity-created">
          {{ activity.createdAt }}</span
        >
        <span class="activity-title">
          {{ activity.description.title }}
        </span>
        <span class="activity-action">
          {{ activity.description.action }}
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'task-activity',
  props: {
    activities: Object,
  },
}
</script>
