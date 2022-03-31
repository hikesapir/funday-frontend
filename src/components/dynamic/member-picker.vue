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
        :data-title="member.fullname"
      />
    </div>
    <div v-else>
      <img :src="firstMemberPic" />
      <div
        class="small-number"
        :data-title="restOfMemberList"
      >
        +{{ membersLength - 1 }}
      </div>
    </div>
    <fa
      v-if="isHover"
      icon="circle-plus"
      class="add-member-btn"
      @click.stop="openModal"
    />

    <div
      v-show="addMembersMode"
      ref="memberPickerModal"
      class="context-modal"
    >
      <div class="small-name-preview">
        <div
          class="member-name"
          v-for="(member, idx) in members"
          :key="member.id"
        >
          <span>{{ member.fullname }}</span>
          <i
            @click="removeFromTask(idx)"
            class="fa-solid fa-circle-xmark"
          ></i>
        </div>
      </div>

      <label>
        <input
          type="text"
          placeholder="Enter name"
          v-model="filterBy"
        />
      </label>

      <div class="relative">
        <div class="test">
          <span class="people">People</span>
        </div>
      </div>

      <span
        class="member-preview flex"
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
      filterBy: '',
      isHover: false,
    }
  },
  computed: {
    membersLength() {
      return this.task.members.length
    },
    firstMemberPic() {
      return this.task.members[0].imgUrl
    },
    restOfMemberList() {
      var list = JSON.parse(
        JSON.stringify(this.task.members)
      )
      list.shift()
      list = list.reduce((acc, member) => {
        acc.push(member.fullname)
        return acc
      }, [])
      return list.join(' ')
    },
    members() {
      return this.task.members
    },
    membersList() {
      var membersList = this.$store.getters.board.members
      const regex = new RegExp(this.filterBy, 'i')
      membersList = membersList.filter((member) =>
        regex.test(member.fullname)
      )
      return membersList
    },
  },
  methods: {
    openModal() {
      this.addMembersMode = true
      document.body.addEventListener(
        'click',
        this.isClosingModal
      )
    },
    closeModal() {
      this.addMembersMode = false
      document.body.removeEventListener(
        'click',
        this.isClosingModal
      )
    },
    isClosingModal(e) {
      e.stopPropagation()
      if (!this.$refs.memberPickerModal.contains(e.target))
        this.closeModal()
    },
    addMember(member) {
      const members = JSON.parse(
        JSON.stringify(this.task.members)
      )
      members.push(JSON.parse(JSON.stringify(member)))
      this.$emit('update', {
        cmpType: `member-picker`,
        members,
        task: this.task,
      })
      this.addMembersMode = !this.addMembersMode
    },
    removeFromTask(idx) {
      var members = JSON.parse(
        JSON.stringify(this.task.members)
      )
      // const idx = members.findIndex(member => member._id === id);
      members.splice(idx, 1)
      this.$emit('update', {
        cmpType: `member-picker`,
        members,
        task: this.task,
      })
    },
  },
}
</script>
