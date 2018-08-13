import {LOAD_DIALOGS, LOAD_MESSAGES} from './types'
import {toggleLoader} from './loaderActions'

export const loadDialog = id => dispatch => {
  fetch(`/api/dialogs/user/${id}`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_DIALOGS, payload: data}))
}

export const createDialog = (id, dialog) => dispatch => {
  fetch(`/api/dialogs/user/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'dialog': dialog})
    })
    .then(() => dispatch(loadDialog(id)))
}

export const loadMessages = dialogId => dispatch => {
  dispatch(toggleLoader())
  fetch(`/api/messages/dialog/${dialogId}`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_MESSAGES, payload: data}))
}

export const createMessage = (dialogId, message) => dispatch => {
  fetch(`/api/messages/dialog/${dialogId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'message': message})
  })
    .then(() => dispatch(loadMessages(dialogId)))
}