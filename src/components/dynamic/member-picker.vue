<template>
  <div
    class="member-picker"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <div v-if="membersLength < 3">
      <img
        v-for="member in members"
        :src="member.imgUrl"
        :key="member._id"
        :alt="member.fullname"
        :title="member.fullname"
      />
    </div>
    <div v-else>
      <img :src="firstMemberPic" />
      <div class="small-number">+{{ membersLength - 1 }}</div>
    </div>
    <fa
      v-if="isHover"
      icon="circle-plus"
      class="add-member-btn"
      @click.stop="addMembers"
    />

    <div v-if="addMembersMode" class="context-modal member-picker-modal-item">
      <label class="member-picker-modal-item">
        <input
          class="member-picker-modal-item"
          type="text"
          placeholder="Enter name"
          v-model="filterBy"
        />
      </label>

      <div class="test">
        <span class="people">People</span>
      </div>

      <span
        class="member-preview flex"
        v-for="member in membersList"
        :key="member"
      >
        <img :src="member.imgUrl" />
        <span @click.stop="addMember(member)">{{ member.fullname }}</span>
      </span>
    </div>
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
      filterBy: "",
      isHover: false,
    };
  },
  computed: {
    membersLength() {
      return this.task.members.length;
    },
    firstMemberPic() {
      return this.task.members[0].imgUrl;
    },
    members() {
      return this.task.members;
    },
    membersList() {
      var membersList = this.$store.getters.board.members;
      const regex = new RegExp(this.filterBy, "i");
      membersList = membersList.filter((member) => regex.test(member.fullname));
      return membersList;
    },
  },
  methods: {
    addMembers() {
      this.addMembersMode = !this.addMembersMode;
      document.body.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!e.target.classList.contains("member-picker-modal-item"))
          this.addMembersMode = false;
      });
    },
    addMember(member) {
      const members = JSON.parse(JSON.stringify(this.task.members));
      members.push(JSON.parse(JSON.stringify(member)));
      this.$emit("update", {
        cmpType: `member-picker`,
        members,
        task: this.task,
      });
      this.addMembersMode = !this.addMembersMode;
    },
  },
};
</script>
