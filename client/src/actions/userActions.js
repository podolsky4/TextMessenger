import {CREATE_USER, FIND_USERS} from './types.js'
import {loadFavoritesByLogin} from './postsActions'
import {toggleLoader} from './loaderActions'

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
  fetch('http://localhost:9000/api/users/',
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
  fetch(`/api/users/bylogin/${login}`)
    .then(res => res.json())
    .then(data => dispatch({type: CREATE_USER, payload: data}))
}

export const getUser = () => dispatch => {
  fetch(`/api/users/1`)
    .then(res => res.json())
    .then(data => dispatch({type: CREATE_USER, payload: data}))
}

export const findUsers = (str) => dispatch => {
    dispatch(toggleLoader())
    fetch(`/api/users/find`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: str
    })
        .then(res => res.json())
        .then(data => dispatch({type: FIND_USERS, payload: data}))
}


