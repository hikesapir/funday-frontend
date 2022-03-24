<template>
  <div class="member-picker">
    <div class="add-tag"></div>
    <img
      v-for="member in members"
      :src="member.imgUrl"
      :key="member._id"
      :alt="member.fullname"
      :title="member.fullname"
    />
    <fa
      icon="circle-plus"
      @click="addMembers"
      tabindex="0"
      @blur="addMembers"
    />
    <section class="context-modal" v-if="addMembersMode">
      <input type="text" placeholder="Enter name" />
      <label>People</label>
      <span v-for="member in membersList" :key="member">
        <img :src="member.imgUrl" />
        <span @click="addMember(member)">{{ member.fullname }}</span>
      </span>
    </section>
  </div>
</template>

<script>
export default {
  name: "member-picker",
  props: {
    task: Object,
  },
  data() {
    return {
      addMembersMode: false,
      membersList: this.$store.getters.board.members,
    };
  },
  computed: {
    members() {
      return this.task.members.length > 2
        ? this.task.members.slice(0, 2)
        : this.task.members;
    },
    displayMembers() {},
  },
  methods: {
    addMembers() {
      this.addMembersMode = !this.addMembersMode;
    },
    addMember(member) {
      console.log(member);
      this.members.push(JSON.parse(JSON.stringify(member)));
      this.$emit("update", {
        cmpType: `member-picker`,
        members: this.members,
        task: this.task,
      });
    },
  },
};
</script>
