<template>
  <section
    class="sum-preview"
    :style="{ transform: leftSpacer }"
  >
    <component
      v-for="cmp in cmpsOrder"
      :class="cmp + '-sum'"
      :is="cmp"
      :key="cmp"
      :data="boardData"
      :groupId="groupId"
    ></component>
  </section>
</template>

<script>
import fileSum from './dynamic/sum-cmps/file-sum.vue'
import memberSum from './dynamic/sum-cmps/member-sum.vue'
import prioritySum from './dynamic/sum-cmps/priority-sum.vue'
import statusSum from './dynamic/sum-cmps/status-sum.vue'
import tagSum from './dynamic/sum-cmps/tag-sum.vue'
import timelineSum from './dynamic/sum-cmps/timeline-sum.vue'
import numberSum from './dynamic/sum-cmps/number-sum.vue'

export default {
  name: 'sum-preview',
  props: {
    groupId: String,
  },
  data() {
    return {}
  },
  components: {
    fileSum,
    memberSum,
    prioritySum,
    statusSum,
    tagSum,
    timelineSum,
    numberSum,
  },
  methods: {},
  computed: {
    leftSpacer() {
      const isBoardNavOpen = this.$store.getters.boardNav
      if (window.innerWidth > 1450 && !isBoardNavOpen) {
        var width = window.innerWidth - 1260
        return `translate(${width}px)`
      } else return `translate(435px)`
    },

    cmpsOrder() {
      const cmps = JSON.parse(
        JSON.stringify(this.$store.getters.board?.cmpsOrder)
      )
      cmps.shift()
      return cmps.map((cmp) =>
        cmp.cmpName.replace('picker', 'sum')
      )
    },
    boardData() {
      const { boardMapByGroups } =
        this.$store.getters.boardData
      return boardMapByGroups
    },
  },
}
</script>
