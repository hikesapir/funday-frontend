<template>
  <section>
    <div class="members-sum"></div>

    <p v-for="member in groupMembers" :key="member._id">
      <img :src="member.imgUrl" />
    </p>
  </section>
</template>

<script>
export default {
  name: 'members-sum',
  props: {
    data: Array,
    groupId: String,
  },
  data() {
    return {
      groupData: null,
    }
  },
  created() {
    const groupData = this.data.filter(
      (groupData) => groupData.id === this.groupId
    )
    this.groupData = groupData[0]
  },
  computed: {
    groupMembers() {
      return this.groupData.member
    },
  },
  methods: {},
}
</script>
