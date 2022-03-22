// import authService from '../../services/auth.service.js'
// import userService from '../../services/user.service.js'

export default {
  state: {
    // user: userService.getLoggedInUser(),
    boards: [],
  },
  getters: {
    boards({ boards }) {
      return boards
    },
  },
  mutations: {},
  actions: {},
}
