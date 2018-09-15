import {
  CREATE_USER_IN_REDUX,
  FORGOT_PASSWORD_MESSAGE,
  FIND_USERS,
  LOAD_FOLLOWING,
  LOAD_NOTIFICATION,
  CREATE_USER_FORM_MESSAGE
} from './types.js'
import {startLoader, stopLoader, toggleLoader} from './loaderActions'
import FetchData from './serviceAction'

// main action with user
export const createUser = (data) => dispatch => {
  fetch('/api/users/user',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  ).then(res => res.json())
    .then(data => dispatch({type: CREATE_USER_FORM_MESSAGE, payload: data}))
}

export const forgotPassword = (email) => dispatch => {
  fetch('/api/users/forgotpassword', {
    method: 'POST',
    body: email
  })
    .then(res => res.json())
    .then(data => dispatch({type: FORGOT_PASSWORD_MESSAGE, payload: data}))
}
export const getCurrentUser = () => dispatch => {
  dispatch(startLoader('LOADING_USER'))
  fetch('/api/users/current', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => dispatch({type: CREATE_USER_IN_REDUX, payload: data}))
    .then(() => dispatch(stopLoader('LOADING_USER')))
}
export const loadUser = (login) => dispatch => {
  FetchData.get(`/api/users/bylogin/${login}`)
    .then(res => res.json())
    .then(data => dispatch({type: CREATE_USER_IN_REDUX, payload: data}))
}

// logIn & logOut action
export const loginIn = (email, password) => dispatch => {
  dispatch(startLoader('LOADING_USER'))
  fetch(`/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      loginOrEmail: email,
      password: password
    })
  })
    .then(res => res.json())
    .then(res => res.accessToken ? localStorage.setItem('accessToken', res.accessToken) : null)
    .then(() => dispatch(getCurrentUser()))
    .then(() => dispatch(stopLoader('LOADING_USER')))
}
export const logOut = () => dispatch => {
  window.location.assign('/')
  localStorage.removeItem('accessToken')
    .then(() => dispatch(getCurrentUser()))
}

// sub action for user
export const updateUser = (data, login) => dispatch => {
  fetch(`/api/users/`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    },
    body: data
  })
    .then(() => dispatch(loadUser(login)))
}
export const getFollowing = (id) => dispatch => {
  FetchData.get(`/api/users/user/${id}/getFollowing`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_FOLLOWING, payload: data}))
}
export const addFollowing = (userId, newUser) => dispatch => {
  FetchData.get(`/api/users/user/${userId}/addToFollowing/${newUser}`)
    .then(() => dispatch(getFollowing(userId)))
}
export const deleteFollowing = (userId, newUser) => dispatch => {
  FetchData.deleteApi(`/api/users/user/${userId}/addToFollowing/${newUser}`)
    .then(() => dispatch(getFollowing(userId)))
}
export const findUsers = (str) => dispatch => {
  dispatch(toggleLoader())
  FetchData.post(`/api/users/find`, {search: str})
    .then(res => res.json())
    .then(data => dispatch({type: FIND_USERS, payload: data}))
}
export const loadUserNotification = () => dispatch => {
  FetchData.get(`/api/users/notification`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_NOTIFICATION, payload: data}))
}