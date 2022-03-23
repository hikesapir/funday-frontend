<template>
  <form @submit.prevent="setTimeline"></form>
</template>

<script>
export default {
  name: 'timeline-picker',
  data() {
    return {
      timeline: {
        start: '',
        end: '',
      },
    }
  },
}
</script>
