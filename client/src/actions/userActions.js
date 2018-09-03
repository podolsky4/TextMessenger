import {CREATE_USER_IN_REDUX, FIND_USERS, LOAD_FOLLOWING, LOAD_NOTIFICATION} from './types.js'
import {loadFavoritesByLogin} from './postsActions'
import {startLoader, stopLoader, toggleLoader} from './loaderActions'
import FetchData from './serviceAction'

export const createUser = (data) => dispatch => {
  fetch('/api/users/user',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    )
    .then(() => dispatch(loadUser(data.login)))
    .then(() => console.log("user loaded after create :", data))
    .then(() => dispatch(loadFavoritesByLogin(data.login)))
}
export const updateUser = (data, login) => dispatch => {
  FetchData.put('/api/users/', data)
    .then(() => dispatch(loadUser(login)))
}


export const loadUser = (login) => dispatch => {
  FetchData.get(`/api/users/bylogin/${login}`)
    .then(res => res.json())
    .then(data => dispatch({type: CREATE_USER_IN_REDUX, payload: data}))
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

export const getCurrentUser = () => dispatch => {
  dispatch(startLoader('LOADING_USER'))
  fetch('api/users/current', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        dispatch({type: LOAD_USER, payload: {}})
      }
    })
    .then(data => dispatch({type: CREATE_USER_IN_REDUX, payload: data}))
    .catch(error => console.log(error))
    .then(() => dispatch(stopLoader('LOADING_USER')))
}

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
  localStorage.removeItem('accessToken')
    .then(() => dispatch(getCurrentUser()))
}

export const loadUserNotification = (id) => dispatch => {
  FetchData.get(`/api/users/user/${id}/notification`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_NOTIFICATION, payload: data}))
}