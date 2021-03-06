import { authService } from '../../services/auth-service.js'
import userService from '../../services/user-service.js'
import router from '../../router'

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
    setUser(state, { user }) {
      state.user = user
    },
    userLoggedOut(state) {
      state.user = null
    },
    setUsers(state, { users }) {
      state.users = users
    },
  },
  actions: {
    async autoLogin({ commit }) {
      try {
        const user = await userService.getLoggedinUser()
        commit({ type: 'setUser', user })

      } catch (err) {
        console.log('autoLogin', err);
      }
    },
    async login({ commit, getters }, { user }) {
      try {
        const res = await authService.login(user);
        commit({ type: 'setUser', user: res })
        console.log("Success!");
        const boardId = getters.boards[0]._id
        router.push(`/boards/${boardId}`)

      } catch (err) {
        console.log(err);
      }
    },
    async logout({ commit }, { user }) {
      try {
        const res = await authService.logout();
        commit({ type: 'setUser', user: res })
        console.log("Success to logout!");
      } catch (err) {
        console.log(err);
      }
    },
    async signup({ dispatch }, { newuser }) {
      try {
        // console.log(newuser);
        const newUser = await authService.signup(newuser);
        console.log(newUser, 'signedup user')
        dispatch({ type: 'login', user: newUser })
        console.log("Success to signup!!!");
        router.push(`/boards/:id`)

      } catch (err) {
        console.log(err);
      }
    },
    async loadUsers({ commit, state }) {
      try {
        const users = await userService.query()
        commit({ type: 'setUsers', users })
      } catch (err) {
        console.log('loadUsers err', err);
      }
    },
  },
}
