<template>
  <section class="members-sum">
    <div v-if="groupMembersLength < 3">
      <div
        v-for="member in groupMembers"
        :key="member._id"
        class="sum-members-display"
      >
        <img :src="member.imgUrl" :alt="member.fullname" />
      </div>
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
