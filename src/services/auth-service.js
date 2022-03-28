import { utilService } from './util-service.js'
import { httpService } from './http.service'


export const authService = {
  login,
  logout,
  signup,
  getLoggedinUser
}

const BASE_URL = 'auth'

async function login(user) {
  console.log(user)
  const loggedInUser = await httpService.post(`${BASE_URL}/login`, user)
  console.log(loggedInUser)
  utilService.saveToSessionStorage('loggedinUser', loggedInUser
  )
  return loggedInUser
}

async function logout() {
  console.log('logging out')
  await httpService.post(`${BASE_URL}/logout`)
  console.log('logged out')
  utilService.saveToSessionStorage('loggedinUser', '')
  return null
}

async function signup(newuser) {
  console.log(newuser)
  const newUser = await httpService.post(`${BASE_URL}/signup`, newuser)
  console.log('signed up')
  return newUser
}

function getLoggedinUser() {
  return utilService.loadFromSessionStorage('loggedinUser')
}
