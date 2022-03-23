<template>
  <div class="member-picker">
    <div class="add-tag"><fa icon="circle-plus" @click="addMember" /></div>
    <img
      v-for="member in members"
      :src="member.imgUrl"
      :key="member._id"
      :alt="member.fullname"
      :title="member.fullname"
    />
  </div>
</template>

<script>
export default {
  name: "member-picker",
  props: {
    task: Object,
  },
  computed: {
    members() {
      return this.task.members.length > 2
        ? this.task.members.slice(0, 2)
        : this.task.members;
    },
  },
};
</script>
