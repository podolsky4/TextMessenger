import {CREATE_USER, FIND_USERS, LOAD_FOLLOWING, LOAD_NOTIFICATION} from './types.js'
import {loadFavoritesByLogin} from './postsActions'
import {endLoader, startLoader, toggleLoader} from './loaderActions'

export const createUser = (data) => dispatch => {
  let login = data.login
  console.log(login)
  fetch('/api/users/user',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => dispatch(loadUser(login)))
    .then(() => dispatch(loadFavoritesByLogin(login)))
}
export const updateUser = (data, login) => dispatch => {
  fetch('/api/users/',
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => dispatch(loadUser(login)))
}

export const loadUser = (login) => dispatch => {
  fetch(`/api/users/bylogin/${login}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      'Accept': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => dispatch({type: CREATE_USER, payload: data}))
}

export const getUser = () => dispatch => {
  fetch(`/api/users/1`)
    .then(res => res.json())
    .then(data => dispatch({type: CREATE_USER, payload: data}))
}
export const getFollowing = (id) => dispatch => {
  fetch(`/api/users/user/${id}/getFollowing`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      'Accept': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_FOLLOWING, payload: data}))
}
export const addFollowing = (userId, newUser) => dispatch => {
  fetch(`/api/users/user/${userId}/addToFollowing/${newUser}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      'Accept': 'application/json'
    }
  })
    .then(() => dispatch(getFollowing(userId)))
}
export const deleteFollowing = (userId, newUser) => dispatch => {
  fetch(`/api/users/user/${userId}/addToFollowing/${newUser}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      'Accept': 'application/json'
    }
  })
    .then(() => dispatch(getFollowing(userId)))
}
export const findUsers = (str) => dispatch => {
  dispatch(toggleLoader())
  fetch(`/api/users/find`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: str
  })
    .then(res => res.json())
    .then(data => dispatch({type: FIND_USERS, payload: data}))
}

export const getCurrentUser = () => dispatch => {
  dispatch(startLoader('LOADING_POST'))
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
        throw new Error('user is not available')
      }
    })
    .then(data => dispatch({type: CREATE_USER, payload: data}))
    .catch(error => console.log(error))
    .then(() => dispatch(endLoader()))
}
export const loginIn = (email, password) => dispatch => {
  dispatch(startLoader('LOADING_POST'))
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
  // .then(function (response) {
  //   console.log(response)
  //   if (response.status === 205) {
  //     alert('wrong password')
  //   } else if (response.status === 204) {
  //     alert('this email is not registraite')
  //   } else {
  //     console.log('accept')
  //     return response.json()
  //   }
  // }).then(data => dispatch({type: CREATE_USER, payload: data}))
    .then(res => res.json())
    .then(res => res.status === 500 ? null : localStorage.setItem('accessToken', res.accessToken))
    .then(() => dispatch(getCurrentUser()))
    .then(() => dispatch(endLoader()))
}

export const logOut = () => dispatch => {
  fetch('api/users/current', {
    method: 'DELETE'
  })
}

export const loadUserNotification = (id) => dispatch => {
  fetch(`/api/users/user/${id}/notification`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_NOTIFICATION, payload: data}))
}