import { utilService } from './util-service.js'
// import { httpService } from './http.service'

import axios from 'axios'
// const instance = axios.create({
//     withCredentials: true
//   })
axios.defaults.withCredentials = true


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
  utilService.saveToStorage('loggedinUser', loggedInUser
  )
  return loggedInUser
}

async function logout() {
  console.log('logging out')
  await httpService.post(`${BASE_URL}/logout`)
  console.log('logged out')
  utilService.saveToStorage('loggedinUser', '')
  return null
}

async function signup(newuser) {
  console.log(newuser)
  const newUser = await httpService.post(`${BASE_URL}/signup`, newuser)
  console.log('signed up')
  return newUser
}

function getLoggedinUser() {
  return utilService.loadFromStorage('loggedinUser')
}
