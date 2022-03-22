// import authService from '../../services/auth.service.js'
// import userService from '../../services/user.service.js'

export default {
  state: {
    // user: userService.getLoggedInUser(),
    user: null,
    users: null,
  },
  getters: {
    user({ user }) {
      return user
    },
    users({ users }) {
      return users
    },
  },
  mutations: {
    userLoggedIn(state, { user }) {
      state.user = user
    },
    userLoggedOut(state) {
      state.user = null
    },
    setUsers(state, { users }) {
      state.users = users
    },
  },
  actions: {},
}
