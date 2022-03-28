import { httpService } from './http.service'

export default {
  getLoggedinUser,
}
const USER_KEY = 'loggedInUser'
const USER_URL = 'user/'


// const KEY = 'users_db'
// _createUsers()

export const userService = {
  query,
  getById,
  remove,
  save
}

async function query(filterBy) {
  try {
    const res = await httpService.get(USER_URL, { params: filterBy })
    return res
  } catch (err) {
    console.log('query err', err);
    throw err
  }
  // return axios.get(USER_URL, { params: filterBy }).then((res) => res.data);
}

async function getById(userId) {
  try {
    const res = await httpService.get(USER_URL + userId)
    return res
  } catch (err) {
    console.log('getById err', err);
    throw err
  }
}

async function save(user) {
  try {
    if (user._id) {
      const res = await httpService.put(USER_URL + user._id, user)
      return res
    } else {
      const res = await httpService.post(USER_URL, user)
      return res
    }
  } catch (err) {
    console.log('save err', err);
    throw err
  }
}

async function remove(userId) {
  try {
    const res = await httpService.delete(USER_URL + userId)
    return res.data
  } catch (err) {
    console.log('remove err', err);
    throw err
  }
}


function getLoggedinUser() {
  return (
    JSON.parse(sessionStorage.getItem(USER_KEY)) || {
      fullname: 'Guest',
      _id: 'u101',
      imgUrl:
        'https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
    }
  )
}
