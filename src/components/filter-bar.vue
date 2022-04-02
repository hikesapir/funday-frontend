<template>
  <section class="filter-bar">
    <div class="new-item-btn-container">
      <button
        class="new-item-btn new-item"
        @click="addNewItem"
      >
        New Task
      </button>
      <div class="relative">
        <button
          class="new-item-btn chevron"
          @click="openItemModal = !openItemModal"
        >
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <section
          v-if="openItemModal"
          class="context-modal item-modal"
        >
          <button @click="addGroup">
            New group of Tasks
          </button>
        </section>
      </div>
    </div>
    <div class="search">
      <button
        v-if="!openSearching"
        @click="openSearching = true"
      >
        <div class="space-btn">
          <span>
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <span>Search</span>
        </div>
      </button>
      <div v-else>
        <input
          class="search-input"
          @input="search"
          @blur="openSearching = false"
          v-model="filterBy.txt"
          placeholder="Search"
          type="text"
        />
      </div>
    </div>
    <div class="relative">
      <button
        v-if="filterBy.member"
        class="search-btn"
        @click="clearSearchMember"
      >
        <img :src="currMember.imgUrl" /> Persons
        <i class="fa-solid fa-circle-xmark"></i>
      </button>
      <button
        v-else
        @click="openPersonModal = !openPersonModal"
      >
        <div class="space-btn">
          <span>
            <i class="fa-solid fa-circle-user"></i>
          </span>
          <span>Person</span>
        </div>
      </button>

      <section
        v-if="openPersonModal"
        class="context-modal"
        tabindex="0"
        @blur="openPersonModal = false"
      >
        <h2>Quick person filter</h2>
        <div class="spacer"></div>
        <div class="flex members">
          <label
            v-for="member in board?.members"
            :key="member"
          >
            <input
              @change="search"
              type="radio"
              :value="member._id"
              v-model="filterBy.member"
              hidden
            />
            <img
              :src="member.imgUrl"
              :class="{
                active: filterBy.member === member._id,
              }"
            />
          </label>
        </div>
      </section>
    </div>

    <div class="relative">
      <button @click="openFilterModal = !openFilterModal">
        <div class="space-btn">
          <span>
            <i class="fa-solid fa-filter"></i>
          </span>
          <span>Filter</span>
        </div>
      </button>
      <section
        v-if="openFilterModal"
        class="context-modal filterBy"
        tabindex="0"
        @blur="openFilterModal = false"
      >
        <h2>Filter</h2>
        <div class="spacer"></div>
        <div class="flex">
          <div>
            <div class="title ellipsis">{{ status }}</div>
            <div
              v-for="s in board.labels.status"
              :key="s.id"
            >
              <label
                class="select-container"
                :class="{
                  active: filterBy.status.some(
                    (sta) => s.id === sta
                  ),
                }"
              >
                <input
                  @change="search"
                  type="checkbox"
                  :value="s.id"
                  v-model="filterBy.status"
                  hidden
                />
                <div class="select-content">
                  <div
                    class="small-circle"
                    :style="'background-color:' + s.color"
                  ></div>
                  <div>{{ s.txt || 'Empty' }}</div>
                </div>
                <div
                  v-if="
                    filterBy.status.some(
                      (sta) => s.id === sta
                    )
                  "
                >
                  <i class="fa-solid fa-circle-xmark"></i>
                </div>
              </label>
            </div>
          </div>
          <div>
            <div class="title ellipsis">{{ priority }}</div>
            <div
              v-for="p in board.labels.priority"
              :key="p.id"
            >
              <label
                class="select-container"
                :class="{
                  active: filterBy.priority.some(
                    (pri) => p.id === pri
                  ),
                }"
              >
                <div class="select-content">
                  <input
                    @change="search"
                    type="checkbox"
                    :value="p.id"
                    v-model="filterBy.priority"
                    hidden
                  />
                  <div
                    class="small-circle"
                    :style="'background-color:' + p.color"
                  ></div>
                  <div>{{ p.txt || 'Empty' }}</div>
                </div>
                <div
                  v-if="
                    filterBy.priority.some(
                      (pri) => p.id === pri
                    )
                  "
                >
                  <i class="fa-solid fa-circle-xmark"></i>
                </div>
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'filterBar',
  props: {
    board: Object,
  },
  data() {
    return {
      filterBy: {
        txt: '',
        member: '',
        priority: [],
        status: [],
      },
      openSearching: false,
      openPersonModal: false,
      openItemModal: false,
      openFilterModal: false,
    }
  },
  components: {},
  methods: {
    search() {
      const filterBy = JSON.parse(
        JSON.stringify(this.filterBy)
      )
      this.$store.commit({ type: 'setFilter', filterBy })
    },
    clearSearchMember() {
      this.filterBy.member = ''
      this.search()
    },
    addGroup() {
      this.$store.dispatch({ type: 'saveGroup' })
      this.openItemModal = false
    },
    addNewItem() {
      this.$store.dispatch('addTaskToTheStart')
    },
  },
  computed: {
    isSearching() {
      return this.filterBy.txt ? true : false
    },
    currMember() {
      if (this.filterBy.member) {
        return this.board.members.find(
          (member) => member._id === this.filterBy.member
        )
      }
    },
    status() {
      const status = this.board.cmpsOrder.find(
        (cmp) => cmp.cmpName === 'status-picker'
      )
      return status.preName
    },
    priority() {
      const priority = this.board.cmpsOrder.find(
        (cmp) => cmp.cmpName === 'priority-picker'
      )
      return priority.preName
    },
  },
}
</script>
