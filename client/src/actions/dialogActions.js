import {LOAD_DIALOGS, LOAD_MESSAGES} from './types'

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

export const loadMessages = dialog_id => dispatch => {
  fetch(`/api/messages/dialog/${dialog_id}`)
    .then(res => res.json())
    .then(data => dispatch({type: LOAD_MESSAGES, payload: data}))
}

export const createMessage = (dialog_id, message) => dispatch => {
  fetch(`/api/messages/dialog/${dialog_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'message': message})
  })
    .then(() => dispatch(loadMessages(dialog_id)))
}