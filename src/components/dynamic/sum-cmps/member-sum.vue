<template>
  <section>
    <div class="member-sum">member-sum:</div>

    <p v-for="member in groupMembers" :key="member._id">
      <img :src="member.imgUrl" />
    </p>
  </section>
</template>

<script>
export default {
  name: "member-sum",
  props: {
    data: Array,
    groupId: String,
  },
  data() {
    return {
      groupData: null,
    };
  },
  created() {
    const groupData = this.data.filter(
      (groupData) => groupData._id === this.groupId
    );
    this.groupData = groupData[0];
  },
  computed: {
    groupMembers() {
      console.log(this.groupData?.member);

      return this.groupData.member;
    },
  },
  methods: {
    // currGroupData() {
    // },
  },
};
</script>
