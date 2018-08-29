import {CLEAN_USERSEARCH, LOAD_DIALOGS, LOAD_MESSAGES} from './types'
import {toggleLoader} from './loaderActions'

export const loadDialog = id => dispatch => {
  fetch(`/api/dialogs/user/${id}`,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_DIALOGS, payload: data}))
}

export const createDialog = (user, secondUser) => dispatch => {
  fetch(`/api/dialogs/user/${secondUser}`,
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(() => dispatch(loadDialog(user.id)))
}

export const loadMessages = dialogId => dispatch => {
  dispatch(toggleLoader())
  fetch(`/api/messages/dialog/${dialogId}`,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_MESSAGES, payload: data}))
}

export const createMessage = (dialogId, userId, message) => dispatch => {
  dispatch(toggleLoader())
  fetch(`/api/messages/user/${userId}/dialog/${dialogId}`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: message
  })
    .then(() => dispatch(loadMessages(dialogId)))
}

export const addUserToExistDialog = (dialogId, userId, newUser) => dispatch => {
  fetch(`/api/dialogs/user/${newUser}/dialog/${dialogId}`,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(() => dispatch(loadDialog(userId)))
}

export const cleanUserSearch = () => dispatch => {
  dispatch({type: CLEAN_USERSEARCH, payload: []})
}