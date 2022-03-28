<template>
  <div
    class="drop-down"
    ref="dropDown"
    tabindex="-1"
    @blur="$emit('closeModal')"
  >
    <div class="dots active">
      <div class="container cut">
        <div class="drop cut2"></div>
      </div>
      <div class="list">
        <ul>
          <li
            v-for="label in labels"
            :key="label.id"
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
  mounted() {
    this.$refs.dropDown.focus()
  },
  methods: {
    updateTask(val) {
      this.$emit('update', val)
    },
    addLabel() {
      console.log(this.type)
      this.$emit('labelAdded', val)
    },
  },
  computed: {},
}
</script>
