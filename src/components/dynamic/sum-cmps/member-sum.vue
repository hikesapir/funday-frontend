<template>
  <section class="members-sum">
    <div v-if="groupMembersLength < 3">
      <p v-for="member in groupMembers" :key="member._id">
        <img :src="member.imgUrl" :alt="member.fullname" />
      </p>
    </div>
    <div v-else>
      <img :src="firstMemberPic" />
      <div class="small-number sum">+{{ groupMembersLength - 1 }}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: "members-sum",
  props: {
    data: Array,
    groupId: String,
  },
  data() {
    return {
      groupData: null,
    };
  },
  created() {},
  computed: {
    groupMembers() {
      const groupData = this.data.find(
        (groupData) => groupData.id === this.groupId
      );
      return groupData.member;
    },
    groupMembersLength() {
      return this.groupMembers.length;
    },
    firstMemberPic() {
      return this.groupMembers[0].imgUrl;
    },
  },
  methods: {},
};
</script>
