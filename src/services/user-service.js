export default {
  getLoggedinUser,
}

const USER_KEY = 'loggedInUser'

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
