import {LOAD_DIALOGS, LOAD_MESSAGES} from './types'
import {toggleLoader} from './loaderActions'

export const loadDialog = id => dispatch => {
  fetch(`/api/dialogs/user/${id}`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_DIALOGS, payload: data}))
}

export const createDialog = (user, secondUser) => dispatch => {
  fetch(`/api/dialogs/user/${secondUser}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(() => dispatch(loadDialog(user.id)))
}

export const loadMessages = dialogId => dispatch => {
  dispatch(toggleLoader())
  fetch(`/api/messages/dialog/${dialogId}`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_MESSAGES, payload: data}))
}

export const createMessage = (dialogId, userId, message) => dispatch => {
  dispatch(toggleLoader())
  fetch(`/api/messages/user/${userId}/dialog/${dialogId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: message
  })
    .then(() => dispatch(loadMessages(dialogId)))
}