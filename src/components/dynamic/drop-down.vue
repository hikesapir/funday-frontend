<template>
  <div class="drop-down">
    <div class="dots active">
      <div class="container cut">
        <div class="drop cut2"></div>
      </div>
      <div class="list">
        <ul>
          <li
            v-for="label in labels"
            :key="label.id"
            tabindex="-1"
            @click.stop="updateTask(label.id)"
            :style="{ 'background-color': label.color }"
          >
            {{ label.txt }}
          </li>
        </ul>
      </div>
    </div>
    <div class="cursor"></div>
  </div>
</template>

<script>
export default {
  name: 'drop-down',
  props: {
    labels: Array,
    type: String,
  },
  methods: {
    updateTask(val) {
      this.$emit('update', val)
    },
  },
  computed: {},
}
</script>
