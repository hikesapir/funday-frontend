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
    <fa icon="circle-plus" @click.stop="addMembers" />

    <div
      v-if="addMembersMode"
      class="context-modal member-picker-modal-item"
    >
      <label class="member-picker-modal-item">
        <input
          class="member-picker-modal-item"
          type="text"
          placeholder="Enter name"
        />
      </label>
      <div class="member-picker-modal-item">People</div>
      <span
        class="member-picker-modal-item"
        v-for="member in membersList"
        :key="member"
      >
        <img :src="member.imgUrl" />
        <span @click.stop="addMember(member)">{{
          member.fullname
        }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'member-picker',
  props: {
    task: Object,
  },
  data() {
    return {
      addMembersMode: false,
      membersList: this.$store.getters.board.members,
    }
  },
  computed: {
    members() {
      return this.task.members.length > 2
        ? this.task.members.slice(0, 2)
        : this.task.members
    },
    displayMembers() {},
  },
  methods: {
    addMembers() {
      this.addMembersMode = !this.addMembersMode
      document.body.addEventListener('click', (e) => {
        e.stopPropagation()
        if (
          !e.target.classList.contains(
            'member-picker-modal-item'
          )
        )
          this.addMembersMode = false
      })
    },
    addMember(member) {
      this.members.push(JSON.parse(JSON.stringify(member)))
      this.$emit('update', {
        cmpType: `member-picker`,
        members: this.members,
        task: this.task,
      })
    },
  },
}
</script>
