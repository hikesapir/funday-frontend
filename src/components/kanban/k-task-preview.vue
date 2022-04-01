<template>
  <div class="task-container">
    <div class="task-body">
      <p>
        {{ task.txt }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'task',
  props: {
    task: Object,
  },
}
</script>
